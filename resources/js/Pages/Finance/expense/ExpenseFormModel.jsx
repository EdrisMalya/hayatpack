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

const IncomeFormModel = ({ open, onClose, expense }) => {
    const { lang } = usePage().props

    const { data, setData, errors, put, post, processing } = useForm({
        item: expense?.item,
        entry_date: expense?.entry_date,
        responsible: expense?.responsible,
        leader: expense?.leader,
        paid_amount: expense?.paid_amount,
    })

    const handleSubmit = event => {
        event.preventDefault()
        if (!expense) {
            post(route('expense', { lang }), {
                onFinish: () => {
                    onClose()
                },
            })
        } else {
            put(route('expense', { lang, expense: expense?.id }), {
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
                <DialogTitle>ثبت مصارف</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        className={'!mt-4 grid grid-cols-2 gap-4'}>
                        <TextField
                            className={'col-span-2'}
                            size={'small'}
                            label={'جنس و یا دیگر موارد'}
                            value={data.item}
                            variant={'outlined'}
                            error={!!errors.item}
                            helperText={errors.item}
                            name={'item'}
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
                            error={errors.responsible}
                            value={data.responsible}
                            label={'مسول خرید'}
                            onChange={event =>
                                setData('responsible', event.target.value)
                            }
                            options={[
                                {
                                    label: 'مالی',
                                    value: 'مالی',
                                },
                                {
                                    label: 'خدمات',
                                    value: 'خدمات',
                                },
                            ]}
                        />
                        <MuiSelect
                            error={errors.leader}
                            value={data.leader}
                            label={'هدایت دهنده'}
                            onChange={event =>
                                setData('leader', event.target.value)
                            }
                            options={[
                                {
                                    label: 'ریس',
                                    value: 'ریس',
                                },
                                {
                                    label: 'معاون',
                                    value: 'معاون',
                                },
                                {
                                    label: 'مالی',
                                    value: 'مالی',
                                },
                            ]}
                        />
                        <TextField
                            size={'small'}
                            label={'مقدار پرداخت'}
                            variant={'outlined'}
                            error={!!errors.paid_amount}
                            helperText={errors.paid_amount}
                            name={'paid_amount'}
                            type={'number'}
                            onChange={handleChange}
                            fullWidth={true}
                            value={data.paid_amount}
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
