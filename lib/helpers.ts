export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getTimeSlots = () => {
  const timeList = [];
  for (let i = 8; i <= 12; i++) {
    timeList.push({
      time: i + ":00 AM",
    });
    timeList.push({
      time: i + ":30 AM",
    });
  }
  for (let i = 1; i <= 5; i++) {
    timeList.push({
      time: i + ":00 PM",
    });
    timeList.push({
      time: i + ":30 PM",
    });

    timeList.push({ time: "6:00PM" });
  }

  return timeList;
};
