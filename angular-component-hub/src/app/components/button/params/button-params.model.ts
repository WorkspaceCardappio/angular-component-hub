import { BorderParams } from "./border-params.model";
import { IconParams } from "./icon-params.model";
import { SizeParams } from "./size-params.model";
import { TitleParams } from "./title-params.model";

export interface ButtonParams {
  title: TitleParams,
  background: string,
  radius: number,
  border: BorderParams,
  size: SizeParams,
  icon: IconParams,
  outlined: false,
  gap: number
}
