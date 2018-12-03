import {
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  Body,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { OrderDTO } from './order.dto';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from 'src/user/user.decorator';

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

  @Get(':id')
  readOrder(@Param('id') id) {
    return this.orderService.read(id);
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createOrder(@User('id') userId, @Body() data: OrderDTO) {
    console.log('id ' + userId);
    return this.orderService.create(userId, data);
  }
}
