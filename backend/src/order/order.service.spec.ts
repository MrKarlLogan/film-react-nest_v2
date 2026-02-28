import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { orderFixtures } from '../order/order.fixtures';
import { filmFixtures } from '../films/films.fixtures';
import { FilmsService } from '../films/films.service';

describe('Тестирование OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, FilmsService],
    })
      .useMocker((token) => {
        if (token === 'REPOSITORY') {
          return {
            films: {
              findAll: jest.fn().mockResolvedValue(filmFixtures.films),
              findById: jest.fn().mockResolvedValue(filmFixtures.film),
              save: jest.fn().mockResolvedValue(filmFixtures.film.id),
            },
          };
        }
      })
      .compile();

    service = module.get<OrderService>(OrderService);
  });

  it('Проверка на пустое место', async () => {
    expect(service).toBeDefined();
    const result = await service.newOrders([orderFixtures.postOrderTicket]);
    expect(result).toEqual([orderFixtures.postOrderTicket]);
  });

  it('Проверка на занятое место', async () => {
    expect(service).toBeDefined();
    const requestSeatTaken = {
      ...orderFixtures.postOrderTicket,
      row: 1,
      seat: 2,
    };
    const result = service.newOrders([requestSeatTaken]);
    await expect(result).rejects.toThrow('Ошибка передачи данных');
  });
});
