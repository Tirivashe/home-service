"use client";

import {
  Button,
  Group,
  Image,
  Switch,
  Text,
  Title,
  rem,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import appLogo from "../../app/icons/logo.svg";
import NextImage from "next/image";
import React from "react";
import styles from "./styles.module.scss";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import LoginButton from "../LoginButton";
import { useRouter } from "next/navigation"

type Props = {};

const Header = (props: Props) => {
  const { data } = useSession();
  const theme = useMantineTheme();
  const { toggleColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const colorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const navigate = useRouter()
  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors["logo-orange"][2]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[0]}
    />
  );

  return (
    <Group justify="space-between" px="lg" align="center" h="100%" w="100%">
      <Group>
        <Image component={NextImage} src={appLogo} alt="logo" width={40} height={40} />
        <Title size="h3" className={styles["logo-text"]} visibleFrom="xs">
          <Text span c={colorScheme === "dark" ? theme.colors["logo-orange"][5] : ""}>
            Home
          </Text>
          <Text ml="xs" span c={colorScheme === "dark" ? "" : theme.colors["logo-orange"][5]}>
            Services
          </Text>
        </Title>
      </Group>
      <Group component="nav" gap="sm" visibleFrom="md" className={styles.navlinks}>
        <Button onClick={() => navigate.push("/")} variant="transparent">Home</Button>
        <Button variant="transparent">Services</Button>
        <Button variant="transparent">Explore</Button>
        <Button variant="transparent">About Us</Button>
      </Group>
      <Group gap="sm" align="center">
        <Switch
          size="md"
          color={colorScheme === "dark" ? "dark.4" : "gray.2"}
          offLabel={sunIcon}
          onLabel={moonIcon}
          checked={colorScheme === "dark" ? true : false}
          onClick={toggleColorScheme}
        />
        <LoginButton data={data} />
      </Group>
    </Group>
  );
};

export default Header;
