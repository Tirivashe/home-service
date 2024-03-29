"use client";
import { useQuery } from "urql";
import { GetCategoriesQuery } from "@/services/queries";
import NextImage from "next/image";

import { Center, Image, SimpleGrid, Skeleton, Stack, Text } from "@mantine/core";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

type Props = {};

const Categories = (props: Props) => {
  const { push } = useRouter();
  const [{ data, fetching }] = useQuery({
    query: GetCategoriesQuery,
  });

  if (fetching) {
    return (
      <Center component="section">
        <SimpleGrid cols={{ base: 2, sm: 3, lg: 6 }} verticalSpacing="sm">
          {[0, 1, 2, 3, 4, 5].map((element) => (
            <Skeleton key={element} height={120} width={140} animate radius="1rem" />
          ))}
        </SimpleGrid>
      </Center>
    );
  }

  return (
    <Center component="section">
      <SimpleGrid cols={{ base: 2, sm: 3, lg: 6 }} verticalSpacing="sm">
        {!!data &&
          data.categories.map((category) => (
            <Stack
              key={category.id}
              gap="sm"
              align="center"
              justify="center"
              className={styles.category}
              onClick={() => push(`/search/${category.name}`)}
            >
              <Image
                component={NextImage}
                src={category.icon?.url}
                alt="logo"
                width={35}
                height={35}
                fit="contain"
              />
              <Text size="sm" tt="capitalize">
                {category.name}
              </Text>
            </Stack>
          ))}
      </SimpleGrid>
    </Center>
  );
};

export default Categories;
