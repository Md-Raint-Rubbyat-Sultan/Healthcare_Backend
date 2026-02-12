import { addHours, addMinutes, format } from "date-fns";

const convertIntoDateTime = (
  date: Date,
  time: string,
  dateType: string = "yyyy-MM-dd",
) => {
  return new Date(
    addMinutes(
      addHours(
        `${format(date, dateType)}`,
        Number(time.split(":")[0]), // 11:00
      ),
      Number(time.split(":")[1]),
    ),
  );
};

export const dateTimeConverter = {
  convertIntoDateTime,
};
