import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupChatEntity } from 'src/models/entities/group-chat.entity';
import { PartialKeys } from 'utils/types/partial-keys';
import { CreateGroupChatDto } from 'src/models/dto/group/create-group-chat.dto';

@Injectable()
export class GroupChatRepository {
    constructor(@InjectRepository(GroupChatEntity) private groupChatRep: Repository<GroupChatEntity>) {}
    
    async getGroupChats(): Promise<GroupChatEntity[]> {
        return this.groupChatRep.find({ relations: ['messages'] });
    }

    async getGroupChat(where: PartialKeys<GroupChatEntity>): Promise<GroupChatEntity | null> {
        return this.groupChatRep.findOne({ where, relations: ['messages'] });
    }

    async create(input: CreateGroupChatDto): Promise<GroupChatEntity> {
        const entity = this.groupChatRep.create(input);
        await this.groupChatRep.insert(entity);

        return this.getGroupChat({ chat_id: input.chatId });
    }
}
