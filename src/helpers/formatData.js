import { format } from "date-fns";
import { uk } from "date-fns/locale";

export function formatDate(date) {
  return format(new Date(date), "dd MMMM yyyy", { locale: uk });
}
