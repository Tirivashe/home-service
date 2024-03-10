"use client";
import React from "react";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";

export const client = new Client({
  url: `https://api-us-east-1-shared-usea1-02.hygraph.com/v2/${process.env.NEXT_PUBLIC_HYGRAPH_API_KEY}/master`,
  exchanges: [cacheExchange, fetchExchange],
});

export const UrqlProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider value={client}>{children}</Provider>
);
