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
import { Inertia } from '@inertiajs/inertia'
import Select2 from '@/Components/Select2'

const BedForm = ({ translate, onClose, bed, rooms }) => {
    const { lang } = usePage().props

    const handleClose = () => {
        onClose()
    }

    const { post, processing, setData, data, errors, put } = useForm({
        description: bed?.description,
        id_number: bed?.id_number,
        name: bed?.name,
        room_id: bed ? bed.room?.id : null,
    })

    const handleChange = event => {
        setData(event.target.name, event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (!bed) {
            post(route('bed.store', { lang }), {
                onSuccess: () => {
                    handleClose()
                },
            })
        } else {
            post(
                route('bed.update', {
                    lang,
                    bed: bed.id,
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
                {bed ? translate('Edit bed') : translate('Create bed')}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogContentText className={'grid grid-cols-1 gap-3'}>
                        {/*<ImageSelector
                            selectedImage={bed ? bed.image : null}
                            onSelect={image => setData('image', image)}
                            label={translate('Bed image')}
                        />*/}
                        <Select2
                            data={rooms}
                            value={
                                bed
                                    ? {
                                          label: bed.room?.name,
                                          value: bed.room?.pure_id,
                                      }
                                    : null
                            }
                            selectLabel={'name'}
                            error={errors.room_id}
                            selectValue={'id_pure'}
                            label={translate('اطاق را انتخاب نمایید')}
                            onChange={e => {
                                console.log(e?.value)
                                setData('room_id', e?.value)
                            }}
                        />
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
                            label={translate('نوع بستر')}
                            required={true}
                        />
                        <TextField
                            onChange={handleChange}
                            value={data.description}
                            error={errors.description}
                            helperText={errors.description}
                            name={'description'}
                            size={'small'}
                            label={translate('مشخصات بستر')}
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

export default BedForm
