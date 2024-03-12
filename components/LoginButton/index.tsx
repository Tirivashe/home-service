import { theme } from "@/theme";
import { Avatar, Button, Menu, rem } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import React from "react";

type Props = {
  data: Session | null;
};

const LoginButton = ({ data }: Props) => {
  if (data) {
    return (
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Avatar src={data.user?.image} style={{ cursor: "pointer" }}>
            {data.user?.name?.slice(0, 1)}
          </Avatar>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Account</Menu.Label>
          <Menu.Item>My Bookings</Menu.Item>
          <Menu.Divider />
          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            color="red"
            leftSection={
              <IconLogout
                color={theme.colors?.red?.[3]}
                style={{ width: rem(14), height: rem(14) }}
              />
            }
            onClick={() => signOut()}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }

  return <Button onClick={() => signIn("descope")}>Login / Sign Up</Button>;
};

export default LoginButton;
