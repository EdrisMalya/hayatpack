import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import useLanguage from '@/hooks/useLanguage'
import { Button } from '@mui/material'
import { PlusIcon } from '@heroicons/react/24/solid'
import Datatable from '@/Components/Datatable/Datatable'
import ProtectedComponent from '@/Components/ProtectedComponent'
import PeriodForm from '@/Pages/Period/PeriodForm'

const PeriodIndex = ({ periods }) => {
    const [showForm, setShowForm] = React.useState(false)
    const [period, setPeriod] = React.useState(false)
    const { translate } = useLanguage()

    return (
        <Authenticated active={'period'} title={translate('Periods')}>
            <div className={'flex items-center justify-between'}>
                <h2 className={'text-xl'}>{translate('List of periods')}</h2>
                <ProtectedComponent role={'period-create-period'}>
                    <Button
                        onClick={() => setShowForm(true)}
                        variant={'outlined'}
                        endIcon={<PlusIcon className={'h-4'} />}>
                        {translate('Add new record')}
                    </Button>
                </ProtectedComponent>
            </div>
            <div className={'mt-8'}>
                <Datatable
                    editRole={'period-edit-period'}
                    deleteRole={'period-delete-project'}
                    fromResource={true}
                    data={periods}
                    handleEditAction={period => {
                        setPeriod(period)
                        setShowForm(true)
                    }}
                    columns={[
                        {
                            name: translate('ای دی'),
                            key: 'id_number',
                            sort: true,
                        },

                        {
                            name: translate('نوع دوره'),
                            key: 'name',
                            sort: true,
                        },
                        {
                            name: translate('مشخصات دوره'),
                            key: 'description',
                            sort: true,
                        },
                        {
                            name: translate('تاریخ ایجاد شده'),
                            key: 'created_at',
                            sort: true,
                            data_type: 'date',
                            format: 'YYYY-MM-DD hh:mm A',
                        },
                    ]}
                />
            </div>
            {showForm && (
                <PeriodForm
                    translate={translate}
                    onClose={() => {
                        setPeriod(null)
                        setShowForm(false)
                    }}
                    period={period}
                />
            )}
        </Authenticated>
    )
}

export default PeriodIndex
