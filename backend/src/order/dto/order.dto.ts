import { IsString, IsNumber, IsArray, ArrayMinSize } from 'class-validator';

export class PostOrderDTO {
  @IsString()
  email: string;
  @IsString()
  phone: string;
  @IsArray()
  @ArrayMinSize(1)
  tickets: PostOrderTicketDTO[];
}

export class PostOrderTicketDTO {
  @IsString()
  time: string;
  @IsString()
  day: string;
  @IsString()
  daytime: string;
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}

export class NewOrderDTO {
  total: number;
  items: PostOrderTicketDTO[];
}
