import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupChatMessageController } from 'src/controllers/group-chat-message.controller';
import { GroupChatMessagesEntity } from 'src/models/entities/group-chat-messages.entity';
import { GroupChatMessageRepository } from 'src/repositories/group-chat-message.repository';
import { GroupChatMessageService } from 'src/services/group-chat-message.service';

@Module({
    imports: [TypeOrmModule.forFeature([GroupChatMessagesEntity])],
    controllers: [GroupChatMessageController],
    providers: [GroupChatMessageService, GroupChatMessageRepository],
    exports: [GroupChatMessageService]
})
export class GroupChatMessageModule {}
