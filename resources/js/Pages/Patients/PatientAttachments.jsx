import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material'
import { Close, Delete, Download, Save } from '@mui/icons-material'
import { useForm, usePage } from '@inertiajs/inertia-react'
import { LoadingButton } from '@mui/lab'
import swal from 'sweetalert'

const PatientAttachments = ({ onClose, data: userData }) => {
    const { lang } = usePage().props
    const {
        data,
        setData,
        post,
        errors,
        processing,
        delete: destroy,
    } = useForm({
        details: null,
        attachments: [],
        patient_id: userData?.id,
    })

    const handleSubmit = event => {
        event.preventDefault()
        post(route('patient.documents', { lang }), {
            onSuccess: () => {
                onClose()
            },
        })
    }

    const onDelete = file_id => {
        swal({
            icon: 'warning',
            title: 'Are you sure?',
            buttons: true,
        }).then(res => {
            if (res) {
                destroy(route('patient.documents', { lang, file_id }), {
                    onFinish: () => {
                        onClose()
                    },
                })
            }
        })
    }

    return (
        <Dialog open={true} fullWidth={true} maxWidth={'sm'}>
            <DialogTitle>اسناد مریض</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogContentText>
                        {userData?.attachments.length > 0 ? (
                            <div className={'mb-4'}>
                                <p
                                    className={
                                        'text-center pb-4 text-lg font-bold'
                                    }>
                                    لیست تمام اسناد مریض
                                </p>
                                <Table size={'small'}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                className={'!text-center'}>
                                                معلومات
                                            </TableCell>
                                            <TableCell
                                                className={'!text-center'}>
                                                نام فایل
                                            </TableCell>
                                            <TableCell
                                                className={'!text-center'}>
                                                حجم فایل
                                            </TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userData?.attachments?.map(
                                            (file, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {file?.details}
                                                    </TableCell>
                                                    <TableCell>
                                                        {file?.file_name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {file?.file_size}
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            color={'primary'}
                                                            onClick={() => {
                                                                window.open(
                                                                    file?.path,
                                                                    '_blank',
                                                                )
                                                            }}
                                                            size={'small'}>
                                                            <Download
                                                                fontSize={
                                                                    'small'
                                                                }
                                                            />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() =>
                                                                onDelete(
                                                                    file?.id,
                                                                )
                                                            }
                                                            color={'error'}
                                                            size={'small'}>
                                                            <Delete
                                                                fontSize={
                                                                    'small'
                                                                }
                                                            />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <></>
                        )}
                        <p>فایل را انتخاب نمایید</p>
                        <input
                            multiple={true}
                            type={'file'}
                            onChange={event =>
                                setData('attachments', event.target.files)
                            }
                        />
                        {errors.attachments && (
                            <p className={'text-xs text-red-500'}>
                                {errors.attachments}
                            </p>
                        )}
                        <TextField
                            value={data.details}
                            className={'!mt-4'}
                            error={!!errors.details}
                            helperText={errors.details}
                            onChange={event =>
                                setData('details', event.target.value)
                            }
                            name={'details'}
                            type={'text'}
                            fullWidth={true}
                            variant={'outlined'}
                            size={'small'}
                            label={'جزیات'}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        loading={processing}
                        type={'submit'}
                        variant={'outlined'}
                        color={'success'}
                        endIcon={<Save />}
                        size={'small'}>
                        ثبت
                    </LoadingButton>
                    <Button
                        onClick={onClose}
                        variant={'outlined'}
                        type={'button'}
                        color={'error'}
                        endIcon={<Close />}
                        size={'small'}>
                        بستن
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default PatientAttachments
