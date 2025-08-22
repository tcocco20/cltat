export const imageFragment = /* GraphQL */ `
  fragment Image on MediaItem {
    altText
    mediaItemUrl
    mediaDetails {
      height
      width
    }
  }
`;
