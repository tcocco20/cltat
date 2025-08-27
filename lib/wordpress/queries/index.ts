import { imageFragment } from "./fragments";

export const singlePageQuery = /* GraphQL */ `
  query GetSinglePage($slug: ID!) {
    page(id: $slug, idType: URI) {
      blocks(postTemplate: false)
      title
      pageBanner {
        pageBanner {
          ...Image
        }
      }
    }
  }
  ${imageFragment}
`;

export const singleMenuQuery = /* GraphQL */ `
  query NewQuery($slug: ID!) {
    menu(id: $slug, idType: SLUG) {
      menuItems {
        edges {
          node {
            path
            label
          }
        }
      }
    }
  }
`;

export const simpleClassTypesQuery = /* GraphQL */ `
  query SimpleClassTypes {
    classTypes {
      edges {
        node {
          name
          slug
        }
      }
    }
  }
`;
