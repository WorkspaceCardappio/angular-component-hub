import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityService } from '../../projects/cardappio-component-hub/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class Teste extends EntityService<any, any> {

  override resource: string = 'teste';

  constructor(http: HttpClient) {
    super(http);
  }

}
