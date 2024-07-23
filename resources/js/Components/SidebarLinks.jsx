import React from 'react'
import SidebarLinkButton from '@/Components/SidebarLinkButton'
import { CogIcon, UsersIcon } from '@heroicons/react/24/outline'
import { HomeIcon } from '@heroicons/react/24/solid'
import ProtectedComponent from '@/Components/ProtectedComponent'
import { usePage } from '@inertiajs/inertia-react'
import useLanguage from '@/hooks/useLanguage'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'

const SidebarLinks = ({ active }) => {
    const { lang, dir } = usePage().props
    const { translate } = useLanguage()
    return (
        <div className={'mt-5'}>
            <SidebarLinkButton
                dir={dir}
                icon={<HomeIcon className={'h-5'} />}
                url={route('dashboard', { lang })}
                label={translate('Dashboard')}
                active={active === 'dashboard'}
            />
            <ProtectedComponent role={'user-management-access'}>
                <SidebarLinkButton
                    dir={dir}
                    icon={<UsersIcon className={'h-5'} />}
                    url={route('user-management.index', { lang })}
                    label={translate('User management')}
                    active={active === 'user_management'}
                />
            </ProtectedComponent>

            <ProtectedComponent role={'period-access'}>
                <SidebarLinkButton
                    dir={dir}
                    url={route('period.index', { lang })}
                    label={translate('دوره ها')}
                    active={active === 'period'}
                />
            </ProtectedComponent>

            <ProtectedComponent role={'treatment-access'}>
                <SidebarLinkButton
                    dir={dir}
                    url={route('treatment.index', { lang })}
                    label={translate('نوع تداوی')}
                    active={active === 'treatment'}
                />
            </ProtectedComponent>

            <ProtectedComponent role={'room-access'}>
                <SidebarLinkButton
                    dir={dir}
                    url={route('room.index', { lang })}
                    label={translate('اطاق ها')}
                    active={active === 'room'}
                />
            </ProtectedComponent>

            <ProtectedComponent role={'bed-access'}>
                <SidebarLinkButton
                    dir={dir}
                    url={route('bed.index', { lang })}
                    label={translate('بستر ها')}
                    active={active === 'bed'}
                />
            </ProtectedComponent>
            <ProtectedComponent role={'patients-access'}>
                <SidebarLinkButton
                    dir={dir}
                    url={route('patient.index', { lang })}
                    label={translate('لیست مریضان')}
                    active={active === 'patients'}
                />
            </ProtectedComponent>
            <ProtectedComponent role={'finance-access'}>
                <SidebarLinkButton
                    dir={dir}
                    url={route('finance.index', { lang })}
                    label={translate('مالی')}
                    active={active === 'finance'}
                />
            </ProtectedComponent>

            <ProtectedComponent role={'supplier-access'}>
                <SidebarLinkButton
                    dir={dir}
                    url={route('supplier.index', { lang })}
                    label={translate('تهیه کننده ها')}
                    active={active === 'supplier'}
                />
            </ProtectedComponent>

            <ProtectedComponent role={'doctor_report'}>
                <SidebarLinkButton
                    dir={dir}
                    url={route('doctorreport.index', { lang })}
                    label={'راپور داکتران'}
                    active={active === 'doctorreport'}
                />
            </ProtectedComponent>
            {/*Other links*/}

            <ProtectedComponent role={'configuration-access'}>
                <SidebarLinkButton
                    dir={dir}
                    icon={<CogIcon className={'h-5'} />}
                    url={route('configuration.index', { lang })}
                    label={translate('Configuration')}
                    active={active === 'configuration'}
                />
            </ProtectedComponent>
        </div>
    )
}

export default SidebarLinks
