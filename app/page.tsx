import BusinessList from "@/components/BusinessList";
import Categories from "@/components/Categories";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <BusinessList />
    </main>
  );
}
