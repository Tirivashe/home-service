import { Badge, Button, Card, Image, Stack, Text, Title } from "@mantine/core";
import React from "react";
import NextImage from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";

type Props = {
  images: {
    url: string;
  }[];
  category: {
    name: string | null;
  } | null;
  address: string | null;
  contactPerson: string | null;
  name: string | null;
  id: string | number;
};

const BusinessCard = ({ id, images, address, contactPerson, name, category }: Props) => {
  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      className={styles.card}
      component={Link}
      href={`/details/${id}`}
    >
      <Card.Section>
        <Image
          component={NextImage}
          src={images[0].url}
          alt="image"
          height={270}
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
  );
};

export default BusinessCard;
