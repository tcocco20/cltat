// Will replace with actual query to fetch a single page by its ID
export const singlePageQuery = /* GraphQL */ `
  query GetSinglePage($slug: ID!) {
    page(id: $slug, idType: URI) {
      blocks(postTemplate: false)
      title
    }
  }
`;
