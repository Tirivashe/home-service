"use client";
import {
  CreateBookingMutation,
  GetBusinessByIdQuery,
  GetSimilarBusinessByIdQuery,
} from "@/services/queries";
import { Center, Container, Grid, Loader } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React from "react";
import { useMutation, useQuery } from "urql";
import Info from "../_components/Info";
import styles from "./styles.module.scss";
import SimilarBusinesses from "../_components/SimilarBusinesses";
import Description from "../_components/Description";

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

  const [createBookingResult, createBookingMutation] = useMutation(CreateBookingMutation);

  const createBooking = async (date: string, time: string) => {
    try {
      const result = await createBookingMutation({
        id: businessId,
        date,
        time,
        userEmail: data?.user?.email,
        userName: data?.user?.email,
      });
      if (result.error) {
        console.log(result.error);
        return;
      }
      alert(result.data?.createBooking?.id);
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
