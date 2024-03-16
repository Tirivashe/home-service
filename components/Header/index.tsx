"use client";

import {
  Burger,
  Button,
  Drawer,
  Group,
  Image,
  NavLink,
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
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

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
  const [opened, { open, close }] = useDisclosure();
  const navigate = useRouter();
  const categoryRoutes = ["cleaning", "repair", "painting", "shifting", "plumbing", "electric"];
  const randomCategory = categoryRoutes[Math.floor(Math.random() * categoryRoutes.length)];
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
    <>
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
          <Burger
            opened={opened}
            onClick={open}
            hiddenFrom="xs"
            size="sm"
            aria-label="Toggle Navigation"
          />
        </Group>
        <Group component="nav" gap="sm" visibleFrom="md" className={styles.navlinks}>
          <Button onClick={() => navigate.push("/")} variant="transparent">
            Home
          </Button>
          <Button onClick={() => navigate.push(`/search/${randomCategory}`)} variant="transparent">
            Services
          </Button>
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
      <Drawer
        opened={opened}
        onClose={close}
        position="top"
        size="xs"
        overlayProps={{
          backgroundOpacity: 0.6,
          blur: 5,
        }}
      >
        <NavLink variant="subtle" component={Link} href="/" onClick={close} label="Home" />
        <NavLink
          variant="subtle"
          component={Link}
          href={`/search/${randomCategory}`}
          onClick={close}
          label="Services"
        />
        <NavLink variant="subtle" component={Link} href="#" label="Explore" />
        <NavLink variant="subtle" component={Link} href="#" label="About Us" />
      </Drawer>
    </>
  );
};

export default Header;
