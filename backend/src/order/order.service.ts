import { Injectable } from '@nestjs/common';
import { FilmsService } from 'src/films/films.service';
import { PostOrderTicketDTO } from './dto/order.dto';
import { PostFilmDTO } from 'src/films/dto/films.dto';

@Injectable()
export class OrderService {
  constructor(private filmService: FilmsService) {}

  async newOrders(orders: PostOrderTicketDTO[]): Promise<PostOrderTicketDTO[]> {
    const filmId = orders[0].film;
    const film = await this.filmService.findOne(filmId);
    orders.forEach((order) => {
      const schedule = film.schedule.find(
        (schedule) => schedule.id === order.session,
      );
      const seatKey = `${order.row}:${order.seat}`;
      if (schedule.taken.indexOf(seatKey) >= 0)
        throw new Error('Ошибка передачи данных');
      schedule.taken.push(seatKey);
    });
    await this.filmService.save(<PostFilmDTO>film);
    return orders;
  }
}
