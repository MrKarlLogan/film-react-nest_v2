import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AppRepository, FilmsRepository } from '../app.repository.module';
import { FilmsPostgresTypeOrmRepository } from './films.postgres.typeorm.repository';

@Injectable()
export class PostgresTypeOrmRepository implements AppRepository {
  films: FilmsRepository;

  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
  ) {
    this.films = new FilmsPostgresTypeOrmRepository(filmRepository);
  }
}
