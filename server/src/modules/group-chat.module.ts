import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupChatController } from 'src/controllers/group-chat.controller';
import { GroupChatEntity } from 'src/models/entities/group-chat.entity';
import { GroupChatRepository } from 'src/repositories/group-chat.repository';
import { GroupChatService } from 'src/services/group-chat.service';

@Module({
    imports: [TypeOrmModule.forFeature([GroupChatEntity])],
    controllers: [GroupChatController],
    providers: [GroupChatService, GroupChatRepository],
    exports: [GroupChatService]
})
export class GroupChatModule {}
