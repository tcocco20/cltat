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
