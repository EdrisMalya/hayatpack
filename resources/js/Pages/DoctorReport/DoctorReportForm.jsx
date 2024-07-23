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

const DoctorReportForm = ({ translate, onClose, doctorreport }) => {
    const { lang } = usePage().props

    const handleClose = () => {
        onClose()
    }

    const { post, processing, setData, data, errors, put } = useForm({
        details: doctorreport?.details,
        attachment: null,
    })

    const handleChange = event => {
        setData(event.target.name, event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (!doctorreport) {
            post(route('doctorreport.store', { lang }), {
                onSuccess: () => {
                    handleClose()
                },
            })
        } else {
            post(
                route('doctorreport.update', {
                    lang,
                    doctorreport: doctorreport.id,
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
            <DialogTitle>فورم ثبت راپور ها</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogContentText className={'grid grid-cols-1 gap-3'}>
                        <p>مشخصات</p>
                        <textarea
                            className={'bg-transparent'}
                            value={data.details}
                            onChange={handleChange}
                            name={'details'}
                        />
                        {errors.details && (
                            <p className={'text-red-500 text-xs'}>
                                {errors.details}
                            </p>
                        )}
                        <p>انتخاب راپور</p>
                        <input
                            type={'file'}
                            onChange={event =>
                                setData('attachment', event.target.files[0])
                            }
                        />
                        {errors.attachment && (
                            <p className={'text-red-500 text-xs'}>
                                {errors.attachment}
                            </p>
                        )}
                        {/*<ImageSelector
                            selectedImage={doctorreport ? doctorreport.image : null}
                            onSelect={image => setData('image', image)}
                            label={translate('DoctorReport image')}
                        />*/}
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

export default DoctorReportForm
