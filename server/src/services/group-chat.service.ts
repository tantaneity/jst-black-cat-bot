import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupChatRepository } from '../repositories/group-chat.repository';
import { PartialKeys } from '../../utils/types/partial-keys';
import { GroupChatEntity } from 'src/models/entities/group-chat.entity';
import { CreateGroupChatDto } from 'src/models/dto/group/create-group-chat.dto';

@Injectable()
export class GroupChatService {
    constructor(private repository: GroupChatRepository) {}

    getGroupChats() {
        return this.repository.getGroupChats();
    }

    async getGroupChat(where: PartialKeys<GroupChatEntity>) {
        const groupChat = await this.repository.getGroupChat(where);
        if (!groupChat) {
            throw new NotFoundException('Group chat was not found by this param');
        }
        return groupChat;
    }

    create(input: CreateGroupChatDto) {
        return this.repository.create(input);
    }
}
