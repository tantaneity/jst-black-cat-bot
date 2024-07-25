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
        const entities = await this.groupChatRep.find();
        return entities;
    }

    async getGroupChat(where: PartialKeys<GroupChatEntity>): Promise<GroupChatEntity | null> {
        const entity = await this.groupChatRep.findOneBy(where);
        return entity;
    }

    async create(input: CreateGroupChatDto): Promise<GroupChatEntity> {
        const entity = this.groupChatRep.create(input);
        await this.groupChatRep.insert(entity);

        return this.getGroupChat({ chat_id: input.chatId });
    }
}
