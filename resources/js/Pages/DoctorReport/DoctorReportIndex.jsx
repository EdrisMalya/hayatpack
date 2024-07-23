import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import useLanguage from '@/hooks/useLanguage'
import { Button } from '@mui/material'
import { PlusIcon } from '@heroicons/react/24/solid'
import Datatable from '@/Components/Datatable/Datatable'
import ProtectedComponent from '@/Components/ProtectedComponent'
import DoctorReportForm from '@/Pages/DoctorReport/DoctorReportForm'

const DoctorReportIndex = ({ doctorreports }) => {
    const [showForm, setShowForm] = React.useState(false)
    const [doctorreport, setDoctorReport] = React.useState(false)
    const { translate } = useLanguage()

    return (
        <Authenticated
            active={'doctorreport'}
            title={translate('DoctorReports')}>
            <div className={'flex items-center justify-between'}>
                <h2 className={'text-xl'}>
                    {translate('List of doctorreports')}
                </h2>
                <ProtectedComponent role={'doctorreport-create-doctorreport'}>
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
                    editRole={'doctorreport-edit-doctorreport'}
                    deleteRole={'doctorreport-delete-project'}
                    fromResource={true}
                    data={doctorreports}
                    handleEditAction={doctorreport => {
                        setDoctorReport(doctorreport)
                        setShowForm(true)
                    }}
                    columns={[
                        {
                            name: 'داکتر',
                            key: 'user.name',
                        },
                        {
                            name: 'جزیات',
                            key: 'details',
                        },
                        {
                            name: 'دانلود راپور',
                            key: 'attachment_path',
                            data_type: 'button',
                            onClick: item => {
                                window.open(item?.attachment, '_blank')
                            },
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
                <DoctorReportForm
                    translate={translate}
                    onClose={() => {
                        setDoctorReport(null)
                        setShowForm(false)
                    }}
                    doctorreport={doctorreport}
                />
            )}
        </Authenticated>
    )
}

export default DoctorReportIndex
