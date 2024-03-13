import { Stack, Text, Title } from "@mantine/core";
import React from "react";

type Props = {
  description: string | null | undefined;
};

const Description = ({ description }: Props) => {
  return (
    <Stack>
      <Title order={2}>Description</Title>
      <Text>{description}</Text>
    </Stack>
  );
};

export default Description;
