"use client";
import { Button, Group, Image, Stack, Text, Title, rem } from "@mantine/core";
import NextImage from "next/image";
import { IconNotebook } from "@tabler/icons-react";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import DatePicker from "@/components/DatePicker";

type Props = {
  businessId: string;
  createBooking: (date: string, time: string) => Promise<void>;
  similarBusinesses:
    | {
        images: {
          url: string;
        }[];
        name: string | null;
        address: string | null;
        contactPerson: string | null;
        id: string | number;
      }[]
    | undefined;
};

const SimilarBusinesses = ({ businessId, createBooking, similarBusinesses }: Props) => {
  const navigate = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Stack>
      <Button leftSection={<IconNotebook />} onClick={open}>
        Book Appointment
      </Button>
      <Stack>
        <Title order={4}>Similar Businesses</Title>
        {similarBusinesses?.map((business) => (
          <Group
            key={business.id}
            preventGrowOverflow
            wrap="wrap"
            gap="xs"
            className={styles.miniCard}
            onClick={() => navigate.push(`/details/${business.id}`)}
          >
            <Image
              component={NextImage}
              src={business.images[0].url}
              alt="image"
              width={100}
              height={100}
              fit="contain"
              radius="sm"
            />
            <Stack gap={rem(5)} style={{ overflow: "hidden" }} py={rem(2)} flex={1}>
              <Text size="sm" fw="bold" truncate="end">
                {business.name}
              </Text>
              <Text lineClamp={1} size="sm" c="logo-orange">
                {business.contactPerson}
              </Text>
              <Text size="sm" c="dimmed">
                {business.address}
              </Text>
            </Stack>
          </Group>
        ))}
      </Stack>
      <DatePicker
        opened={opened}
        close={close}
        createBooking={createBooking}
        businessId={businessId}
      />
    </Stack>
  );
};

export default SimilarBusinesses;
