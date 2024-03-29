"use client";

import { GetBusinessByCategoryQuery } from "@/services/queries";
import { Card, SimpleGrid, Skeleton, Stack, Title } from "@mantine/core";
import React from "react";
import { useQuery } from "urql";
import BusinessCard from "../BusinessCard";

type Props = {
  title?: string;
  categoryName?: string;
};

const BusinessList = ({ title = "Popular Businesses", categoryName = "cleaning" }: Props) => {
  const [{ data, fetching }] = useQuery({
    query: GetBusinessByCategoryQuery,
    variables: { name: categoryName },
  });

  if (fetching) {
    return (
      <Stack>
        <Title order={2}>{title}</Title>
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
    <Stack>
      <Title order={2} tt="capitalize">
        {title}
      </Title>
      <SimpleGrid cols={{ xs: 2, lg: 4 }} verticalSpacing="xl">
        {!!data &&
          data.businessLists.map((business) => <BusinessCard key={business.id} {...business} />)}
      </SimpleGrid>
    </Stack>
  );
};

export default BusinessList;
