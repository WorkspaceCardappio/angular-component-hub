import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class EntityService<V, K> {

  private readonly PAGE_SIZE: string = 'page_size';
  private readonly SEARCH: string = 'search';
  private readonly DEFAULT_PAGE_SIZE: number = 20;

  resource: string = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  public findAll(pageSize: number = this.DEFAULT_PAGE_SIZE, search?: string): Observable<V[]> {

    const params = new HttpParams()
      .set(this.PAGE_SIZE, pageSize.toString())
      .set(this.SEARCH, search ? search : '');

    return this.httpClient.get<V[]>(this.resource, { params: params });
  }

  public findById(id: K): Observable<V> {

    return this.httpClient.get<V>(`${this.resource}/${id}`);
  }

  public create(newDTO: V): Observable<HttpResponse<void>> {

    return this.httpClient.post<void>(this.resource, newDTO, {
      observe: 'response'
    });
  }

  public update(id: K, updateDTO: V): Observable<void> {

    return this.httpClient.put<void>(`${this.resource}/${id}`, updateDTO);
  }

  public delete(id: K): Observable<void> {

    return this.httpClient.delete<void>(`${this.resource}/${id}`);
  }
}
