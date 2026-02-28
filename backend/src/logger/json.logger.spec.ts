import { JsonLogger } from './json.logger';

describe('Тестирование JsonLogger', () => {
  let log: any;
  const jsonLogger = new JsonLogger();

  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    log.mockReset();
  });

  it('Проверка корректного вывода в консоль', () => {
    jsonLogger.warn('test', { id: 1, name: 'Igor' });
    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith(
      '{"level":"warn","message":"test","optionalParams":[[{"id":1,"name":"Igor"}]]}',
    );
  });
});
