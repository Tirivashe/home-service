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

export const GetPopularBusinessQuery = graphql(`
  query QueryPopularBusinessList {
    businessLists(where: { category: { name: "Cleaning" } }) {
      id
      name
      contactPerson
      address
      category {
        name
      }
      images {
        url
      }
    }
  }
`);
