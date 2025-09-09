import { DropdownItem } from '../../dropdown-menu-list/model/dropdown-item.model';
import {PageColumn} from '../../model/page-column.model';
import {EntityService} from '../../entity/entity.service';

export interface ListParams {
  route: string,
  service: EntityService<any, any>,
  columns: Partial<PageColumn>[],
  filters: Partial<DropdownItem>[];
}
