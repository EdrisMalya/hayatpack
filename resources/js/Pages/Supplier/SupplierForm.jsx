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
import { LoadingButton } from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import { useForm, usePage } from '@inertiajs/inertia-react'
import ImageSelector from '@/Components/ImageSelector'
import MuiSelect from '@/Components/MUISelect'

const SupplierForm = ({ translate, onClose, supplier }) => {
    const { lang } = usePage().props

    const handleClose = () => {
        onClose()
    }

    const { post, processing, setData, data, errors, put } = useForm({
        details: supplier?.details,
        due_amount: supplier?.due_amount,
        responsible: supplier?.responsible,
        supplier_name: supplier?.supplier_name,
        total_amount: supplier?.total_amount,
    })

    const handleChange = event => {
        setData(event.target.name, event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (!supplier) {
            post(route('supplier.store', { lang }), {
                onSuccess: () => {
                    handleClose()
                },
            })
        } else {
            post(
                route('supplier.update', {
                    lang,
                    supplier: supplier.id,
                    _method: 'PUT',
                }),
                {
                    onSuccess: () => {
                        handleClose()
                    },
                },
            )
        }
    }

    return (
        <Dialog open={true} maxWidth={'sm'} fullWidth={true}>
            <DialogTitle>فورم ایجاد تهیه کننده</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogContentText className={'grid grid-cols-1 gap-3'}>
                        {/*<ImageSelector
                            selectedImage={supplier ? supplier.image : null}
                            onSelect={image => setData('image', image)}
                            label={translate('Supplier image')}
                        />*/}
                        <TextField
                            onChange={handleChange}
                            value={data.supplier_name}
                            error={errors.supplier_name}
                            helperText={errors.supplier_name}
                            name={'supplier_name'}
                            size={'small'}
                            label={translate('اسم تهیه کننده')}
                            required={true}
                        />
                        <TextField
                            onChange={handleChange}
                            value={data.details}
                            error={errors.details}
                            helperText={errors.details}
                            name={'details'}
                            size={'small'}
                            label={translate('جزیات')}
                            required={true}
                        />
                        <TextField
                            onChange={handleChange}
                            value={data.total_amount}
                            error={errors.total_amount}
                            helperText={errors.total_amount}
                            name={'total_amount'}
                            size={'small'}
                            label={translate('مبلغ محموعی')}
                            required={true}
                        />
                        <TextField
                            onChange={handleChange}
                            value={data.due_amount}
                            error={errors.due_amount}
                            helperText={errors.due_amount}
                            name={'due_amount'}
                            size={'small'}
                            label={translate('مقدار قرضداری')}
                            required={true}
                        />
                        <MuiSelect
                            error={errors.responsible}
                            value={data.responsible}
                            label={'هدایت دهنده'}
                            onChange={event =>
                                setData('responsible', event.target.value)
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
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        color={'success'}
                        type={'submit'}
                        variant={'outlined'}
                        loading={processing}
                        endIcon={<SaveIcon />}>
                        {translate('Save')}
                    </LoadingButton>
                    <Button
                        type={'button'}
                        endIcon={<CloseIcon />}
                        color={'error'}
                        onClick={handleClose}
                        variant={'outlined'}>
                        {translate('Close')}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default SupplierForm
