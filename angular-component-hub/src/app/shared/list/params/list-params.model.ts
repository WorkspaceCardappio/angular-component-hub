import { WritableSignal } from "@angular/core";
import { EntityService } from "../../../../entity/entity.service";
import { PageColumn } from "../../../model/page-column.model";
import { DropdownItem } from '../../dropdown-menu-list/model/dropdown-item.model';

export interface ListParams {
  route: string,
  service: EntityService<any, any>,
  columns: Partial<PageColumn>[],
  filters: Partial<DropdownItem>[];
}
