import { IsUUID, IsOptional } from 'class-validator';

export class CreateGroupChatMessageDto {
  @IsUUID()
  chatId: string;

  @IsOptional()
  timestamp?: Date;
}
