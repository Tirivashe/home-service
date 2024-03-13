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
      category {
        name
      }
      images {
        url
      }
    }
  }
`);

export const GetSimilarBusinessByIdQuery = graphql(`
  query SimilarBusinessByIdQuery($id: ID, $name: String) {
    businessLists(where: { NOT: { id: $id }, AND: { category: { name: $name } } }) {
      id
      contactPerson
      address
      name
      images {
        url
      }
    }
  }
`);
