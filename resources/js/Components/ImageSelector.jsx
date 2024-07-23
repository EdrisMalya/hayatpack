import React, { useEffect, useRef, useState } from 'react'
import { Chip, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import useLanguage from '@/hooks/useLanguage'

const ImageSelector = ({
    onSelect,
    className,
    isMulti = false,
    selectedImage = null,
    error,
    label,
}) => {
    const ref = useRef()
    const [selectedImages, setSelectedImages] = useState([])
    const [image, setImage] = useState(null)

    const { translate } = useLanguage()

    const handleChange = event => {
        const reader = new FileReader()
        if (!isMulti) {
            if (event.target.files[0]) {
                reader.readAsDataURL(event.target.files[0])
            }
            reader.onload = readerEvent => {
                setImage(readerEvent.target.result)
                onSelect(event.target.files[0])
            }
        } else {
            let fileNames = Object.entries(event.target.files)
            onSelect(fileNames)
            setSelectedImages(fileNames)
        }
    }

    const removeFileFromList = file => {
        let result = selectedImages.filter(item => {
            return item[1]?.name !== file
        })
        setSelectedImages(result)
        onSelect(result)
    }

    useEffect(() => {
        if (selectedImage) {
            setImage(selectedImage)
        }
    }, [selectedImage])

    return (
        <div className={'text-center'}>
            <div
                onClick={() => ref.current.click()}
                className={`w-full p-4 border border-dashed dark:border-gray-600 text-center rounded-lg hover:dark:bg-gray-800 cursor-pointer ${className} ${
                    error && '!border-red-500'
                }`}>
                {selectedImages.length > 0 || image ? (
                    !isMulti ? (
                        <div>
                            {image && (
                                <>
                                    <IconButton
                                        onClick={() => {
                                            setImage(null)
                                            onSelect(null)
                                        }}
                                        className={'float-right'}>
                                        <CloseIcon />
                                    </IconButton>
                                    <img
                                        className={'mx-auto'}
                                        width={'30%'}
                                        src={image}
                                    />
                                </>
                            )}
                        </div>
                    ) : (
                        <div>
                            {selectedImages < 1 ? (
                                <p className={'text-center'}>
                                    {translate(
                                        label ? label : 'Select image sliders',
                                    )}
                                </p>
                            ) : (
                                <div className={'space-x-1 space-y-1'}>
                                    <IconButton
                                        onClick={() => {
                                            setSelectedImages([])
                                            onSelect([])
                                        }}
                                        className={'float-right'}>
                                        <CloseIcon />
                                    </IconButton>
                                    {selectedImages.map((slider, index) => (
                                        <Chip
                                            variant={'outlined'}
                                            key={index}
                                            onDelete={() =>
                                                removeFileFromList(
                                                    slider[1].name,
                                                )
                                            }
                                            label={slider[1]?.name}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                ) : (
                    <div>
                        {isMulti === 'slider'
                            ? translate(
                                  label
                                      ? label
                                      : 'Select slider selectedImages',
                              )
                            : translate(label ? label : 'Select Image')}
                        {error && <p className={'text-red-500'}>{error}</p>}
                    </div>
                )}
            </div>
            {error && (
                <p className={'text-left text-red-500 text-sm'}>{error}</p>
            )}
            <input
                onChange={handleChange}
                multiple={isMulti}
                accept={'image/*'}
                type={'file'}
                ref={ref}
                className={'hidden'}
            />
        </div>
    )
}

export default ImageSelector
