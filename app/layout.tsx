import "./globals.scss";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  ColorSchemeScript,
  MantineProvider,
} from "@mantine/core";
import Header from "@/components/Header";
import { resolver, theme } from "@/theme";
import { UrqlProvider } from "@/urql/client";
import NextAuthSessionProvider from "./provider";
import { Notifications } from "@mantine/notifications";

export const metadata = {
  title: "Home Service App",
  description: "Find a Home Service and Repair Near You",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <NextAuthSessionProvider>
          <UrqlProvider>
            <MantineProvider theme={theme} cssVariablesResolver={resolver}>
              <Notifications />
              <AppShell header={{ height: 70 }}>
                <AppShellHeader>
                  <Header />
                </AppShellHeader>
                <AppShellMain>{children}</AppShellMain>
              </AppShell>
            </MantineProvider>
          </UrqlProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
