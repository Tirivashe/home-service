import { GetUserBookingHistoryQuery, UpdateBookingStatusMutation } from "@/services/queries";
import {
  Badge,
  Button,
  Center,
  Group,
  Image,
  Loader,
  Modal,
  Select,
  SimpleGrid,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconCalendar,
  IconCheck,
  IconClock,
  IconMapPin,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import NextImage from "next/image";
import React, { useState } from "react";
import { useMutation, useQuery } from "urql";

type Props = {
  status: "Booked" | "Canceled" | "Completed";
};

const BookingHistoryList = ({ status }: Props) => {
  const { data, status: authStatus } = useSession();
  const [opened, { open, close }] = useDisclosure(false);
  const [newStatus, setNewStatus] = useState<string | null>("");
  const [bookingId, setBookingId] = useState<string | number>("");

  const [{ data: userBookings, fetching }] = useQuery({
    query: GetUserBookingHistoryQuery,
    variables: { userEmail: data?.user?.email, status },
  });

  const [_, updateBookingMutation] = useMutation(UpdateBookingStatusMutation);

  const handleOpenModal = (id: string | number) => {
    setBookingId(id);
    open();
  };

  const updateBooking = async () => {
    close();
    const updateMutationNotifID = notifications.show({
      title: "Please wait...",
      message: "We are updating your booking status...",
      loading: true,
      withBorder: true,
      autoClose: false,
      withCloseButton: false,
    });

    try {
      const result = await updateBookingMutation({
        id: bookingId,
        status: newStatus as "Booked" | "Completed" | "Canceled",
      });

      if (result.error) {
        notifications.update({
          id: updateMutationNotifID,
          color: "red",
          loading: false,
          message: "Something went wrong, we could not change your booking.",
          title: "Error",
          autoClose: 3500,
          icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
        });
        console.error(result.error.message);
        return;
      }

      if (result.data?.updateBooking?.id) {
        notifications.update({
          id: updateMutationNotifID,
          color: "teal",
          loading: false,
          message: "Your booking status has been changed successfully.",
          title: "Success!",
          autoClose: 3500,
          withBorder: true,
          icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (authStatus === "loading" || fetching) {
    return (
      <Center>
        <Loader type="dots" />
      </Center>
    );
  }

  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 2 }} py="lg">
        {userBookings?.bookings?.map((booking) => (
          <Group
            key={booking.id}
            p="xs"
            gap="sm"
            preventGrowOverflow
            style={{ borderRadius: "1rem", border: "1px solid var(--mantine-color-gray-5)" }}
          >
            <Group>
              <Image
                component={NextImage}
                src={booking.businessList?.images[0].url}
                alt="image"
                height={150}
                width={150}
                radius="md"
              />
            </Group>
            <Stack flex={1} gap="0.5rem" style={{ flex: 1, overflow: "hidden" }}>
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
              {status === "Booked" && (
                <Button onClick={() => handleOpenModal(booking.id)} size="compact-xs">
                  Change Status
                </Button>
              )}
              {status === "Completed" && (
                <Badge size="sm" color="green">
                  Completed
                </Badge>
              )}
              {status === "Canceled" && (
                <Badge size="sm" color="red">
                  Canceled
                </Badge>
              )}
            </Stack>
          </Group>
        ))}
      </SimpleGrid>
      <Modal
        title="Change Status"
        opened={opened}
        onClose={close}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        centered
      >
        <Stack gap="sm" justify="center">
          <Select
            label="What would you like to your booking to?"
            placeholder="Pick New Booking Status"
            data={["Completed", "Canceled"]}
            value={newStatus}
            onChange={setNewStatus}
          />
          <Button fullWidth variant="subtle" onClick={updateBooking}>
            Change Status
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default BookingHistoryList;
