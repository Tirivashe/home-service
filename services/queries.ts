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

export const GetBusinessByCategoryQuery = graphql(`
  query QueryPopularBusinessList($name: String) {
    businessLists(where: { category: { name: $name } }) {
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

export const GetBusinessByIdQuery = graphql(`
  query BusinessByIdQuery($id: ID) {
    businessList(where: { id: $id }) {
      email
      contactPerson
      address
      about
      name
    }
  }
`);
