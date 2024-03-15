"use client";

import { Container, Tabs, Title, stylesToString } from "@mantine/core";
import React from "react";
import styles from "./styles.module.scss";
import BookingHistoryList from "./_components/BookingHistoryList";

type Props = {};

const BookingHistory = (props: Props) => {
  return (
    <Container size="responsive" className={styles.root}>
      <Title order={2} fw="bolder" my="lg">
        My Bookings
      </Title>
      <Tabs variant="pills" defaultValue="bookings">
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
