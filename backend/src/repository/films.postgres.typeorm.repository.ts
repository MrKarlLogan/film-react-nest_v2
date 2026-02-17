import { FilmsRepository } from '../app.repository.module';
import { Repository } from 'typeorm';
import { Film } from './entities/film';
import {
  GetFilmDTO,
  GetFilmsDTO,
  GetScheduleDTO,
  PostFilmDTO,
} from 'src/films/dto/films.dto';
import { Schedule } from './entities/schedule';

export class FilmsPostgresTypeOrmRepository implements FilmsRepository {
  constructor(private filmRepository: Repository<Film>) {}

  async findAll(): Promise<GetFilmsDTO> {
    const films = await this.filmRepository.find({});
    return {
      page: 0,
      size: 50,
      total: films.length,
      items: films.map(this.filmToDtoMapper()),
    };
  }

  async findById(id: string): Promise<GetFilmDTO> {
    const film = await this.filmRepository.findOne({ where: { id } });
    return film ? this.filmToDtoMapper()(film) : null;
  }

  async save(film: PostFilmDTO): Promise<string> {
    if (film.id) {
      const data = this.dtoToFilmMapper()(film);
      const entity = await this.filmRepository.preload(data);
      entity.schedule = data.schedule;
      await this.filmRepository.save(entity);
      return film.id;
    } else {
      const data = this.dtoToFilmMapper()(film);
      const entity = this.filmRepository.create(data);
      const saved = await this.filmRepository.save(entity);
      return saved.id;
    }
  }

  private filmToDtoMapper(): (Film) => GetFilmDTO {
    return (root: Film) => {
      return <GetFilmDTO>{
        id: root.id,
        description: root.description,
        director: root.director,
        rating: root.rating,
        tags: root.tags,
        image: root.image,
        cover: root.cover,
        title: root.title,
        about: root.about,
        schedule: root.schedule?.map(this.scheduleToDtoMapper()),
      };
    };
  }

  private scheduleToDtoMapper(): (Schedule) => GetScheduleDTO {
    return (root: Schedule) => {
      return <GetScheduleDTO>{
        id: root.id,
        taken: root.taken,
        hall: root.hall,
        daytime: root.daytime,
        rows: root.rows,
        seats: root.seats,
        price: root.price,
      };
    };
  }

  private dtoToFilmMapper(): (PostFilmDTO) => Film {
    return (dto: PostFilmDTO) => {
      return <Film>{
        id: dto.id,
        description: dto.description,
        director: dto.director,
        rating: dto.rating,
        tags: dto.tags,
        image: dto.image,
        cover: dto.cover,
        title: dto.title,
        about: dto.about,
        schedule: dto.schedule.map(this.dtoToScheduleMapper()),
      };
    };
  }

  private dtoToScheduleMapper(): (GetScheduleDTO) => Schedule {
    return (dto: GetScheduleDTO) => {
      return <Schedule>{
        price: dto.price,
        seats: dto.seats,
        rows: dto.rows,
        daytime: dto.daytime,
        hall: dto.hall,
        taken: dto.taken,
        id: dto.id,
      };
    };
  }
}
