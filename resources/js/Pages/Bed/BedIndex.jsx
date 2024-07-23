import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import useLanguage from '@/hooks/useLanguage'
import { Button } from '@mui/material'
import { PlusIcon } from '@heroicons/react/24/solid'
import Datatable from '@/Components/Datatable/Datatable'
import ProtectedComponent from '@/Components/ProtectedComponent'
import BedForm from '@/Pages/Bed/BedForm'

const BedIndex = ({ beds, rooms }) => {
    const [showForm, setShowForm] = React.useState(false)
    const [bed, setBed] = React.useState(false)
    const { translate } = useLanguage()

    return (
        <Authenticated active={'bed'} title={translate('Beds')}>
            <div className={'flex items-center justify-between'}>
                <h2 className={'text-xl'}>{translate('List of beds')}</h2>
                <ProtectedComponent role={'bed-create-bed'}>
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
                    editRole={'bed-edit-bed'}
                    deleteRole={'bed-delete-project'}
                    fromResource={true}
                    data={beds}
                    handleEditAction={bed => {
                        setBed(bed)
                        setShowForm(true)
                    }}
                    columns={[
                        {
                            name: translate('آی دی'),
                            key: 'id_number',
                            sort: true,
                        },
                        {
                            name: translate('اطاق'),
                            key: 'room.name',
                            sort: true,
                        },
                        {
                            name: translate('نوع بستر'),
                            key: 'name',
                            sort: true,
                        },
                        {
                            name: translate('مشخصات بستر'),
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
                <BedForm
                    translate={translate}
                    onClose={() => {
                        setBed(null)
                        setShowForm(false)
                    }}
                    bed={bed}
                    rooms={rooms?.data}
                />
            )}
        </Authenticated>
    )
}

export default BedIndex
