import { AppConfig } from './app.config.provider';
import { GetFilmDTO, GetFilmsDTO, PostFilmDTO } from './films/dto/films.dto';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Film } from './repository/entities/film';
import { forwardRef, Module } from '@nestjs/common';
import { AppModule } from './app.module';
import { Schedule } from './repository/entities/schedule';
import { PostgresTypeOrmRepository } from './repository/postgres.typeorm.repository';

@Module({
  imports: [
    forwardRef(() => AppModule),
    TypeOrmModule.forRootAsync({
      imports: [forwardRef(() => AppModule)],
      useFactory: async (appConfig: AppConfig) => {
        const dbUrl = new URL(appConfig.database.url);
        return <TypeOrmModuleOptions>{
          type: appConfig.database.driver,
          host: dbUrl.hostname,
          port: dbUrl.port,
          database: dbUrl.pathname.substring(1),
          username: appConfig.database.username,
          password: appConfig.database.password,
          entities: [Film, Schedule],
          synchronize: false,
        };
      },
      inject: ['CONFIG'],
    }),
    TypeOrmModule.forFeature([Film, Schedule]),
  ],
  providers: [
    {
      provide: 'POSTGRES_REPOSITORY',
      useClass: PostgresTypeOrmRepository,
    },
    {
      provide: 'REPOSITORY',
      useFactory: (config: AppConfig, postgresRepository: AppRepository) => {
        return postgresRepository;
      },
      inject: ['CONFIG', 'POSTGRES_REPOSITORY'],
    },
  ],
  exports: ['REPOSITORY'],
})
export class AppRepositoryModule {}

export interface AppRepository {
  films: FilmsRepository;
}

export interface FilmsRepository {
  findAll(): Promise<GetFilmsDTO>;

  findById(id: string): Promise<GetFilmDTO>;

  save(film: PostFilmDTO): Promise<string>;
}
