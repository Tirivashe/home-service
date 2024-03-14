import { getTimeSlots } from "@/lib/helpers";
import { Button, Drawer, Group, SimpleGrid, Text } from "@mantine/core";
import { DatePicker as MantineDatePicker } from "@mantine/dates";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useQuery } from "urql";
import { GetBookingsByBusinessIdQuery } from "@/services/queries";
import dayjs from "dayjs";

type Props = {
  businessId: string;
  createBooking: (date: string, time: string) => Promise<void>;
  opened: boolean;
  close: () => void;
};

const DatePicker = ({ businessId, createBooking, opened, close }: Props) => {
  const [timeSlots, setTimeSlots] = useState<{ time: string }[]>([]);
  const [value, setValue] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>();

  const [{ data: existingBookings }, reexecuteQuery] = useQuery({
    query: GetBookingsByBusinessIdQuery,
    variables: {
      id: businessId,
      date: dayjs(value).format("MMM DD, YYYY"),
    },
    pause: !value,
  });

  const isSlotAvailable = (timeSlot: string) => {
    const bookedSlot = existingBookings?.bookings.find((booking) => booking.time === timeSlot);
    const fullBookingDate = dayjs(value).format("MMM DD, YYYY") + " " + timeSlot;
    return !!bookedSlot || new Date(fullBookingDate).getTime() < Date.now();
  };
  const bookAppointment = async () => {
    if (!(value && selectedSlot)) {
      return;
    }

    if (isSlotAvailable(selectedSlot)) {
      return;
    }

    close();
    await createBooking(dayjs(value).format("MMM DD, YYYY"), selectedSlot);
    setValue(null);
    setSelectedSlot("");
  };

  useEffect(() => {
    setTimeSlots(getTimeSlots());
  }, []);

  useEffect(() => {
    reexecuteQuery();
  }, [value, reexecuteQuery]);

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Book on Service"
      position="right"
      radius="md"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      <Text>Select the date and time to book your service</Text>
      <Text fw="bold" size="sm" mt="xl" mb="md">
        Select Date
      </Text>
      <MantineDatePicker
        value={value}
        onChange={setValue}
        className={styles.datepicker}
        minDate={new Date()}
        hideOutsideDates
      />
      <Text fw="bold" size="sm" mt="xl" mb="md">
        Select Time Slot
      </Text>
      <SimpleGrid cols={3}>
        {timeSlots.map((slot, idx) => (
          <Button
            key={idx}
            variant="outline"
            radius="lg"
            size="xs"
            data-selected={slot.time === selectedSlot}
            className={styles.timeslot}
            onClick={() => setSelectedSlot(slot.time)}
            disabled={isSlotAvailable(slot.time)}
          >
            {slot.time}
          </Button>
        ))}
      </SimpleGrid>
      <Group justify="end" align="center" gap="md" py="lg">
        <Button onClick={close} color="red.5" variant="light">
          Cancel
        </Button>
        <Button disabled={!(selectedSlot && value)} onClick={bookAppointment}>
          Book
        </Button>
      </Group>
    </Drawer>
  );
};

export default DatePicker;
