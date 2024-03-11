"use client";

import { GetPopularBusinessQuery } from "@/services/queries";
import {
  Badge,
  Button,
  Card,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import NextImage from "next/image";
import React from "react";
import { useQuery } from "urql";
import styles from "./styles.module.scss";

type Props = {};

const BusinessList = (props: Props) => {
  const [{ data, fetching }] = useQuery({
    query: GetPopularBusinessQuery,
  });

  if (fetching) {
    return (
      <Stack p="xl" mt="xl">
        <Title order={2}>Popular Businesses</Title>
        <SimpleGrid cols={{ xs: 2, lg: 4 }} verticalSpacing="xl">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => (
            <Card key={idx} shadow="sm" radius="md" withBorder>
              <Card.Section>
                <Skeleton height={300} width="auto" />
              </Card.Section>
              <Stack gap="0.3rem" py="sm">
                <Skeleton height={21} width={56} radius="xl" />
                <Skeleton height={20} width={120} radius="xl" />
                <Skeleton height={15} width={100} radius="xl" />
                <Skeleton height={25} width={200} radius="xl" />
                <Skeleton height={36} width={107} radius="sm" />
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    );
  }

  return (
    <Stack p="xl" mt="xl">
      <Title order={2}>Popular Businesses</Title>
      <SimpleGrid cols={{ xs: 2, lg: 4 }} verticalSpacing="xl">
        {!!data &&
          data.businessLists.map(({ id, name, address, contactPerson, category, images }) => (
            <Card key={id} shadow="sm" radius="md" withBorder className={styles.card}>
              <Card.Section>
                <Image
                  component={NextImage}
                  src={images[0].url}
                  alt="image"
                  height={300}
                  width={350}
                  radius="md"
                />
              </Card.Section>
              <Stack gap="0.3rem" py="sm">
                <Badge className={styles.badge}>{category?.name}</Badge>
                <Title order={4}>{name}</Title>
                <Text c="logo-orange">{contactPerson}</Text>
                <Text truncate="end">{address}</Text>
                <div>
                  <Button>Book Now</Button>
                </div>
              </Stack>
            </Card>
          ))}
      </SimpleGrid>
    </Stack>
  );
};

export default BusinessList;
