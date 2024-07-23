<?php

namespace App\Http\Controllers;

use App\Helpers\DatatableBuilder;
use App\Http\Controllers\Controller;
use App\Models\Expenses;
use App\Models\Income;
use App\Models\Patient;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class FinanceController extends Controller
{
    public function index()
    {
        $total_patient = Patient::query()->where(function($query){
            if(\request()->has('from_date') && \request()->has('to_date')){
                $query->whereBetween('created_at', [\request()->get('from_date'), \request()->get('to_date')]);
            }
        })->sum('total_period_price');
        $total_patient_not_paid = Patient::query()->where(function($query){
            if(\request()->has('from_date') && \request()->has('to_date')){
                $query->whereBetween('created_at', [\request()->get('from_date'), \request()->get('to_date')]);
            }
        })->sum('due_amount');
        $result_of_p_a = $total_patient - $total_patient_not_paid;
        $supplier_total_deal = Supplier::query()->where(function($query){
            if(\request()->has('from_date') && \request()->has('to_date')){
                $query->whereBetween('created_at', [\request()->get('from_date'), \request()->get('to_date')]);
            }
        })->sum('total_amount');
        $supplier_total_due_amount = Supplier::query()->where(function($query){
            if(\request()->has('from_date') && \request()->has('to_date')){
                $query->whereBetween('created_at', [\request()->get('from_date'), \request()->get('to_date')]);
            }
        })->sum('due_amount');
        $total_supplier_expense = $supplier_total_deal - $supplier_total_due_amount;
        return Inertia::render('Finance/FinanceIndex', [
            'l_total' => Income::query()->where(function($query){
                if(\request()->has('from_date') && \request()->has('to_date')){
                    $query->whereBetween('created_at', [\request()->get('from_date'), \request()->get('to_date')]);
                }
            })->where('type', 'لابراتوار')->sum('amount'),
            't_total' => Income::query()->where(function($query){
                if(\request()->has('from_date') && \request()->has('to_date')){
                    $query->whereBetween('created_at', [\request()->get('from_date'), \request()->get('to_date')]);
                }
            })->where('type', 'تجویزات')->sum('amount'),
            'm_total' => Income::query()->where(function($query){
                if(\request()->has('from_date') && \request()->has('to_date')){
                    $query->whereBetween('created_at', [\request()->get('from_date'), \request()->get('to_date')]);
                }
            })->where('type', 'ادویه')->sum('amount'),
            'total_income' => Income::query()->where(function($query){
                if(\request()->has('from_date') && \request()->has('to_date')){
                    $query->whereBetween('created_at', [\request()->get('from_date'), \request()->get('to_date')]);
                }
            })->sum('amount') + $result_of_p_a,

            'l_total_e' => Expenses::query()->where(function($query){
                if(\request()->has('from_date') && \request()->has('to_date')){
                    $query->whereBetween('created_at', [\request()->get('from_date'), \request()->get('to_date')]);
                }
            })->where('responsible', 'مالی')->sum('paid_amount'),
            's_total_e' => Expenses::query()->where(function($query){
                if(\request()->has('from_date') && \request()->has('to_date')){
                    $query->whereBetween('created_at', [\request()->get('from_date'), \request()->get('to_date')]);
                }
            })->where('responsible', 'خدمات')->sum('paid_amount'),
            'total_expense' => Expenses::query()->where(function($query){
                if(\request()->has('from_date') && \request()->has('to_date')){
                    $query->whereBetween('created_at', [\request()->get('from_date'), \request()->get('to_date')]);
                }
            })->sum('paid_amount') + $total_supplier_expense,
            "from_date" => \request()->get('from_date'),
            "to_date" => \request()->get('to_date'),
            "total_patient_income" => Patient::query(),
            'patient_income' => $result_of_p_a,
            'total_supplier_expense' => $total_supplier_expense
        ]);
    }

    public function income($lang, Request $request)
    {
        switch ($request->method()){
            case 'GET':
                $query = Income::query();
                if($request->get('from_date') && $request->get('to_date')) {
                    $query = $query->whereBetween('created_at', [$request->get('from_date'), $request->get('to_date')]);
                }
                $datatable = new DatatableBuilder($query, $request, [
                    "name",
                    "entry_date",
                    "type",
                    "amount",
                ]);
                return Inertia::render('Finance/income/IncomeIndex', [
                    'incomes' => $datatable->build(),
                    'filters' => [
                        'from_date' => $request->get('from_date'),
                        'to_date' => $request->get('to_date'),
                    ]
                ]);
            case 'POST':
                $data = $request->validate([
                    "name" => ['required'],
                    "entry_date" => ['required']    ,
                    "type" => ['required'],
                    "amount" => ['required'],
                ]);
                Income::query()->create($data);
                return Redirect::route('income', ['lang'=>$lang])->with(['message' => translate('Saved successfully'), 'type' => 'success']);
            case 'PUT':
                $id = $request->get('income');
                $income = Income::query()->findOrFail($id);
                $data = $request->validate([
                    "name" => ['required'],
                    "entry_date" => ['required']    ,
                    "type" => ['required'],
                    "amount" => ['required'],
                ]);
                $income->update($data);
                return Redirect::route('income', ['lang'=>$lang])->with(['message' => translate('Updated successfully'), 'type' => 'success']);
            case 'DELETE':
                $id = \request()->get('income');
                Income::query()->where('id', $id)->delete();
                return Redirect::route('income', ['lang'=>$lang])->with(['message' => translate('Deleted successfully'), 'type' => 'success']);
        }

    }
    public function expense($lang, Request $request)
    {
        switch ($request->method()){
            case 'GET':
                $query = Expenses::query();

                if($request->get('from_date') && $request->get('to_date')) {
                    $query = $query->whereBetween('created_at', [$request->get('from_date'), $request->get('to_date')]);
                }

                $datatable = new DatatableBuilder($query, $request, [
                    "item",
                    "entry_date",
                    "responsible",
                    "leader",
                ]);
                return Inertia::render('Finance/expense/ExpenseIndex', [
                    'expenses' => $datatable->build(),
                    'filters' => [
                        'from_date' => $request->get('from_date'),
                        'to_date' => $request->get('to_date'),
                    ]
                ]);
            case 'POST':
                $data = $request->validate([
                    "item" => ['required'],
                    "entry_date" => ['required'],
                    "responsible" => ['required'],
                    "leader" => ['required'],
                    "paid_amount" => ['required'],
                ]);
                Expenses::query()->create($data);
                return Redirect::route('expense', ['lang'=>$lang])->with(['message' => translate('Saved successfully'), 'type' => 'success']);
            case 'PUT':
                $id = $request->get('expense');
                $expense = Expenses::query()->findOrFail($id);
                $data = $request->validate([
                    "item" => ['required'],
                    "entry_date" => ['required'],
                    "responsible" => ['required'],
                    "leader" => ['required'],
                    "paid_amount" => ['required'],
                ]);
                $expense->update($data);
                return Redirect::route('expense', ['lang'=>$lang])->with(['message' => translate('Updated successfully'), 'type' => 'success']);
            case 'DELETE':
                $id = \request()->get('expense');
                Expenses::query()->where('id', $id)->delete();
                return Redirect::route('expense', ['lang'=>$lang])->with(['message' => translate('Deleted successfully'), 'type' => 'success']);
        }
    }
}
