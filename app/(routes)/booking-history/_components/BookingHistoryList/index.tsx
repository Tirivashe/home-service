import { GetUserBookingHistoryQuery } from "@/services/queries";
import { Group, Image, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconCalendar, IconClock, IconMapPin, IconUser } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import NextImage from "next/image";
import React from "react";
import { useQuery } from "urql";

type Props = {
  status: "Booked" | "Canceled" | "Completed";
};

const BookingHistoryList = ({ status }: Props) => {
  const { data } = useSession();

  const [{ data: userBookings }] = useQuery({
    query: GetUserBookingHistoryQuery,
    variables: { userEmail: data?.user?.email, status },
    pause: !data,
  });
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} py="lg">
      {userBookings?.bookings?.map((booking) => (
        <Group
          key={booking.id}
          p="xs"
          gap="sm"
          grow
          preventGrowOverflow
          style={{ borderRadius: "1rem", border: "1px solid var(--mantine-color-gray-5)" }}
        >
          <Image
            component={NextImage}
            src={booking.businessList?.images[0].url}
            alt="image"
            height={150}
            width={150}
            radius="md"
          />
          <Stack gap="xs" style={{ flex: 1, overflow: "hidden" }}>
            <Text size="sm" fw="bold">
              {booking.businessList?.name}
            </Text>
            <Group gap="sm" style={{ overflow: "hidden" }}>
              <IconUser size="1rem" style={{ color: "var(--mantine-color-logo-orange-5)" }} />
              <Text c="logo-orange.5" size="xs">
                {booking.businessList?.contactPerson}
              </Text>
            </Group>
            <Group gap="sm" w="100%" style={{ overflow: "hidden" }}>
              <IconMapPin size="1rem" style={{ color: "var(--mantine-color-logo-orange-5)" }} />
              <Text size="xs" truncate="end">
                {booking.businessList?.address}
              </Text>
            </Group>
            <Group gap="xs">
              <IconCalendar size="1rem" style={{ color: "var(--mantine-color-logo-orange-5)" }} />
              <Text size="xs" truncate="end">
                Service On: <strong>{booking.date}</strong>
              </Text>
            </Group>
            <Group gap="sm">
              <IconClock size="1rem" style={{ color: "var(--mantine-color-logo-orange-5)" }} />
              <Text size="xs" truncate="end">
                Service At: <strong>{booking.time}</strong>
              </Text>
            </Group>
          </Stack>
        </Group>
      ))}
    </SimpleGrid>
  );
};

export default BookingHistoryList;
