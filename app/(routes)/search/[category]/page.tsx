"use client";

import BusinessList from "@/components/BusinessList";
import { useParams } from "next/navigation";
import React from "react";
import { useQuery } from "urql";

type Props = {};

const CategoryPage = (props: Props) => {
  const params = useParams();
  const category = params.category as string;

  return <BusinessList title={category} categoryName={category} />;
};

export default CategoryPage;
