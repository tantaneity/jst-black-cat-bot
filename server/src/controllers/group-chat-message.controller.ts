import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroupChatMessageService } from '../services/group-chat-message.service';
import { Public } from 'utils/decorators/public.decorator';
import { CreateGroupChatMessageDto } from 'src/models/dto/group/create-group-chat-message.dto';

@Controller('group-chat-messages')
export class GroupChatMessageController {
    constructor(private service: GroupChatMessageService) {}

    @Public()
    @Get()
    getGroupChatMessages() {
        return this.service.getGroupChatMessages();
    }

    @Public()
    @Get(':id')
    getGroupChatMessage(@Param('id') id: string) {
        return this.service.getGroupChatMessage({ id });
    }

    @Post('create')
    create(@Body() groupChatMessage: CreateGroupChatMessageDto) {
        this.service.create(groupChatMessage);
        return { message: 'Group chat message was successfully created' };
    }
}
