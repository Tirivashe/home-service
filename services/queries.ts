"use client";
import { graphql } from "gql.tada";

export const GetCategoriesQuery = graphql(`
  query GetCategories {
    categories {
      id
      name
      icon {
        url
      }
    }
  }
`);
