import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    Switch,
} from '@mui/material'
import { Close, FilterAlt, Refresh } from '@mui/icons-material'
import BasicDatePicker from '@/Components/Datepicker'
import { useForm, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import Select2 from '@/Components/Select2'
import MuiSelect from '@/Components/MUISelect'

const PatientFilterModel = ({ open, onClose }) => {
    const { lang, filters, beds, periods } = usePage().props
    const { data, setData } = useForm({
        from_date: filters?.from_date ? filters?.from_date : null,
        to_date: filters?.to_date ? filters?.to_date : null,
        bed: filters?.bed ? filters?.bed : null,
        period: filters?.period ? filters?.period : null,
        gender: filters?.gender ? filters?.gender : null,
        show_due: filters?.show_due ? filters?.show_due : false,
        exited: filters?.exited ? filters?.exited : false,
        martial_status: filters?.martial_status
            ? filters?.martial_status
            : null,
        status: filters?.status
            ? filters?.status
            : null,
    })

    const handleChange = event => {
        setData(event.target.name, event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        Inertia.get(route(route().current(), { lang, ...data }))
        // Inertia.get()
    }
    const handleReset = () => {
        Inertia.get(route(route().current(), { lang }))
    }

    return (
        <Dialog open={open} maxWidth={'sm'} fullWidth={true}>
            <DialogTitle>فیلتر کردن مریضان</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogContentText>
                        <div className={'grid grid-cols-2 gap-4'}>
                            <p className={'col-span-2'}>
                                مریضان ثبت شده در بین دو تاریخ
                            </p>
                            <BasicDatePicker
                                value={data.from_date}
                                label={'تاریخ شروع'}
                                onChange={data => setData('from_date', data)}
                            />
                            <BasicDatePicker
                                label={'تاریخ ختم'}
                                value={data.to_date}
                                onChange={data => setData('to_date', data)}
                            />
                            <Select2
                                data={beds}
                                value={data?.bed}
                                selectLabel={'name'}
                                selectValue={'id'}
                                label={'بستر'}
                                onChange={e => {
                                    setData('bed', e)
                                }}
                            />
                            <Select2
                                data={periods}
                                value={data.period}
                                selectLabel={'name'}
                                selectValue={'id'}
                                label={'انتخاب دوره'}
                                onChange={e => {
                                    setData('period', e)
                                }}
                            />
                            <MuiSelect
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
                            <MuiSelect
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
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={data.show_due}
                                        onChange={event =>
                                            setData(
                                                'show_due',
                                                event.target.checked,
                                            )
                                        }
                                    />
                                }
                                label={'مریضان باقی دار'}
                            />
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
                                label={'مرخص شده ها'}
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={data.status}
                                        onChange={event =>
                                            setData(
                                                'status',
                                                event.target.checked,
                                            )
                                        }
                                    />
                                }
                                label={'حذف شده'}
                            />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant={'outlined'}
                        size={'small'}
                        color={'error'}
                        type={'button'}
                        onClick={onClose}
                        endIcon={<Close />}>
                        بستن
                    </Button>
                    <Button
                        variant={'outlined'}
                        size={'small'}
                        color={'info'}
                        type={'button'}
                        onClick={handleReset}
                        endIcon={<Refresh />}>
                        برگشت به حال اول
                    </Button>
                    <Button
                        variant={'outlined'}
                        size={'small'}
                        type={'submit'}
                        color={'success'}
                        endIcon={<FilterAlt />}>
                        فیلتر
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default PatientFilterModel
