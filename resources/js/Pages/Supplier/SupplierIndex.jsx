import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import useLanguage from '@/hooks/useLanguage'
import { Button } from '@mui/material'
import { PlusIcon } from '@heroicons/react/24/solid'
import Datatable from '@/Components/Datatable/Datatable'
import ProtectedComponent from '@/Components/ProtectedComponent'
import SupplierForm from '@/Pages/Supplier/SupplierForm'

const SupplierIndex = ({ suppliers, total_due }) => {
    const [showForm, setShowForm] = React.useState(false)
    const [supplier, setSupplier] = React.useState(false)
    const { translate } = useLanguage()

    return (
        <Authenticated active={'supplier'} title={translate('Suppliers')}>
            <div className={'flex items-center justify-between'}>
                <h2 className={'text-xl'}>{translate('لیست تهیه کننده ها')}</h2>
                <ProtectedComponent role={'supplier-create-supplier'}>
                    <Button
                        onClick={() => setShowForm(true)}
                        variant={'outlined'}
                        endIcon={<PlusIcon className={'h-4'} />}>
                        {translate('اضافه کردن جدید')}
                    </Button>
                </ProtectedComponent>
            </div>
            <div className={'mt-8'}>
                <Datatable
                    editRole={'supplier-edit-supplier'}
                    deleteRole={'supplier-delete-project'}
                    fromResource={true}
                    data={suppliers}
                    handleEditAction={supplier => {
                        setSupplier(supplier)
                        setShowForm(true)
                    }}
                    datatableFilters={[
                        {
                            element: (
                                <div>
                                    <p>
                                        (
                                        {parseFloat(total_due).toLocaleString()}{' '}
                                        افغانی ) مجموعه باقی داری{'  '}
                                    </p>
                                </div>
                            ),
                        },
                    ]}
                    columns={[
                        {
                            name: translate('اسم تهیه کننده'),
                            key: 'supplier_name',
                            sort: true,
                        },

                        {
                            name: translate('جزیات'),
                            key: 'details',
                            sort: true,
                        },

                        {
                            name: translate('هدایت دهنده'),
                            key: 'responsible',
                            sort: true,
                        },

                        {
                            name: translate('مبلغ محموعی'),
                            key: 'total_amount',
                            sort: true,
                        },
                        {
                            name: translate('مقدار قرضداری'),
                            key: 'due_amount',
                            sort: true,
                        },
                        {
                            name: translate('ثبت شده در تاریخ'),
                            key: 'created_at',
                            sort: true,
                            data_type: 'date',
                            format: 'YYYY-MM-DD hh:mm A',
                        },
                    ]}
                />
            </div>
            {showForm && (
                <SupplierForm
                    translate={translate}
                    onClose={() => {
                        setSupplier(null)
                        setShowForm(false)
                    }}
                    supplier={supplier}
                />
            )}
        </Authenticated>
    )
}

export default SupplierIndex
