import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { useForm } from '@inertiajs/inertia-react'
import Select2 from '@/Components/Select2'
import SaveIcon from '@mui/icons-material/Save'
import { LoadingButton } from '@mui/lab'
import {
    Card,
    CardContent,
    CardHeader,
    FormControlLabel,
    Switch,
    TextField,
} from '@mui/material'
import MuiSelect from '@/Components/MUISelect'
import { DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import DariDatePicker from '@/Components/DariDatePicker'
import DariDateAndTimePicker from '@/Components/DariDateAndTimePicker'

const PatientForm = ({ lang, beds, patient, periods }) => {
    const { post, processing, setData, data, errors, put } = useForm({
        bed_id: patient?.bed_id,
        id_number: patient?.id_number,
        image: null,
        full_name: patient?.full_name,
        father_name: patient?.father_name,
        grant_father_name: patient?.grant_father_name,
        nid: patient?.nid,
        dob: patient?.dob,
        gender: patient ? patient?.gender : 'man',
        age: patient?.age,
        current_address: patient?.current_address,
        permanent_address: patient?.permanent_address,
        martial_status: patient?.martial_status,
        entry_date: patient?.entry_date,
        r_full_name: patient?.r_full_name,
        r_father_name: patient?.r_father_name,
        r_grant_father_name: patient?.r_grant_father_name,
        r_nid: patient?.r_nid,
        r_phone_number: patient?.r_phone_number,
        relationship: patient?.relationship,
        r_current_address: patient?.r_current_address,
        r_permanent_address: patient?.r_permanent_address,
        illness_duration: patient?.illness_duration,
        mental_state: patient?.mental_state,
        period_id: patient?.period_id,
        per_day_fees: patient?.per_day_fees,
        total_period_price: patient?.total_period_price,
        amount_by_alphabet: patient?.amount_by_alphabet,
        taken_items: patient?.taken_items,
        take_item_date: patient?.take_item_date,
        take_item_person: patient?.take_item_person,
        due_amount: patient ? patient?.due_amount : 0,
        exited: patient ? patient?.exited : 0,
    })

    const handleChange = event => {
        setData(event.target.name, event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (!patient) {
            post(route('patient.store', { lang }))
        } else {
            post(
                route('patient.update', {
                    lang,
                    patient: patient.id,
                    _method: 'PUT',
                }),
            )
        }
    }

    return (
        <Authenticated active={'patients'} title={'Patient form'}>
            <p className={'text-lg'}>فورم مریض</p>
            <div className={'mt-5 max-w-7xl mx-auto'}>
                <form onSubmit={handleSubmit}>
                    <Card>
                        <p className={'p-4 text-center'}>
                            فورم معلومات مریض جدید شمول
                        </p>
                        <CardContent className={'grid grid-cols-3 gap-3'}>
                            <Select2
                                data={beds}
                                value={
                                    patient
                                        ? {
                                              label: patient?.bed?.name,
                                              value: patient?.bed?.id,
                                          }
                                        : null
                                }
                                selectLabel={'name'}
                                error={errors.bed_id}
                                selectValue={'id'}
                                label={'بستر'}
                                onChange={e => {
                                    console.log(e?.value)
                                    setData('bed_id', e?.value)
                                }}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.id_number}
                                error={errors.id_number}
                                helperText={errors.id_number}
                                name={'id_number'}
                                size={'small'}
                                label={'آی دی مریض'}
                            />
                            <div>
                                <p>عکس</p>
                                <input
                                    accept={'image/*'}
                                    type={'file'}
                                    onChange={event =>
                                        setData('image', event.target.files[0])
                                    }
                                />
                                {errors.image && (
                                    <p className={'text-red-500'}>
                                        {errors.image}
                                    </p>
                                )}
                            </div>
                            <TextField
                                onChange={handleChange}
                                value={data.full_name}
                                error={errors.full_name}
                                helperText={errors.full_name}
                                name={'full_name'}
                                size={'small'}
                                label={'اسم مکمل'}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.father_name}
                                error={errors.father_name}
                                helperText={errors.father_name}
                                name={'father_name'}
                                size={'small'}
                                label={'ولد'}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.grant_father_name}
                                error={errors.grant_father_name}
                                helperText={errors.grant_father_name}
                                name={'grant_father_name'}
                                size={'small'}
                                label={'ولدیت'}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.nid}
                                error={errors.nid}
                                helperText={errors.nid}
                                name={'nid'}
                                size={'small'}
                                label={'نمبر تذکره'}
                            />
                            <DariDateAndTimePicker
                                label={'تاریخ تولد'}
                                errorMessage={errors.dob}
                                value={null}
                                onChange={date => {
                                    setData('dob', date)
                                }}
                            />
                            <MuiSelect
                                error={errors.gender}
                                value={data.gender}
                                label={'جنسیت'}
                                onChange={event =>
                                    setData('gender', event.target.value)
                                }
                                options={[
                                    {
                                        label: 'مرد',
                                        value: 'مرد',
                                    },
                                    {
                                        label: 'زن',
                                        value: 'زن',
                                    },
                                ]}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.age}
                                error={errors.age}
                                helperText={errors.age}
                                name={'age'}
                                size={'small'}
                                label={'سن'}
                                type={'number'}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.current_address}
                                error={errors.current_address}
                                helperText={errors.current_address}
                                name={'current_address'}
                                size={'small'}
                                label={'آدرس فعلی'}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.permanent_address}
                                error={errors.permanent_address}
                                helperText={errors.permanent_address}
                                name={'permanent_address'}
                                size={'small'}
                                label={'آدرس اصلی'}
                            />
                            <MuiSelect
                                error={errors.martial_status}
                                value={data.martial_status}
                                label={'حالت مدنی'}
                                onChange={event =>
                                    setData(
                                        'martial_status',
                                        event.target.value,
                                    )
                                }
                                options={[
                                    {
                                        label: 'مجرد',
                                        value: 'مجرد',
                                    },
                                    {
                                        label: 'متهل',
                                        value: 'متهل',
                                    },
                                    {
                                        label: 'نامزد',
                                        value: 'نامزد',
                                    },
                                ]}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    className={'w-full lg:w-auto'}
                                    label={'وقت دخول و تاریخ بستری'}
                                    value={data.entry_date}
                                    onChange={newValue => {
                                        setData(
                                            'entry_date',
                                            dayjs(newValue).format(
                                                'YYYY-MM-DD HH:mm A',
                                            ),
                                        )
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            error={!!errors.entry_date}
                                            helperText={
                                                <p
                                                    className={
                                                        'text-xs text-red-500'
                                                    }>
                                                    {errors.entry_date}
                                                </p>
                                            }
                                            size={'small'}
                                            {...params}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </CardContent>
                    </Card>
                    <Card className={'mt-4'}>
                        <p className={'text-lg text-center p-4'}>
                            فورم معلومات اعقارب مریض جدید شمول
                        </p>
                        <CardContent className={'grid grid-cols-3 gap-3'}>
                            <TextField
                                onChange={handleChange}
                                value={data.r_full_name}
                                error={errors.r_full_name}
                                helperText={errors.r_full_name}
                                name={'r_full_name'}
                                size={'small'}
                                label={'اسم مکمل'}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.r_father_name}
                                error={errors.r_father_name}
                                helperText={errors.r_father_name}
                                name={'r_father_name'}
                                size={'small'}
                                label={'ولد'}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.r_grant_father_name}
                                error={errors.r_grant_father_name}
                                helperText={errors.r_grant_father_name}
                                name={'r_grant_father_name'}
                                size={'small'}
                                label={'نام پدر کلان'}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.r_nid}
                                error={errors.r_nid}
                                helperText={errors.r_nid}
                                name={'r_nid'}
                                size={'small'}
                                label={'نمبر تذکره'}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.r_phone_number}
                                error={errors.r_phone_number}
                                helperText={errors.r_phone_number}
                                name={'r_phone_number'}
                                size={'small'}
                                label={'نمبر تلفون'}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.relationship}
                                error={errors.relationship}
                                helperText={errors.relationship}
                                name={'relationship'}
                                size={'small'}
                                label={'نوع قرابت'}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.r_current_address}
                                error={errors.r_current_address}
                                helperText={errors.r_current_address}
                                name={'r_current_address'}
                                size={'small'}
                                label={'آدرس فعلی'}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.r_permanent_address}
                                error={errors.r_permanent_address}
                                helperText={errors.r_permanent_address}
                                name={'r_permanent_address'}
                                size={'small'}
                                label={'آدرس اصلی'}
                            />
                        </CardContent>
                    </Card>
                    <Card className={'mt-4'}>
                        <p className={'text-lg text-center p-4'}>
                            فورم تسلیمی اعقارب مریض
                        </p>
                        <CardContent className={'grid grid-cols-3 gap-3'}>
                            <TextField
                                onChange={handleChange}
                                value={data.illness_duration}
                                error={errors.illness_duration}
                                helperText={errors.illness_duration}
                                name={'illness_duration'}
                                size={'small'}
                                label={'مدت مرضی'}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.mental_state}
                                error={errors.mental_state}
                                helperText={errors.mental_state}
                                name={'mental_state'}
                                size={'small'}
                                label={'حالت روانی'}
                            />
                            <Select2
                                data={periods}
                                value={
                                    patient
                                        ? {
                                              label: patient?.period?.name,
                                              value: patient?.period?.id,
                                          }
                                        : null
                                }
                                selectLabel={'name'}
                                error={errors.period_id}
                                selectValue={'id'}
                                label={'انتخاب دوره'}
                                onChange={e => {
                                    setData('period_id', e?.value)
                                }}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.per_day_fees}
                                error={errors.per_day_fees}
                                helperText={errors.per_day_fees}
                                name={'per_day_fees'}
                                size={'small'}
                                label={'مبلغ فی شبانه روز'}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.total_period_price}
                                error={errors.total_period_price}
                                helperText={errors.total_period_price}
                                name={'total_period_price'}
                                size={'small'}
                                label={'مبلغ مجموعی دوره'}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.amount_by_alphabet}
                                error={errors.amount_by_alphabet}
                                helperText={errors.amount_by_alphabet}
                                name={'amount_by_alphabet'}
                                size={'small'}
                                label={'مقدار پول به حرف'}
                            />
                            <TextField
                                className={'col-span-2'}
                                onChange={handleChange}
                                value={data.taken_items}
                                error={errors.taken_items}
                                helperText={errors.taken_items}
                                name={'taken_items'}
                                size={'small'}
                                label={'اجناس تسلیم داده شده'}
                            />
                            <DariDatePicker
                                label={'تاریخ تسلیمی'}
                                errorMessage={errors.take_item_date}
                                value={data.take_item_date}
                                onChange={date => {
                                    setData('take_item_date', date)
                                }}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.take_item_person}
                                error={errors.take_item_person}
                                helperText={errors.take_item_person}
                                name={'take_item_person'}
                                size={'small'}
                                label={'تسلیم شونده'}
                            />
                            <TextField
                                onChange={handleChange}
                                value={data.due_amount}
                                type={'number'}
                                error={errors.due_amount}
                                helperText={errors.due_amount}
                                name={'due_amount'}
                                size={'small'}
                                label={'باقی داری مریض'}
                            />
                            {patient && (
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={data.exited}
                                            onChange={event =>
                                                setData(
                                                    'exited',
                                                    event.target.checked,
                                                )
                                            }
                                        />
                                    }
                                    label={'مرخص شده است'}
                                />
                            )}
                        </CardContent>
                    </Card>
                    <div className={' my-4'}>
                        <LoadingButton
                            color={'success'}
                            type={'submit'}
                            variant={'outlined'}
                            loading={processing}
                            endIcon={<SaveIcon />}>
                            Save
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </Authenticated>
    )
}

export default PatientForm
