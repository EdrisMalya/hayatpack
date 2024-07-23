import React, { useState } from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { financeLinks } from '@/Pages/Finance/FinanceIndex'
import { Link } from '@inertiajs/inertia-react'
import { Button } from '@mui/material'
import IncomeFormModel from '@/Pages/Finance/income/IncomeFormModel'
import Datatable from '@/Components/Datatable/Datatable'
import { FilterAlt } from '@mui/icons-material'
import IncomeFilterModel from '@/Pages/Finance/income/IncomeFilterModel'

const IncomeIndex = ({ lang, incomes }) => {
    const [form, setForm] = React.useState({
        model: false,
        data: null,
    })
    const [filter, setFilter] = useState(false)
    return (
        <Authenticated
            title={'عواید'}
            active={'finance'}
            navBarOptions={financeLinks('income', lang)}>
            <div className={'flex items-center justify-between'}>
                <p className={'font-bold text-lg'}>لیست تمام عواید</p>
                <Button
                    onClick={() => {
                        setForm({
                            model: true,
                            data: null,
                        })
                    }}
                    variant={'outlined'}>
                    مریض بیرون بستر
                </Button>
            </div>
            <div className={'mt-6'}>
                <Datatable
                    data={incomes}
                    deleteRoute={'income'}
                    handleEditAction={income => {
                        setForm({
                            data: income,
                            model: true,
                        })
                    }}
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
                    columns={[
                        {
                            name: 'آی دی',
                            key: 'id',
                            sort: true,
                        },
                        {
                            name: 'نام',
                            key: 'name',
                            sort: true,
                        },
                        {
                            name: 'نوع پرداخت',
                            key: 'type',
                            sort: true,
                        },
                        {
                            name: 'تاریخ پرداخت',
                            key: 'entry_date',
                            sort: true,
                        },
                        {
                            name: 'مقدار پرداخت',
                            key: 'amount',
                            sort: true,
                        },
                    ]}
                />
            </div>
            {form.model && (
                <IncomeFormModel
                    income={form.data}
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
                <IncomeFilterModel
                    open={filter}
                    onClose={() => {
                        setFilter(false)
                    }}
                />
            )}
        </Authenticated>
    )
}

export default IncomeIndex
