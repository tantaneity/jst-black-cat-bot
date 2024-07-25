import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { GroupChatEntity } from './group-chat.entity';

@Entity('GroupChatMessages')
export class GroupChatMessagesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => GroupChatEntity, chat => chat.messages)
    chat: GroupChatEntity;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;
}
