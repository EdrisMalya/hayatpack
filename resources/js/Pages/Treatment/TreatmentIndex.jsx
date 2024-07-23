import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import useLanguage from '@/hooks/useLanguage'
import { Button } from '@mui/material'
import { PlusIcon } from '@heroicons/react/24/solid'
import Datatable from '@/Components/Datatable/Datatable'
import ProtectedComponent from '@/Components/ProtectedComponent'
import TreatmentForm from '@/Pages/Treatment/TreatmentForm'

const TreatmentIndex = ({ treatments }) => {
    const [showForm, setShowForm] = React.useState(false)
    const [treatment, setTreatment] = React.useState(false)
    const { translate } = useLanguage()

    return (
        <Authenticated active={'treatment'} title={translate('Treatments')}>
            <div className={'flex items-center justify-between'}>
                <h2 className={'text-xl'}>{translate('List of treatments')}</h2>
                <ProtectedComponent role={'treatment-create-treatment'}>
                    <Button
                        onClick={() => setShowForm(true)}
                        variant={'outlined'}
                        endIcon={<PlusIcon className={'h-4'} />}>
                        {translate('افزودن نوع تداوی')}
                    </Button>
                </ProtectedComponent>
            </div>
            <div className={'mt-8'}>
                <Datatable
                    editRole={'treatment-edit-treatment'}
                    deleteRole={'treatment-delete-project'}
                    fromResource={true}
                    data={treatments}
                    handleEditAction={treatment => {
                        setTreatment(treatment)
                        setShowForm(true)
                    }}
                    columns={[
                        {
                            name: translate('آی دی'),
                            key: 'id_number',
                            sort: true,
                        },

                        {
                            name: translate('نوع تداوی'),
                            key: 'name',
                            sort: true,
                        },
                        {
                            name: translate('مشخصات تداوی'),
                            key: 'description',
                            sort: true,
                        },
                        {
                            name: translate('Created at'),
                            key: 'created_at',
                            sort: true,
                            data_type: 'date',
                            format: 'YYYY-MM-DD hh:mm A',
                        },
                    ]}
                />
            </div>
            {showForm && (
                <TreatmentForm
                    translate={translate}
                    onClose={() => {
                        setTreatment(null)
                        setShowForm(false)
                    }}
                    treatment={treatment}
                />
            )}
        </Authenticated>
    )
}

export default TreatmentIndex
