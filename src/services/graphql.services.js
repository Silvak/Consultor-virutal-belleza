import { GraphQLClient, gql } from "graphql-request";

export const graphcms = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_API_URL
);

const QUERY = gql`
  {
    posts {
      id
      title
      datePublishesd
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        url
      }
    }
  }
`;

export const getPosts = async () => {
  const { posts } = await graphcms.request(QUERY);
  return posts;
};
