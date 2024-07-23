import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Button, Card, CardContent } from '@mui/material'
import { Link, usePage } from '@inertiajs/inertia-react'
import BasicDatePicker from '@/Components/Datepicker'
import { Inertia } from '@inertiajs/inertia'

export const financeLinks = (active, lang) => {
    return (
        <div className={'space-x-2'}>
            <Link href={route('income', { lang })}>
                <Button
                    variant={active === 'income' ? 'contained' : 'outlined'}>
                    عواید
                </Button>
            </Link>
            <Link href={route('expense', { lang })}>
                <Button
                    variant={active === 'expense' ? 'contained' : 'outlined'}>
                    مصارف
                </Button>
            </Link>
        </div>
    )
}
const FinanceIndex = ({ lang }) => {
    const {
        l_total,
        t_total,
        m_total,
        total_income,
        l_total_e,
        s_total_e,
        total_expense,
        from_date,
        to_date,
        patient_income,
        total_supplier_expense,
    } = usePage().props
    return (
        <Authenticated
            active={'finance'}
            title={'مالی'}
            navBarOptions={financeLinks('', lang)}>
            <p className={'!text-xl my-3 text-center'}>راپور های مالی</p>
            <div className={'flex space-x-4 w-[700px]'}>
                <BasicDatePicker
                    value={from_date}
                    onChange={date => {
                        Inertia.get(
                            route(route().current(), {
                                lang,
                                from_date: date,
                                to_date,
                            }),
                        )
                    }}
                    label={'تاریخ شروع'}
                />
                <BasicDatePicker
                    value={to_date}
                    onChange={date => {
                        Inertia.get(
                            route(route().current(), {
                                lang,
                                from_date,
                                to_date: date,
                            }),
                        )
                    }}
                    label={'تاریخ ختم'}
                />
                <div>
                    <Button
                        variant={'outlined'}
                        onClick={date => {
                            Inertia.get(
                                route(route().current(), {
                                    lang,
                                    from_date: null,
                                    to_date: null,
                                }),
                            )
                        }}
                        className={'whitespace-nowrap'}>
                        پاک کردن تاریخ
                    </Button>
                </div>
            </div>
            <Card className={'mt-5'}>
                <CardContent>
                    <p className={'text-center mt-5'}>راپور های عواید</p>
                    <div className={'mt-3 grid grid-cols-5 gap-5'}>
                        <div className={'dashboard_card'}>
                            <p>مجموع عواید لابراتوار</p>
                            <p className={'mt-3'}>{l_total}</p>
                        </div>
                        <div className={'dashboard_card'}>
                            <p>مجموع عواید تجویزات</p>
                            <p className={'mt-3'}>{t_total}</p>
                        </div>
                        <div className={'dashboard_card'}>
                            <p>مجموع عواید ادویه</p>
                            <p className={'mt-3'}>{m_total}</p>
                        </div>
                        <div className={'dashboard_card'}>
                            <p>مجموع عواید مریضان بستری</p>
                            <p className={'mt-3'}>{patient_income}</p>
                        </div>
                        <div className={'dashboard_card'}>
                            <p>مجموع عواید</p>
                            <p className={'mt-3'}>{total_income}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className={'mt-5'}>
                <CardContent>
                    <p className={'text-center mt-5'}>راپور های مصارف</p>
                    <div className={'mt-3 grid grid-cols-3 gap-5'}>
                        <div className={'dashboard_card'}>
                            <p>مجموع مصارف تهیه کننده ها</p>
                            <p className={'mt-3'}>{total_supplier_expense}</p>
                        </div>
                        <div className={'dashboard_card'}>
                            <p>مجموع مصارف مالی و خدمات</p>
                            <p className={'mt-3'}>{l_total_e + s_total_e}</p>
                        </div>
                        <div className={'dashboard_card'}>
                            <p>مجموع مصارف </p>
                            <p className={'mt-3'}>{total_expense}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className={'mt-5'}>
                <CardContent>
                    <div className={'dashboard_card max-w-2xl mx-auto mt-5'}>
                        <p className={'text-center !text-xl mt-5'}>مفاد خالص</p>

                        <div
                            className={
                                'flex items-center justify-center space-x-5 mt-5'
                            }>
                            <p>مجموع مصارف</p>
                            <p className={'text-2xl'}>-</p>
                            <p>مجموع عواید</p>
                        </div>
                        <p className={'mt-3'}>{total_income - total_expense}</p>
                    </div>
                </CardContent>
            </Card>
        </Authenticated>
    )
}

export default FinanceIndex
