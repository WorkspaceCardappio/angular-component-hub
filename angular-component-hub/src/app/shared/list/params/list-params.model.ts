import { EntityService } from "../../../../entity/entity.service";

export interface ListParams {
  route: string,
  service: EntityService<any, any>
}
