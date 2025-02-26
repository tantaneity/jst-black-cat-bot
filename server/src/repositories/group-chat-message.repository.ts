import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupChatMessagesEntity } from 'src/models/entities/group-chat-messages.entity';
import { PartialKeys } from 'utils/types/partial-keys';
import { CreateGroupChatMessageDto } from 'src/models/dto/group/create-group-chat-message.dto';

@Injectable()
export class GroupChatMessageRepository {
    constructor(@InjectRepository(GroupChatMessagesEntity) private groupChatMessageRep: Repository<GroupChatMessagesEntity>) {}
    
    async getGroupChatMessages(): Promise<GroupChatMessagesEntity[]> {
        return this.groupChatMessageRep.find({ relations: ['chat'] });
    }

    async getGroupChatMessage(where: PartialKeys<GroupChatMessagesEntity>): Promise<GroupChatMessagesEntity | null> {
        return this.groupChatMessageRep.findOne({ where, relations: ['chat'] });
    }

    async create(input: CreateGroupChatMessageDto): Promise<GroupChatMessagesEntity> {
        const entity = this.groupChatMessageRep.create(input);
        await this.groupChatMessageRep.insert(entity);

        return this.getGroupChatMessage({ id: entity.id });
    }
}
