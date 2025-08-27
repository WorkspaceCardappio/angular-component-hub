import { Filter } from "../../model/filter.model";
import { OrderItem } from "./order-item.model";

export interface RequestParams {
  filters: Filter[];
  orders: OrderItem[];
  page: number;
  size: number;
}
