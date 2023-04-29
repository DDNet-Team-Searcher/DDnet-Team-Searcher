import { Avatar } from '@/components/Avatar';
import { useLazySetNotificationSeenQuery } from '@/features/api/notifications.api';
import { Happenings } from '@/types/Happenings.type';
import {
    Notification as NotificationT,
    NotificationType,
} from '@/types/Notification.type';
import { timeAgo } from '@/utils/timeago';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

type OwnProps = {
    notification: NotificationT;
};

export const Notification = ({ notification }: OwnProps) => {
    const [setNotificationSeen] = useLazySetNotificationSeenQuery();
    const { ref } = useInView({
        onChange: (inView) => {
            if (inView && !notification.seen) {
                setNotificationSeen(notification.id);
            }
        },
    });

    return (
        <li className="mt-[15px] flex" ref={ref}>
            {notification.type === NotificationType.InterestedInHappening && (
                //@ts-ignore
                <Link href={`/profile/${notification.notification.userId}`}>
                    <Avatar
                        src={notification.author.avatar}
                        username={notification.author.username}
                        size={30}
                        className="mt-[5px]"
                    />
                </Link>
            )}
            <div className="ml-[10px]">
                <p className="align-top">
                    {notification.type ===
                        NotificationType.InterestedInHappening ? (
                        <>
                            {notification.author.username} is interested in your
                            {notification.happening.type === Happenings.Event
                                ? ` '${notification.happening.title}' `
                                : ` '${notification.happening.mapName}' `}
                            {notification.happening.type === Happenings.Event
                                ? 'event'
                                : 'run'}
                            :D
                        </>
                    ) : (
                        ''
                    )}
                </p>
                <span className="text-[12px] text-medium-emphasis align-top">
                    {timeAgo.format(new Date(notification.createdAt!))}
                </span>
            </div>
        </li>
    );
};
