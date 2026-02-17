import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { GetFilmsDTO, GetSchedulesDTO } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  async findAll(): Promise<GetFilmsDTO> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async findOneSchedules(@Param('id') id: string): Promise<GetSchedulesDTO> {
    const film = await this.filmsService.findOne(id);
    return <GetSchedulesDTO>{
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
