import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GroupChatMessagesEntity } from './group-chat-messages.entity';

@Entity('GroupChats')
export class GroupChatEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'bigint' })
    chat_id: number;

    @Column()
    name: string;

    @OneToMany(() => GroupChatMessagesEntity, message => message.chat)
    messages: GroupChatMessagesEntity[];
}
