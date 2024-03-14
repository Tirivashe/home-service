import { getTimeSlots } from "@/lib/helpers";
import { Button, Drawer, Group, SimpleGrid, Text } from "@mantine/core";
import { DatePicker as MantineDatePicker } from "@mantine/dates";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useQuery } from "urql";
import { GetBookingsByBusinessIdQuery } from "@/services/queries";

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
      date: value?.toDateString(),
    },
    pause: !value,
  });

  const isSlotAlreadyBooked = (timeSlot: string) => {
    const bookedSlot = existingBookings?.bookings.find((booking) => booking.time === timeSlot);
    return !!bookedSlot;
  };

  useEffect(() => {
    setTimeSlots(getTimeSlots());
  }, []);

  useEffect(() => {
    reexecuteQuery();
  }, [value, reexecuteQuery]);

  const bookAppointment = async () => {
    if (!(value && selectedSlot)) {
      return;
    }

    if (isSlotAlreadyBooked(selectedSlot)) {
      return;
    }

    close();
    await createBooking(value.toDateString(), selectedSlot);
    setValue(null);
    setSelectedSlot("");
  };

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
      <MantineDatePicker value={value} onChange={setValue} className={styles.datepicker} />
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
            disabled={isSlotAlreadyBooked(slot.time)}
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
