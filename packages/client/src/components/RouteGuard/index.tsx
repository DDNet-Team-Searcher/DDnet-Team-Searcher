'use client';

import { useAppSelector } from '@/utils/hooks/hooks';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type OwnProps = {
    children: ReactNode;
};

export const RouteGuard = ({ children }: OwnProps) => {
    const publicUrls = ['/', '/login', '/register'];
    const isAuthed = useAppSelector((state) => state.user.isAuthed);
    const router = useRouter();

    // if (
    //     isAuthed === false &&
    //     !publicUrls.includes(router.asPath.split('?')[0])
    // ) {
    //     router.push('/login');
    // }

    return <>{children}</>;
};
