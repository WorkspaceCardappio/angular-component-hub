import { EntityService } from '../entity.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import SpyObj = jasmine.SpyObj;

describe('entity.service.spec.ts', () => {

  let service: EntityService<any, string>;
  let httpClient: SpyObj<HttpClient>;
  let url = '/api/entities';

  beforeEach(() => {

    httpClient = jasmine.createSpyObj('httpClient', ['get', 'post', 'put', 'delete']);

    service = new EntityService(httpClient);
    service.resource = url;
  });

  it('findByAll with pageSize', () => {

    service.findAll(100);

    const call = httpClient.get.calls.mostRecent();
    const expedtedUrl = call.args[0];
    const expectedParams = call.args[1]?.params as HttpParams;

    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(expedtedUrl).toEqual(url);
    expect(expectedParams.get('page_size')).toEqual('100');
  });

  it('findAll without pageSize', () => {

    service.findAll();

    const call = httpClient.get.calls.mostRecent();
    const expedtedUrl = call.args[0];
    const expectedParams = call.args[1]?.params as HttpParams;

    expect(httpClient.get).toHaveBeenCalledTimes(1);
    expect(expedtedUrl).toEqual(url);
    expect(expectedParams.get('page_size')).toEqual('20');
  });

  it('findById', () => {

    service.findById('test');

    expect(httpClient.get).toHaveBeenCalledOnceWith(`${url}/test`);
  });

  it('create', () => {

    const dto = { id: 'test' };

    service.create(dto);

    expect(httpClient.post).toHaveBeenCalledOnceWith(url, dto, jasmine.objectContaining({ observe: 'response' }));
  });

  it('update', () => {

    const dto = { id: 'test' };

    service.update('test', dto);

    expect(httpClient.put).toHaveBeenCalledOnceWith(`${url}/test`, dto);
  });

  it('delete', () => {

    service.delete('test');

    expect(httpClient.delete).toHaveBeenCalledOnceWith(`${url}/test`);
  });
});
