import { EntityService } from "../../../../entity/entity.service";
import { PageColumn } from "../../../model/page-column.model";

export interface ListParams {
  route: string,
  service: EntityService<any, any>,
  columns: Partial<PageColumn>[],
  showActions: boolean
}
