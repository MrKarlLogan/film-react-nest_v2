export class GetFilmsDTO {
  page: number;
  size: number;
  total: number;
  items: GetFilmDTO[];
}

export class GetFilmDTO {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: GetScheduleDTO[];
}

export class GetScheduleDTO {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class GetSchedulesDTO {
  total: number;
  items: GetScheduleDTO[];
}

export class PostFilmDTO extends GetFilmDTO {}
