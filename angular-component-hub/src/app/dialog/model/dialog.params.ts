import { ButtonParams } from "../../shared/button/params/button-params.model";

export interface DialogParams {
  title: string,
  content: string,
  confirmButtonParams: Partial<ButtonParams>
  cancelButtonParams: Partial<ButtonParams>
}
