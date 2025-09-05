import { BorderParams } from "./border-params.model";
import { IconParams } from "./icon-params.model";
import { SizeParams } from "./size-params.model";
import { TitleParams } from "./title-params.model";

export interface ButtonParams {
  title: Partial<TitleParams>,
  background: string,
  radius: number,
  border: Partial<BorderParams>,
  size: Partial<SizeParams>,
  icon: Partial<IconParams>,
  gap: number
}
