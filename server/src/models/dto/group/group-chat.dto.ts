import { Expose } from 'class-transformer';
import { IsUUID, IsString, IsNumber } from 'class-validator';

export class GroupChatDto {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsNumber()
  chatId: number;

  @Expose()
  @IsString()
  name: string;
}
