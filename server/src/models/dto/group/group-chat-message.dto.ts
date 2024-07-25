import { Expose } from 'class-transformer';
import { IsUUID, IsOptional, IsDateString } from 'class-validator';

export class GroupChatMessageDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsUUID()
  chatId: string;

  @Expose()
  @IsOptional()
  @IsDateString()
  timestamp: Date;
}
