import { Test, TestingModule } from '@nestjs/testing';
import { filmFixtures } from '../films/films.fixtures';
import { OrderController } from './order.controller';
import { orderFixtures } from './order.fixtures';
import { OrderService } from './order.service';
import { FilmsService } from '../films/films.service';

const mockRepository = {
  films: {
    findAll: jest.fn().mockResolvedValue(filmFixtures.films),
    findById: jest.fn().mockResolvedValue(filmFixtures.film),
    save: jest.fn().mockResolvedValue(filmFixtures.film.id),
  },
};

describe('Тестирование заказа', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [FilmsService, OrderService],
    })
      .useMocker((token) => {
        if (token === 'REPOSITORY') return mockRepository;
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('Проверка на наличие пустого места', async () => {
    expect(controller).toBeDefined();
    const result = await controller.createOrder({
      email: 'test@yandex.ru',
      phone: '+79999999999',
      tickets: [orderFixtures.postOrderTicket],
    });
    expect(result).toEqual({
      total: 1,
      items: [orderFixtures.postOrderTicket],
    });
  });

  it('Проверка на отсуствие мест', async () => {
    expect(controller).toBeDefined();
    const requestSeatTaken = {
      ...orderFixtures.postOrderTicket,
      row: 1,
      seat: 2,
    };
    const result = controller.createOrder({
      email: 'test@yandex.ru',
      phone: '+79999999999',
      tickets: [requestSeatTaken],
    });
    await expect(result).rejects.toThrow('Ошибка передачи данных');
  });
});
