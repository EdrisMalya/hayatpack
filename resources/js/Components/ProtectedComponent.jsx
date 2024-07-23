import React from 'react'
import { usePage } from '@inertiajs/inertia-react'

const ProtectedComponent = ({
    role,
    onlyForAdmin = false,
    children,
    for_doctor = false,
}) => {
    const { auth } = usePage().props
    const [permissions] = React.useState(auth?.user?.permissions)

    const shouldIShowTheComponent = role => {
        if (auth.user.is_doctor) {
            if (role === 'doctor_report') {
                return children
            }
        } else {
            return children
        }
    }

    return shouldIShowTheComponent(role)
}

export default ProtectedComponent
