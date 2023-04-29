import { Notification } from "./Notification.type";

export type User = {
    id: number;
    username: string;
    email: string;
    tier: number;
    createdAt: number;
    updatedAt: number;
    verified: boolean;
    avatar: string | null;
    notifications: Notification[];
    _count: { unreadNotifications: number };
    perimissions: {
        canBan: boolean;
        canDeleteHappenings: boolean;
        canManageRoles: boolean;
        canManagePosts: boolean;
    };
    banned: {
        isBanned: boolean;
        reason: string | null;
    };
};
