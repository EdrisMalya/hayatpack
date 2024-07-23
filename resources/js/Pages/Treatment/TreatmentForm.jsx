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

const TreatmentForm = ({ translate, onClose, treatment }) => {
    const { lang } = usePage().props

    const handleClose = () => {
        onClose()
    }

    const { post, processing, setData, data, errors, put } = useForm({
        description: treatment?.description,
        id_number: treatment?.id_number,
        name: treatment?.name,
    })

    const handleChange = event => {
        setData(event.target.name, event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (!treatment) {
            post(route('treatment.store', { lang }), {
                onSuccess: () => {
                    handleClose()
                },
            })
        } else {
            post(
                route('treatment.update', {
                    lang,
                    treatment: treatment.id,
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
            <DialogTitle>
                {treatment
                    ? translate('Edit treatment')
                    : translate('Create treatment')}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogContentText className={'grid grid-cols-1 gap-3'}>
                        {/*<ImageSelector
                            selectedImage={treatment ? treatment.image : null}
                            onSelect={image => setData('image', image)}
                            label={translate('Treatment image')}
                        />*/}
                        <TextField
                            onChange={handleChange}
                            value={data.id_number}
                            error={errors.id_number}
                            helperText={errors.id_number}
                            name={'id_number'}
                            size={'small'}
                            label={translate('آی دی')}
                            required={true}
                        />
                        <TextField
                            onChange={handleChange}
                            value={data.name}
                            error={errors.name}
                            helperText={errors.name}
                            name={'name'}
                            size={'small'}
                            label={translate('نوع تداوی')}
                            required={true}
                        />
                        <TextField
                            onChange={handleChange}
                            value={data.description}
                            error={errors.description}
                            helperText={errors.description}
                            name={'description'}
                            size={'small'}
                            label={translate('مشخصات تداوی')}
                            placeholder={'ای گزینه اختیاری میباشد'}
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

export default TreatmentForm
