import { TskvLogger } from './tskv.logger';

describe('Тестирование TskvLogger', () => {
  let log: any;
  const tskvLogger = new TskvLogger();

  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    log.mockReset();
  });

  it('Проверка корректного вывода в консоль', () => {
    tskvLogger.warn('test', { id: 1, name: 'Igor' });
    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith(
      'level=warn\tmessage=test\toptional=[[{"id":1,"name":"Igor"}]]',
    );
  });
});
