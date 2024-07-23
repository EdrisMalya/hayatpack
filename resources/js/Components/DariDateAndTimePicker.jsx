import * as React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import AdapterJalaali from '@date-io/jalaali'
import TextField from '@mui/material/TextField'
import moment from 'moment-jalaali'
import dayjs from 'dayjs'
import { DateTimePicker } from '@mui/x-date-pickers'

function formatMonth(date, locale) {
    const dariMonths = [
        'حمل',
        'ثور',
        'جوزا',
        'سرطان',
        'اسد',
        'سنبله',
        'میزان',
        'عقرب',
        'قوس',
        'جدی',
        'دلو',
        'حوت',
    ]
    const month = date.getMonth()
    return dariMonths[month]
}

export default function DariDateAndTimePicker(
    {
        onChange,
        format = null,
        value: defaultValue = null,
        size = 'small',
        label,
        fullWidth = true,
        translate,
        error,
        defaultDate = 'fromHijir',
        disabled = false,
    },
    state,
) {
    const [value, setValue] = React.useState(new Date())

    React.useEffect(() => {
        moment.updateLocale('fa', {
            jMonths: [
                'حمل',
                'ثور',
                'جوزا',
                'سرطان',
                'اسد',
                'سنبله',
                'میزان',
                'عقرب',
                'قوس',
                'جدی',
                'دلو',
                'حوت',
            ],
        })
    }, [])

    React.useEffect(() => {
        if (defaultValue) {
            let persianDate = moment(defaultValue, 'jYYYY-jMM-jDD')
            let gregorianDate = persianDate.format('YYYY-MM-DD')
            setValue(new Date(gregorianDate))
        } else {
            setValue(new Date())
        }
    }, [defaultValue])

    return (
        <div className={''}>
            <LocalizationProvider dateAdapter={AdapterJalaali}>
                <DateTimePicker
                    disabled={disabled}
                    value={value}
                    inputFormat={'jYYYY-jMM-jDD'}
                    onChange={newValue => {
                        setValue(newValue)
                        if (onChange) {
                            onChange(moment(newValue).format('jYYYY-jMM-jDD'))
                        }
                    }}
                    label={label}
                    renderInput={params => (
                        <TextField
                            error={true}
                            helperText={
                                error && (
                                    <p className={'text-red-500'}>{error}</p>
                                )
                            }
                            fullWidth={fullWidth}
                            size={'small'}
                            {...params}
                        />
                    )}
                    monthFormat={formatMonth}
                    {...state}
                />
            </LocalizationProvider>
        </div>
    )
}
