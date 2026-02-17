import { Inject, Injectable } from '@nestjs/common';
import { AppRepository } from 'src/app.repository.module';
import { GetFilmDTO, GetFilmsDTO, PostFilmDTO } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(@Inject('REPOSITORY') private repository: AppRepository) {}

  async findAll(): Promise<GetFilmsDTO> {
    return this.repository.films.findAll();
  }

  async findOne(id: string): Promise<GetFilmDTO> {
    return this.repository.films.findById(id);
  }

  async save(film: PostFilmDTO): Promise<string> {
    return this.repository.films.save(film);
  }
}
