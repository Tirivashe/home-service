import { Text } from "@mantine/core";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      This is{" "}
      <Text component="span" style={{ color: "var(--mantine-color-red-8)" }}>
        Mantine
      </Text>{" "}
      working
    </main>
  );
}
