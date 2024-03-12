import BusinessList from "@/components/BusinessList";
import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import { Box } from "@mantine/core";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <Box p="xl">
        <BusinessList />
      </Box>
    </main>
  );
}
