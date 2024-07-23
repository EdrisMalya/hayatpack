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

const RoomForm = ({ translate, onClose, room }) => {
    const { lang } = usePage().props

    const handleClose = () => {
        onClose()
    }

    const { post, processing, setData, data, errors, put } = useForm({
        description: room?.description,
        id_number: room?.id_number,
        name: room?.name,
    })

    const handleChange = event => {
        setData(event.target.name, event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (!room) {
            post(route('room.store', { lang }), {
                onSuccess: () => {
                    handleClose()
                },
            })
        } else {
            post(
                route('room.update', {
                    lang,
                    room: room.id,
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
                {room ? translate('Edit room') : translate('Create room')}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogContentText className={'grid grid-cols-1 gap-3'}>
                        {/*<ImageSelector
                            selectedImage={room ? room.image : null}
                            onSelect={image => setData('image', image)}
                            label={translate('Room image')}
                        />*/}

                        <TextField
                            onChange={handleChange}
                            value={data.id_number}
                            error={errors.id_number}
                            helperText={errors.id_number}
                            name={'id_number'}
                            size={'small'}
                            label={translate('ای دی')}
                            required={true}
                        />
                        <TextField
                            onChange={handleChange}
                            value={data.name}
                            error={errors.name}
                            helperText={errors.name}
                            name={'name'}
                            size={'small'}
                            label={translate('نوع اطاق')}
                            required={true}
                        />
                        <TextField
                            onChange={handleChange}
                            value={data.description}
                            error={errors.description}
                            helperText={errors.description}
                            name={'description'}
                            size={'small'}
                            label={translate('مشخصات اطاق')}
                            placeholder={'این گزینه اختیاری میباشد'}
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

export default RoomForm
