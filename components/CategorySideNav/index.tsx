import { GetCategoriesQuery } from "@/services/queries";
import { Group, Image, NavLink, Stack, Text } from "@mantine/core";
import NextImage from "next/image";
import React from "react";
import { useQuery } from "urql";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useParams } from "next/navigation";
import { capitalize } from "@/lib/helpers";

type Props = {};

const CategorySideNav = (props: Props) => {
  const params = useParams();
  const category = params.category as string;
  const [{ data, fetching }] = useQuery({
    // TODO: Implement loading state
    query: GetCategoriesQuery,
  });
  return (
    <Stack component="aside">
      <Text c="logo-orange" fz="md" fw="bold">
        Categories
      </Text>
      {!!data &&
        data.categories.map((category) => (
          <NavLink
            component={Link}
            href={`/search/${category.name}`}
            active={category.name === params.category}
            key={category.id}
            label={!!category.name && capitalize(category.name)}
            leftSection={
              <Image
                component={NextImage}
                src={category.icon?.url}
                alt="logo"
                width={30}
                height={30}
                fit="contain"
              />
            }
            className={styles.category}
          />
        ))}
    </Stack>
  );
};

export default CategorySideNav;
