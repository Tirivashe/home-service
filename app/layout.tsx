// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "./globals.scss";

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

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <UrqlProvider>
          <MantineProvider theme={theme} cssVariablesResolver={resolver}>
            <AppShell header={{ height: 70 }}>
              <AppShellHeader>
                <Header />
              </AppShellHeader>
              <AppShellMain>{children}</AppShellMain>
            </AppShell>
          </MantineProvider>
        </UrqlProvider>
      </body>
    </html>
  );
}
