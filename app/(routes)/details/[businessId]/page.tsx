"use client";
import {
  CreateBookingMutation,
  GetBusinessByIdQuery,
  GetSimilarBusinessByIdQuery,
} from "@/services/queries";
import { Center, Container, Grid, Loader, rem } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React from "react";
import { useMutation, useQuery } from "urql";
import Info from "../_components/Info";
import styles from "./styles.module.scss";
import SimilarBusinesses from "../_components/SimilarBusinesses";
import Description from "../_components/Description";
import { Notifications, notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";

type Props = {};

const BusinessDetails = (props: Props) => {
  const params = useParams();
  const { data, status } = useSession();
  const businessId = params.businessId as string;
  const [{ data: business, fetching }] = useQuery({
    query: GetBusinessByIdQuery,
    variables: { id: businessId },
  });

  const [{ data: similarBusinesses }] = useQuery({
    query: GetSimilarBusinessByIdQuery,
    variables: {
      id: businessId,
      name: business?.businessList?.category?.name,
    },
  });

  const [_, createBookingMutation] = useMutation(CreateBookingMutation);

  const createBooking = async (date: string, time: string) => {
    const createBookingStatus = notifications.show({
      title: "Please wait...",
      message: "We are booking your appointment for you.",
      loading: true,
      withBorder: true,
      autoClose: false,
    });
    try {
      const result = await createBookingMutation({
        id: businessId,
        date,
        time,
        userEmail: data?.user?.email,
        userName: data?.user?.email,
      });
      if (result.error) {
        notifications.update({
          id: createBookingStatus,
          color: "red",
          loading: false,
          message: "Something went wrong, we could not book your appointment.",
          title: "Error",
          autoClose: 3000,
          withCloseButton: false,
          icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
        });
        console.error(result.error.message);
        return;
      }
      if (result.data?.createBooking?.id) {
        notifications.update({
          id: createBookingStatus,
          color: "teal",
          loading: false,
          message: "Your booking has been successfully created.",
          title: "Success!",
          autoClose: 3000,
          withCloseButton: false,
          withBorder: true,
          icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (status === "loading" || fetching) {
    return (
      <Center h={"100dvh"}>
        <Loader type="dots" size="xl" />
      </Center>
    );
  }

  if (status === "unauthenticated") {
    return signIn("descope");
  }

  if (status === "authenticated") {
    return (
      <Container size="responsive" className={styles.root} p="lg" mt="xl">
        <Notifications />
        <Info business={business?.businessList} />
        <Grid py="xl" mt="lg">
          <Grid.Col span={{ base: 12, md: 9 }}>
            <Description description={business?.businessList?.about} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <SimilarBusinesses
              similarBusinesses={similarBusinesses?.businessLists}
              createBooking={createBooking}
              businessId={businessId}
            />
          </Grid.Col>
        </Grid>
      </Container>
    );
  }
};

export default BusinessDetails;
