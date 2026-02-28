import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { filmFixtures } from './films.fixtures';

describe('Тестирование FilmController', () => {
  let controller: FilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .useMocker((token) => {
        if (token === 'REPOSITORY') {
          return {
            films: {
              findAll: jest.fn().mockResolvedValue(filmFixtures.films),
              findById: jest.fn().mockResolvedValue(filmFixtures.film),
            },
          };
        }
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('Получение всех фильмов', async () => {
    expect(controller).toBeDefined();
    const findResult = await controller.findAll();
    expect(findResult).toEqual(filmFixtures.films);
  });

  it('Получение расписания', async () => {
    expect(controller).toBeDefined();
    const findResult = await controller.findOneSchedules('7');
    expect(findResult).toEqual({
      total: filmFixtures.film.schedule.length,
      items: filmFixtures.film.schedule,
    });
  });
});
