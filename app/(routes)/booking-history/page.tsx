"use client";

import { Center, Container, Loader, Tabs, Title } from "@mantine/core";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import BookingHistoryList from "./_components/BookingHistoryList";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {};
const bookingStatusConstants = ["Booked", "Completed", "Canceled"] as const;
export type BookingStatus = (typeof bookingStatusConstants)[number];

const BookingHistory = (props: Props) => {
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("Booked");
  const { status } = useSession();
  if (status === "loading") {
    return (
      <Center h={"100dvh"}>
        <Loader type="dots" size="xl" />
      </Center>
    );
  }

  if (status === "unauthenticated") {
    return redirect("/");
  }
  return (
    <Container size="responsive" className={styles.root}>
      <Title order={2} fw="bolder" my="lg">
        My Bookings
      </Title>
      <Tabs variant="pills" defaultValue={bookingStatus} classNames={{ list: styles.tabList }}>
        <Tabs.List>
          {bookingStatusConstants.map((status) => (
            <Tabs.Tab key={status} value={status} onClick={() => setBookingStatus(status)}>
              {status}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {bookingStatusConstants.map((status) => (
          <Tabs.Panel key={status} value={status}>
            <BookingHistoryList status={status} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </Container>
  );
};

export default BookingHistory;
