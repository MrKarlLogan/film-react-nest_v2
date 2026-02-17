import { Module } from '@nestjs/common';
import { FilmsService } from './films/films.service';
import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';
import { AppRepositoryModule } from './app.repository.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'public'),
    }),
    AppRepositoryModule,
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, FilmsService, OrderService],
  exports: [configProvider],
})
export class AppModule {}
