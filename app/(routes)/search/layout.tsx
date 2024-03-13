"use client";
import CategorySideNav from "@/components/CategorySideNav";
import { Grid } from "@mantine/core";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <Grid style={{ overflow: "hidden" }} py="xl" px="lg" gutter="xl">
      <Grid.Col span={3} visibleFrom="sm">
        <CategorySideNav />
      </Grid.Col>
      <Grid.Col span="auto">{children}</Grid.Col>
    </Grid>
  );
};

export default layout;
