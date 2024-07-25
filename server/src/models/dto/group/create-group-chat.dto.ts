import { IsString, IsNumber } from 'class-validator';

export class CreateGroupChatDto {
  @IsNumber()
  chatId: number;

  @IsString()
  name: string;
}
