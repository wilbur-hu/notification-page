import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

const range = (start: number, stop: number, step: number = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step))

export {
  range
};