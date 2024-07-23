import React, { useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/inertia-react'
import useLanguage from '@/hooks/useLanguage'
import { Button } from '@mui/material'
import { Inertia } from '@inertiajs/inertia'
import SortableList from '@/Components/SortableList'
import LineChart from '@/Components/LineChart'
import PieChart from '@/Components/PieChart'
import Table from '@/Components/Table'

export default function Dashboard(props) {
    const { translate } = useLanguage()
    const {
        total_p,
        total_w_p,
        total_m_p,
        active_p,
        active_p_w,
        active_p_m,
        total_exited,
        total_exited_w,
        total_exited_m,
    } = usePage().props

    useEffect(() => {
        window.Echo.private('testchannel')
            .listen('Test', e => {
                console.log(e)
            })
            .subscribe()
    }, [])

    return (
        <AuthenticatedLayout
            active={'dashboard'}
            auth={props.auth}
            errors={props.errors}>
            <Head title="Dashboard" />
            <div className={'grid grid-cols-3 gap-8'}>
                <div className={'dashboard_card'}>
                    <p>مجموعه مریضان</p>
                    <p className={'mt-3'}>({total_p})</p>
                </div>
                <div className={'dashboard_card'}>
                    <p>مریض اناث</p>
                    <p className={'mt-3'}>({total_w_p})</p>
                </div>
                <div className={'dashboard_card'}>
                    <p>مریض ذکور</p>
                    <p className={'mt-3'}>({total_m_p})</p>
                </div>
                <div className={'dashboard_card'}>
                    <p>مریضان حاضر</p>
                    <p className={'mt-3'}>({active_p})</p>
                </div>
                <div className={'dashboard_card'}>
                    <p>حاضر اناث</p>
                    <p className={'mt-3'}>({active_p_w})</p>
                </div>
                <div className={'dashboard_card'}>
                    <p>حاضر ذکور</p>
                    <p className={'mt-3'}>({active_p_m})</p>
                </div>
                <div className={'dashboard_card'}>
                    <p>مجموعه فارغین</p>
                    <p className={'mt-3'}>({total_exited})</p>
                </div>
                <div className={'dashboard_card'}>
                    <p>فارعین اناث</p>
                    <p className={'mt-3'}>({total_exited_w})</p>
                </div>
                <div className={'dashboard_card'}>
                    <p>فارغین ذکور</p>
                    <p className={'mt-3'}>({total_exited_m})</p>
                </div>
            </div>
            {/*<div className={'mt-4 grid grid-cols-12 gap-4'}>*/}
            {/*    <div*/}
            {/*        className={*/}
            {/*            'col-span-8 bg-gray-800 p-6 shadow-xl rounded-xl'*/}
            {/*        }>*/}
            {/*        <h2 className={'text-xl'}>{translate('Graph 1')}</h2>*/}
            {/*        <LineChart />*/}
            {/*        <LineChart />*/}
            {/*    </div>*/}
            {/*    <div*/}
            {/*        className={*/}
            {/*            'col-span-4 bg-gray-800 p-6 shadow-xl rounded-xl'*/}
            {/*        }>*/}
            {/*        <h2 className={'text-xl'}>{translate('Graph 2')}</h2>*/}
            {/*        <PieChart />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </AuthenticatedLayout>
    )
}
