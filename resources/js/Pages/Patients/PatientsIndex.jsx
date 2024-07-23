import React, { useState } from 'react'
import useLanguage from '@/hooks/useLanguage'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import ConfigurationPageLinks from '@/Pages/Configuration/ConfigurationPageLinks'
import { Link } from '@inertiajs/inertia-react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import { Add, AttachFile, FilterAlt } from '@mui/icons-material'
import Datatable from '@/Components/Datatable/Datatable'
import { Inertia } from '@inertiajs/inertia'
import PatientFilterModel from '@/Pages/Patients/PatientFilterModel'
import DialogContext from '@mui/material/Dialog/DialogContext'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import PatientAttachments from '@/Pages/Patients/PatientAttachments'

const PatientsIndex = ({ lang, patients }) => {
    const { translate } = useLanguage()
    const [filter, setFilter] = useState(false)
    const [attachment, setAttachment] = useState({
        model: false,
        data: [],
    })
    return (
        <Authenticated active={'patients'} title={'Configuration page'}>
            <div className={'flex items-center justify-between'}>
                <p className={'text-lg'}>لیست مریضان</p>
                <div>
                    <Link href={route('patient.create', { lang })}>
                        <Button variant={'outlined'} endIcon={<Add />}>
                            اضافه نمودن مریض
                        </Button>
                    </Link>
                </div>
            </div>
            <div className={'mt-4'}>
                <Datatable
                    fromResource={true}
                    handleEditAction={data => {
                        Inertia.get(
                            route('patient.edit', {
                                lang,
                                patient: data?.id,
                            }),
                        )
                    }}
                    data={patients}
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
                    otherOptions={[
                        {
                            icon: <AttachFile fontSize={'small'} />,
                            tooltip: translate('Attachments'),
                            role: 'for-all',
                            className: '!text-blue-500',
                            handleClick: data => {
                                setAttachment({
                                    model: true,
                                    data,
                                })
                            },
                        },
                    ]}
                    columns={[
                        {
                            name: 'عکس',
                            key: 'image',
                            sort: false,
                            data_type: 'image',
                        },
                        {
                            name: 'آی دی مریض',
                            key: 'id_number',
                            sort: true,
                        },
                        {
                            name: 'مرخص شده است',
                            key: 'exited',
                            sort: true,
                            data_type: 'boolean',
                            true_value: 'بلی',
                            false_value: 'نخیر',
                        },
                        {
                            name: 'بستر',
                            key: 'bed.name',
                            sort: true,
                        },
                        {
                            name: 'اسم مکمل',
                            key: 'full_name',
                            sort: true,
                        },
                        {
                            name: 'ولد',
                            key: 'father_name',
                            sort: true,
                        },
                        {
                            name: 'ولدیت',
                            key: 'grant_father_name',
                            sort: true,
                        },
                        {
                            name: 'نمبر تذکره',
                            key: 'nid',
                            sort: true,
                        },
                        {
                            name: 'تاریخ تولد',
                            key: 'dob',
                            sort: true,
                        },
                        {
                            name: 'جنسیت',
                            key: 'gender',
                            sort: true,
                        },
                        {
                            name: 'سن',
                            key: 'age',
                            sort: true,
                        },
                        {
                            name: 'آدرس فعلی',
                            key: 'current_address',
                            sort: true,
                        },
                        {
                            name: 'آدرس اصلی',
                            key: 'permanent_address',
                            sort: true,
                        },
                        {
                            name: 'حالت مدنی',
                            key: 'martial_status',
                            sort: true,
                        },
                        {
                            name: 'وقت دخول و تاریخ بستری',
                            key: 'entry_date',
                            sort: true,
                        },
                        {
                            name: 'معلومات اعقارب مریض جدید شمول',
                            key: '.',
                            sort: true,
                            data_type: 'custom',
                            value: '|',
                            className: 'text-center',
                        },
                        {
                            name: 'اسم مکمل',
                            key: 'r_full_name',
                            sort: true,
                        },
                        {
                            name: 'ولد',
                            key: 'r_father_name',
                            sort: true,
                        },
                        {
                            name: 'نام پدر کلان',
                            key: 'r_grant_father_name',
                            sort: true,
                        },
                        {
                            name: 'نمبر تذکره',
                            key: 'r_nid',
                            sort: true,
                        },
                        {
                            name: 'نمبر تلفون',
                            key: 'r_phone_number',
                            sort: true,
                        },
                        {
                            name: 'نوع قرابت',
                            key: 'relationship',
                            sort: true,
                        },
                        {
                            name: 'آدرس فعلی',
                            key: 'r_current_address',
                            sort: true,
                        },
                        {
                            name: 'معلومات تسلیمی اعقارب مریض',
                            key: '..',
                            sort: true,
                            data_type: 'custom',
                            value: '|',
                            className: 'text-center',
                        },
                        {
                            name: 'آدرس اصلی',
                            key: 'r_permanent_address',
                            sort: true,
                        },
                        {
                            name: 'مدت مرضی',
                            key: 'illness_duration',
                            sort: true,
                        },
                        {
                            name: 'حالت روانی',
                            key: 'mental_state',
                            sort: true,
                        },
                        {
                            name: 'انتخاب دوره',
                            key: 'period_id',
                            sort: true,
                        },
                        {
                            name: 'مبلغ فی شبانه روز',
                            key: 'per_day_fees',
                            sort: true,
                        },
                        {
                            name: 'مبلغ مجموعی دوره',
                            key: 'total_period_price',
                            sort: true,
                        },
                        {
                            name: 'مقدار پول به حرف',
                            key: 'amount_by_alphabet',
                            sort: true,
                        },
                        {
                            name: 'باقی داری',
                            key: 'due_amount',
                            sort: true,
                        },
                        {
                            name: 'اجناس تسلیم داده شده',
                            key: 'taken_items',
                            sort: true,
                        },
                        {
                            name: 'تاریخ تسلیمی',
                            key: 'take_item_date',
                            sort: true,
                        },
                        {
                            name: 'تاریخ ثبت شده',
                            key: 'created_date',
                            sort: true,
                            data_type: 'date',
                            format: 'YYYY-MM-DD hh:mm A',
                        },
                    ]}
                />
            </div>
            <PatientFilterModel
                open={filter}
                onClose={() => {
                    setFilter(false)
                }}
            />
            {attachment.model && (
                <PatientAttachments
                    data={attachment.data}
                    onClose={() => {
                        setAttachment({
                            model: false,
                            data: [],
                        })
                    }}
                />
            )}
        </Authenticated>
    )
}

export default PatientsIndex
