<?php

namespace App\Http\Controllers;

use App\Events\Test;
use App\Models\Patient;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'total_p' => Patient::query()->where('status', true)->count(),
            'total_w_p' => Patient::query()
                ->where('status', true)
                ->where('gender', 'زن')->count(),
            'total_m_p' => Patient::query()
                ->where('status', true)
                ->where('gender', 'مرد')->count(),
            'active_p' => Patient::query()
                ->where('status', true)
                ->where('exited', false)->count(),
            'active_p_w' => Patient::query()
                ->where('status', true)
                ->where('exited', false)
                ->where('gender', 'زن')->count(),
            'active_p_m' => Patient::query()
                ->where('status', true)
                ->where('exited', false)
                ->where('gender', 'مرد')->count(),
            'total_exited' => Patient::query()
                ->where('status', true)
                ->where('exited', true)->count(),
            'total_exited_w' => Patient::query()
                ->where('status', true)
                ->where('exited', true)
                ->where('gender', 'زن')->count(),
            'total_exited_m' => Patient::query()
                ->where('status', true)
                ->where('exited', true)
                ->where('gender', 'زن')->count(),
        ]);
    }

    public function testEvent()
    {
        event(new Test('This message is from test event'));

        return Inertia::render('Dashboard');
    }
}
