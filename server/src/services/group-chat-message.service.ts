import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupChatMessageRepository } from '../repositories/group-chat-message.repository';
import { PartialKeys } from '../../utils/types/partial-keys';
import { GroupChatMessagesEntity } from 'src/models/entities/group-chat-messages.entity';
import { CreateGroupChatMessageDto } from 'src/models/dto/group/create-group-chat-message.dto';

@Injectable()
export class GroupChatMessageService {
    constructor(private repository: GroupChatMessageRepository) {}

    getGroupChatMessages() {
        return this.repository.getGroupChatMessages();
    }

    async getGroupChatMessage(where: PartialKeys<GroupChatMessagesEntity>) {
        const message = await this.repository.getGroupChatMessage(where);
        if (!message) {
            throw new NotFoundException('Group chat message was not found by this param');
        }
        return message;
    }

    create(input: CreateGroupChatMessageDto) {
        return this.repository.create(input);
    }
}
