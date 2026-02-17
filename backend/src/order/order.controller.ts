import { Body, Controller, Post } from '@nestjs/common';
import { NewOrderDTO, PostOrderDTO } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async createOrder(@Body() body: PostOrderDTO): Promise<NewOrderDTO> {
    const orders = await this.orderService.newOrders(body.tickets);
    return <NewOrderDTO>{
      total: orders.length,
      items: orders,
    };
  }
}
