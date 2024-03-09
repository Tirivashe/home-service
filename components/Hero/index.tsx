"use client";
import { Group, Stack, Text, TextInput, Title, em, useMantineTheme } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";
import styles from "./styles.module.scss";

type Props = {};

const Hero = (props: Props) => {
  const theme = useMantineTheme();

  return (
    <Stack justify="center" mt={em(70)} pb="md" px="lg">
      <Title order={2} size="42px" style={{ textAlign: "center" }}>
        Find A Home
        <Text span inherit c="logo-orange">
          {" "}
          Service & Repair
        </Text>
        <br /> Near You
      </Title>
      <Text c="gray.5" size="xl" style={{ textAlign: "center" }}>
        Explore The Best Home Services Near You
      </Text>
      <Group justify="center" align="center">
        <TextInput py="md" placeholder="Search" radius="lg" />
        <IconSearch className={styles.icon} size="2rem" />
      </Group>
    </Stack>
  );
};

export default Hero;
