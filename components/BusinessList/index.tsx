"use client";

import { GetPopularBusinessQuery } from "@/services/queries";
import { Card, SimpleGrid, Skeleton, Stack, Title } from "@mantine/core";
import React from "react";
import { useQuery } from "urql";
import BusinessCard from "../BusinessCard";

type Props = {};

const BusinessList = (props: Props) => {
  // TODO: remove fetch from here only if it is used in one component
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
          data.businessLists.map((business) => <BusinessCard key={business.id} {...business} />)}
      </SimpleGrid>
    </Stack>
  );
};

export default BusinessList;
