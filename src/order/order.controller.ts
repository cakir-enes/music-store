import { Controller, Get, Param, Post, UsePipes, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { OrderDTO } from './order.dto';

@Controller('api/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  showAllOrders() {
    return this.orderService.showAll();
  }

  @Get('user/:id')
  showOrdersByUser(@Param('id') userid) {
    return this.orderService.showByUser(userid);
  }

  // @Get(':id')
  // readOrder(@Param('id') id) {
  //     return this.orderService.read(id);
  // }

  @Post('user/:id')
  @UsePipes(new ValidationPipe())
  createOrder(@Param('id') userId, @Body() data: OrderDTO) {
    return this.orderService.create(userId, data);
  }
}
