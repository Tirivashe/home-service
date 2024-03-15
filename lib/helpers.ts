export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getTimeSlots = () => {
  const timeList = [];
  for (let i = 8; i <= 17; i++) {
    if (i === 12) {
      timeList.push({
        time: "12:00 PM",
      });
      timeList.push({
        time: "12:30 PM",
      });
      continue;
    }

    if (i > 12) {
      timeList.push({
        time: i - 12 + ":00 PM",
      });
      timeList.push({
        time: i - 12 + ":30 PM",
      });
      continue;
    }

    timeList.push({
      time: i + ":00 AM",
    });
    timeList.push({
      time: i + ":30 AM",
    });
  }

  timeList.push({ time: "6:00 PM" });
  return timeList;
};
