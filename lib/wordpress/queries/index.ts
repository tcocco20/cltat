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

export const getAllInstructorsQuery = /* GraphQL */ `
  query AllInstructors {
    instructors {
      edges {
        node {
          title
          featuredImage {
            node {
              ...Image
            }
          }
          instructorBio {
            instructorBio
          }
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

export const allClassTypesQuery = /* GraphQL */ `
  query AllClassTypes {
    classTypes {
      edges {
        node {
          name
          slug
          description
          subtitle {
            subtitle
          }
        }
      }
    }
  }
`;

export const AllActiveClassesQuery = /* GraphQL */ `
  query ActiveClassesQuery($today: String!) {
    classes(
      where: {
        metaQuery: {
          metaArray: {
            key: "class_date_time"
            value: $today
            compare: GREATER_THAN_OR_EQUAL_TO
            type: DATETIME
          }
        }
      }
    ) {
      edges {
        node {
          classData {
            spotsTaken
            totalSpots
          }
          classInformation {
            classLocation
            description
            isRemote
            classDateTime
            endDateTime
          }
          classTypes {
            edges {
              node {
                paymentInformation {
                  cost
                }
                name
                slug
              }
            }
          }
          databaseId
        }
      }
    }
  }
`;

export const singleClassQuery = /* GraphQL */ `
  query SingleClass($id: ID!) {
    class(id: $id, idType: DATABASE_ID) {
      classData {
        spotsTaken
        totalSpots
      }
      classInformation {
        classLocation
        description
        isRemote
        classDateTime
        endDateTime
      }
      classTypes {
        edges {
          node {
            paymentInformation {
              cost
            }
            name
            slug
          }
        }
      }
      databaseId
    }
  }
`;

export const singleClassApiQuery = /* GraphQL */ `
  query SingleClass($id: ID!) {
    class(id: $id, idType: DATABASE_ID) {
      classData {
        spotsTaken
        totalSpots
      }
      classInformation {
        classDateTime
      }
      classTypes {
        edges {
          node {
            paymentInformation {
              cost
            }
          }
        }
      }
    }
  }
`;

export const getAttendeeQuery = /* GraphQL */ `
  query getAttendee($id: ID!) {
    attendee(id: $id, idType: DATABASE_ID) {
      databaseId
      attendeeInformation {
        fullName
        receiptUrl
        paymentId
        orderId
        class {
          ... on Class {
            databaseId
            classData {
              totalSpots
            }
            classInformation {
              classDateTime
              endDateTime
              classLocation
              isRemote
              description
            }
            classTypes {
              edges {
                node {
                  name
                  paymentInformation {
                    cost
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getLicensesQuery = /* GraphQL */ `
  query GetLicenses {
    licenses {
      edges {
        node {
          title
          slug
          licenseFile {
            file {
              mediaItemUrl
              title
            }
          }
        }
      }
    }
  }
`;
