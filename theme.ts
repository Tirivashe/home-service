"use client";

import { CSSVariablesResolver, MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  primaryColor: "logo-orange",
  primaryShade: 5,
  colors: {
    "logo-orange": [
      "#fff0e3",
      "#ffe0cd",
      "#ffbf9b",
      "#ff9c64",
      "#fe7e37",
      "#fe6c1a",
      "#ff6209",
      "#e45100",
      "#cb4700",
      "#b13b00",
    ],
  },
};

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-color-logo-orange-0": "#fff0e3",
    "--mantine-color-logo-orange-1": "#ffe0cd",
    "--mantine-color-logo-orange-2": "#ffbf9b",
    "--mantine-color-logo-orange-3": "#ff9c64",
    "--mantine-color-logo-orange-4": "#fe7e37",
    "--mantine-color-logo-orange-5": "#fe6c1a",
    "--mantine-color-logo-orange-6": "#ff6209",
    "--mantine-color-logo-orange-7": "#e45100",
    "--mantine-color-logo-orange-8": "#cb4700",
    "--mantine-color-logo-orange-9": "#b13b00",
  },
  light: {},
  dark: {},
});
