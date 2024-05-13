import { format } from "date-fns";
import { uk } from "date-fns/locale";

export function formatDate(date) {
  if (date.length > 0) {
    return format(new Date(date), "dd MMMM yyyy", { locale: uk });
  }
}

export function formatDateRelease(date) {
  if (date.length > 0) {
    const re = /-/gi;
    const newData = date.replace(re, ",");
    return format(new Date(newData), "dd MMMM yyyy", { locale: uk });
  }
}
