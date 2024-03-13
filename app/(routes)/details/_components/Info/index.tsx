import { Avatar, Badge, Flex, Group, Stack, Text, ThemeIcon, Title, rem } from "@mantine/core";
import {
  IconClock,
  IconLocation,
  IconMail,
  IconMapPin,
  IconShare2,
  IconUser,
} from "@tabler/icons-react";
import React from "react";

type Props = {
  business:
    | {
        name: string | null;
        about: string | null;
        address: string | null;
        contactPerson: string | null;
        email: string | null;
        images: {
          url: string;
        }[];
        category: {
          name: string | null;
        } | null;
      }
    | null
    | undefined;
};

const Info = ({ business }: Props) => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align={{ base: "center", md: "start" }}
      gap="md"
    >
      {/* left flex containing avatar and info */}
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap="md"
        align={{ base: "center", sm: "start" }}
        justify="start"
      >
        <Avatar src={business?.images[0].url} size={rem(180)} />
        <Stack>
          <Badge>{business?.category?.name}</Badge>
          <Title>{business?.name}</Title>
          <Group gap="xs">
            <IconMapPin />
            <Text>{business?.address}</Text>
          </Group>
          <Group gap="xs">
            <IconMail />
            <Text>{business?.email}</Text>
          </Group>
        </Stack>
      </Flex>

      {/* right stack containing name, time, availability */}
      <Flex
        direction="column"
        align={{ base: "center", md: "end" }}
        w="auto"
        style={{ flex: 1 }}
        gap="md"
      >
        <ThemeIcon size="lg">
          <IconShare2 />
        </ThemeIcon>
        <Group gap="xs">
          <IconUser size="1.2rem" style={{ color: "var(--mantine-color-logo-orange-5)" }} />
          <Text c="logo-orange">{business?.contactPerson}</Text>
        </Group>
        <Group gap="xs">
          <IconClock size="1.2rem" />
          <Text>Available 8AM to 10PM</Text>
        </Group>
      </Flex>
    </Flex>
  );
};

export default Info;
