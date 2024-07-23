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
    })

    const handleChange = event => {
        setData(event.target.name, event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        Inertia.get(route(route().current(), { lang, ...data }))
    }
    const handleReset = () => {
        Inertia.get(route(route().current(), { lang }))
    }

    return (
        <Dialog open={open} maxWidth={'sm'} fullWidth={true}>
            <DialogTitle>فیلتر کردن مصارف</DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogContentText>
                        <div className={'grid grid-cols-2 gap-4'}>
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
