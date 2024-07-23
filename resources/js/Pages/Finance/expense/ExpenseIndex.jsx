import React, { useState } from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import sidebarLinks from '@/Components/SidebarLinks'
import { financeLinks } from '@/Pages/Finance/FinanceIndex'
import { Button } from '@mui/material'
import Datatable from '@/Components/Datatable/Datatable'
import ExpenseFormModel from '@/Pages/Finance/expense/ExpenseFormModel'
import { FilterAlt } from '@mui/icons-material'
import ExpenseFilterModel from '@/Pages/Finance/expense/ExpenseFilterModel'

const ExpenseIndex = ({ lang, expenses }) => {
    const [form, setForm] = React.useState({
        model: false,
        data: null,
    })

    const [filter, setFilter] = useState(false)
    return (
        <Authenticated
            title={'عواید'}
            active={'finance'}
            navBarOptions={financeLinks('expense', lang)}>
            <div className={'flex items-center justify-between'}>
                <p className={'font-bold text-lg'}>لیست تمام مصارفات</p>
                <Button
                    onClick={() => {
                        setForm({
                            model: true,
                            data: null,
                        })
                    }}
                    variant={'outlined'}>
                    ثبت مصرف
                </Button>
            </div>
            <div className={'mt-6'}>
                <Datatable
                    data={expenses}
                    datatableFilters={[
                        {
                            element: (
                                <Button
                                    onClick={() => {
                                        setFilter(true)
                                    }}
                                    variant={'outlined'}
                                    endIcon={<FilterAlt />}>
                                    فیلتر
                                </Button>
                            ),
                        },
                    ]}
                    deleteRoute={'expense'}
                    handleEditAction={expense => {
                        setForm({
                            data: expense,
                            model: true,
                        })
                    }}
                    columns={[
                        {
                            name: 'آی دی',
                            key: 'id',
                            sort: true,
                        },
                        {
                            name: 'جنس و یا دیگر موارد',
                            key: 'item',
                            sort: true,
                        },
                        {
                            name: 'تاریخ پرداخت',
                            key: 'entry_date',
                            sort: true,
                        },
                        {
                            name: 'مسول خرید',
                            key: 'responsible',
                            sort: true,
                        },
                        {
                            name: 'هدایت دهنده',
                            key: 'leader',
                            sort: true,
                        },
                        {
                            name: 'مقدار پرداخت',
                            key: 'paid_amount',
                            sort: true,
                        },
                    ]}
                />
            </div>
            {form.model && (
                <ExpenseFormModel
                    expense={form.data}
                    open={form.model}
                    onClose={() => {
                        setForm({
                            model: false,
                            data: null,
                        })
                    }}
                />
            )}
            {filter && (
                <ExpenseFilterModel
                    open={filter}
                    onClose={() => {
                        setFilter(false)
                    }}
                />
            )}
        </Authenticated>
    )
}

export default ExpenseIndex
