import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material'
import { useForm, usePage } from '@inertiajs/inertia-react'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import MuiSelect from '@/Components/MUISelect'
import { LoadingButton } from '@mui/lab'

const IncomeFormModel = ({ open, onClose, income }) => {
    const { lang } = usePage().props

    const { data, setData, errors, put, post, processing } = useForm({
        name: income?.name,
        entry_date: income?.entry_date,
        type: income?.type,
        amount: income?.amount,
    })

    const handleSubmit = event => {
        event.preventDefault()
        if (!income) {
            post(route('income', { lang }), {
                onFinish: () => {
                    onClose()
                },
            })
        } else {
            put(route('income', { lang, income: income?.id }), {
                onFinish: () => {
                    onClose()
                },
            })
        }
    }
    const handleChange = event => {
        setData(event.target.name, event.target.value)
    }

    return (
        <Dialog open={open} fullWidth={true} maxWidth={'sm'}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>ثبت عواید</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        className={'!mt-4 grid grid-cols-2 gap-4'}>
                        <TextField
                            className={'col-span-2'}
                            size={'small'}
                            label={'نام'}
                            value={data.name}
                            variant={'outlined'}
                            error={!!errors.name}
                            helperText={errors.name}
                            name={'name'}
                            onChange={handleChange}
                            fullWidth={true}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                className={'w-full lg:w-auto'}
                                label={'تاریخ پرداخت'}
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
                        <MuiSelect
                            error={errors.type}
                            value={data.type}
                            label={'نوع پرداخت'}
                            onChange={event =>
                                setData('type', event.target.value)
                            }
                            options={[
                                {
                                    label: 'لابراتوار',
                                    value: 'لابراتوار',
                                },
                                {
                                    label: 'تجویزات',
                                    value: 'تجویزات',
                                },
                                {
                                    label: 'ادویه',
                                    value: 'ادویه',
                                },
                            ]}
                        />
                        <TextField
                            className={'col-span-2'}
                            size={'small'}
                            label={'مقدار پرداخت'}
                            variant={'outlined'}
                            error={!!errors.amount}
                            helperText={errors.amount}
                            name={'amount'}
                            type={'number'}
                            onChange={handleChange}
                            fullWidth={true}
                            value={data.amount}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color={'error'}
                        type={'button'}
                        onClick={onClose}
                        variant={'outlined'}>
                        بستن
                    </Button>
                    <LoadingButton
                        loading={processing}
                        color={'success'}
                        type={'submit'}
                        variant={'outlined'}>
                        ثبت
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default IncomeFormModel
