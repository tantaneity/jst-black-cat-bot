import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroupChatService } from '../services/group-chat.service';
import { Public } from 'utils/decorators/public.decorator';
import { GroupChatEntity } from 'src/models/entities/group-chat.entity';
import { CreateGroupChatDto } from 'src/models/dto/group/create-group-chat.dto';

@Controller('group-chats')
export class GroupChatController {
    constructor(private service: GroupChatService) {}

    @Public()
    @Get()
    getGroupChats() {
        return this.service.getGroupChats();
    }

    @Public()
    @Get(':id')
    getGroupChat(@Param('id') id: number) {
        return this.service.getGroupChat({ chat_id: id });
    }

    @Post('create')
    create(@Body() groupChat: CreateGroupChatDto) {
        this.service.create(groupChat);
        return { message: 'Group chat was successfully created' };
    }
}
