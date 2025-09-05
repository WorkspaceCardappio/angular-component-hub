import { SortItem } from "./order-item.model";
import {Filter} from './filter.model';

export interface RequestParams {
  filters: Filter[];
  orders: SortItem[];
  page: number;
  size: number;
}
