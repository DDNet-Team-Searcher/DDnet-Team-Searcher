import { Injectable, OnModuleInit } from '@nestjs/common';
import {
    Happening,
    HappeningType,
    InterestedHappening,
    NotificationType,
    Status,
} from '@prisma/client';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Event, Run } from 'src/types/Happenings.type';
import { CreateEvenDTO } from './dto/create-event.dto';
import { CreateRunDTO } from './dto/create-run.dto';

@Injectable()
export class HappeningsService implements OnModuleInit {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly notificationsService: NotificationsService,
    ) { }

    async createRun(data: CreateRunDTO & { authorId: number }) {
        return await this.prismaService.happening.create({
            data: {
                ...data,
                place: data.place ? 'THERE' : 'HERE',
                startAt: new Date(data.startAt),
                type: 'Run',
                interestedPlayers: {
                    create: {
                        userId: data.authorId,
                        inTeam: true,
                    },
                },
            },
        });
    }

    async createEvent(
        data: CreateEvenDTO & { authorId: number; thumbnail: string | null },
    ) {
        return await this.prismaService.happening.create({
            data: {
                ...data,
                place: data.place ? 'THERE' : 'HERE',
                endAt: new Date(data.endAt),
                startAt: new Date(data.startAt),
                type: 'Event',
            },
        });
    }

    async startHappening(id: number): Promise<Happening> {
        return await this.prismaService.happening.update({
            where: {
                id,
            },
            data: {
                status: 'Happening',
            },
        });
    }

    async endHappening(id: number): Promise<Happening> {
        return await this.prismaService.happening.update({
            where: {
                id,
            },
            data: {
                status: 'Finished',
            },
        });
    }

    async deleteHappening(id: number): Promise<Happening> {
        return await this.prismaService.happening.delete({
            where: {
                id,
            },
        });
    }

    async isUserInterestedHappening({
        userId,
        happeningId,
    }: {
        userId: number;
        happeningId: number;
    }): Promise<InterestedHappening | null> {
        return await this.prismaService.interestedHappening.findFirst({
            where: {
                happeningId,
                userId,
            },
        });
    }

    async setIsUserInterestedInHappening(
        happeningId: number,
        userId: number,
        isInterested: boolean,
    ) {
        if (isInterested) {
            const author = await this.prismaService.happening.findFirst({
                where: {
                    id: happeningId,
                },
                select: {
                    authorId: true,
                },
            });

            await this.prismaService.interestedHappening.create({
                data: {
                    userId,
                    happeningId,
                },
            });

            await this.notificationsService.sendNotification(
                author.authorId,
                NotificationType.InterestedInHappening,
                { happeningId, userId },
            );
        } else {
            const data = await this.isUserInterestedHappening({
                userId,
                happeningId,
            });

            return await this.prismaService.interestedHappening.delete({
                where: {
                    id: data.id,
                },
            });
        }
    }

    async getRunById(runId: number, userId: number): Promise<Run | null> {
        return await this.prismaService.happening.findFirst({
            where: {
                type: 'Run',
                id: runId,
            },
            select: {
                id: true,
                place: true,
                mapName: true,
                teamSize: true,
                description: true,
                status: true,
                startAt: true,
                createdAt: true,
                interestedPlayers: {
                    select: {
                        inTeam: true,
                    },
                    where: {
                        userId,
                    },
                },
                _count: {
                    select: {
                        interestedPlayers: true,
                    },
                },
                server: {
                    select: {
                        ip: true,
                        password: true,
                        port: true,
                    },
                },
                author: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
    }

    async getEventById(eventId: number, userId: number): Promise<Event | null> {
        return await this.prismaService.happening.findFirst({
            where: {
                type: 'Event',
                id: eventId,
            },
            select: {
                id: true,
                place: true,
                title: true,
                mapName: true,
                status: true,
                startAt: true,
                description: true,
                endAt: true,
                thumbnail: true,
                createdAt: true,
                interestedPlayers: {
                    select: {
                        inTeam: true,
                    },
                    where: {
                        userId,
                    },
                },
                _count: {
                    select: {
                        interestedPlayers: true,
                    },
                },
                server: {
                    select: {
                        ip: true,
                        password: true,
                        port: true,
                    },
                },
                author: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
    }

    async getAllRuns(id: number): Promise<Run[]> {
        return await this.prismaService.happening.findMany({
            where: {
                type: 'Run',
            },
            select: {
                id: true,
                place: true,
                mapName: true,
                teamSize: true,
                description: true,
                status: true,
                startAt: true,
                createdAt: true,
                interestedPlayers: {
                    select: {
                        inTeam: true,
                    },
                    where: {
                        userId: id,
                    },
                },
                _count: {
                    select: {
                        interestedPlayers: true,
                    },
                },
                server: {
                    select: {
                        ip: true,
                        password: true,
                        port: true,
                    },
                },
                author: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
    }

    async getAllEvents(id: number): Promise<Event[]> {
        return await this.prismaService.happening.findMany({
            where: {
                type: 'Event',
            },
            select: {
                id: true,
                title: true,
                place: true,
                mapName: true,
                status: true,
                startAt: true,
                description: true,
                endAt: true,
                thumbnail: true,
                createdAt: true,
                interestedPlayers: {
                    select: {
                        inTeam: true,
                    },
                    where: {
                        userId: id,
                    },
                },
                _count: {
                    select: {
                        interestedPlayers: true,
                    },
                },
                server: {
                    select: {
                        ip: true,
                        password: true,
                        port: true,
                    },
                },
                author: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
    }

    async getRecentRuns(id: number, runsCount = 5): Promise<null | Run[]> {
        return await this.prismaService.happening.findMany({
            where: {
                type: 'Run',
                authorId: id,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: runsCount,
            select: {
                id: true,
                place: true,
                mapName: true,
                teamSize: true,
                description: true,
                status: true,
                startAt: true,
                createdAt: true,
                interestedPlayers: {
                    select: {
                        inTeam: true,
                    },
                },
                _count: {
                    select: {
                        interestedPlayers: true,
                    },
                },
                server: {
                    select: {
                        ip: true,
                        password: true,
                        port: true,
                    },
                },
                author: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
    }

    async getRecentEvents(
        id: number,
        eventsCount = 5,
    ): Promise<null | Event[]> {
        return await this.prismaService.happening.findMany({
            where: {
                type: 'Event',
                authorId: id,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: eventsCount,
            select: {
                id: true,
                title: true,
                place: true,
                mapName: true,
                status: true,
                startAt: true,
                description: true,
                endAt: true,
                thumbnail: true,
                createdAt: true,
                interestedPlayers: {
                    select: {
                        inTeam: true,
                    },
                },
                _count: {
                    select: {
                        interestedPlayers: true,
                    },
                },
                server: {
                    select: {
                        ip: true,
                        password: true,
                        port: true,
                    },
                },
                author: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
    }

    async countLastFinishedHappenings(
        authorId: number,
        type: HappeningType,
    ): Promise<number> {
        return this.prismaService.happening.count({
            where: {
                authorId,
                type,
                status: Status.Finished,
            },
        });
    }

    async getHappeningInterestedPlayers(id: number) {
        return this.prismaService.happening.findMany({
            where: {
                id,
            },
            select: {
                interestedPlayers: {
                    select: {
                        inTeam: true,
                        user: {
                            select: {
                                id: true,
                                avatar: true,
                                username: true,
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        interestedPlayers: true,
                    },
                },
            },
        });
    }

    async updateIsPlayerInTeam(happeningId: number, userId: number) {
        const { id, inTeam } =
            await this.prismaService.interestedHappening.findFirst({
                where: {
                    happeningId,
                    userId,
                },
            });

        return await this.prismaService.interestedHappening.update({
            where: {
                id,
            },
            data: {
                inTeam: !inTeam,
            },
        });
    }

    async onModuleInit() {
        //do something here...
    }
}
