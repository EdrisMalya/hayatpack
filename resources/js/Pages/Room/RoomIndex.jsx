import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import useLanguage from '@/hooks/useLanguage'
import { Button } from '@mui/material'
import { PlusIcon } from '@heroicons/react/24/solid'
import Datatable from '@/Components/Datatable/Datatable'
import ProtectedComponent from '@/Components/ProtectedComponent'
import RoomForm from '@/Pages/Room/RoomForm'

const RoomIndex = ({ rooms }) => {
    const [showForm, setShowForm] = React.useState(false)
    const [room, setRoom] = React.useState(false)
    const { translate } = useLanguage()

    return (
        <Authenticated active={'room'} title={translate('Rooms')}>
            <div className={'flex items-center justify-between'}>
                <h2 className={'text-xl'}>{translate('افزودن اطاق')}</h2>
                <ProtectedComponent role={'room-create-room'}>
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
                    editRole={'room-edit-room'}
                    deleteRole={'room-delete-project'}
                    fromResource={true}
                    data={rooms}
                    handleEditAction={room => {
                        setRoom(room)
                        setShowForm(true)
                    }}
                    columns={[
                        {
                            name: translate('آی دی'),
                            key: 'id_number',
                            sort: true,
                        },
                        {
                            name: translate('نوع اطاق'),
                            key: 'name',
                            sort: true,
                        },
                        {
                            name: translate('مشخصات اطاق'),
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
                <RoomForm
                    translate={translate}
                    onClose={() => {
                        setRoom(null)
                        setShowForm(false)
                    }}
                    room={room}
                />
            )}
        </Authenticated>
    )
}

export default RoomIndex
