import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { filmFixtures } from './films.fixtures';

describe('Тестирование FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsService],
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

    service = module.get<FilmsService>(FilmsService);
  });

  it('Показать все фильмы', async () => {
    expect(service).toBeDefined();
    const films = await service.findAll();
    expect(films).toEqual(films);
  });

  it('Найти отдельный фильм', async () => {
    expect(service).toBeDefined();
    const films = await service.findOne('7');
    expect(films).toEqual(filmFixtures.film);
  });

  it('Сохранение фильма', async () => {
    expect(service).toBeDefined();
    const id = await service.save(filmFixtures.film);
    expect(id).toEqual(filmFixtures.film.id);
  });
});
