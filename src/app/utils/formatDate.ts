import {DEFAULT_LOCALE} from "@/app/constants";

export const getFullDate = (date: Date) => {
  return date.toLocaleString(DEFAULT_LOCALE, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
};

// e.g. with en => May 5, 2020
export const getDateOnly = (date: Date) => {
  return date.toLocaleDateString(DEFAULT_LOCALE, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
