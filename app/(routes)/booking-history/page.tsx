"use client";

import { Center, Container, Loader, Tabs, Title } from "@mantine/core";
import React from "react";
import styles from "./styles.module.scss";
import BookingHistoryList from "./_components/BookingHistoryList";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {};

const BookingHistory = (props: Props) => {
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
      <Tabs variant="pills" defaultValue="bookings" classNames={{ list: styles.tabList }}>
        <Tabs.List>
          <Tabs.Tab value="bookings">Booked</Tabs.Tab>
          <Tabs.Tab value="completed">Completed</Tabs.Tab>
          <Tabs.Tab value="canceled">Canceled</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="bookings">
          <BookingHistoryList status="Booked" />
        </Tabs.Panel>
        <Tabs.Panel value="completed">
          <BookingHistoryList status="Completed" />
        </Tabs.Panel>
        <Tabs.Panel value="canceled">
          <BookingHistoryList status="Canceled" />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default BookingHistory;
