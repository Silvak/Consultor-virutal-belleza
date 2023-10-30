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

const POST_QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
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

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

/**
 * The function `getPosts` is an asynchronous function that retrieves posts from a GraphQL API using
 * the `graphcms.request` method and returns the posts.
 * @returns The function `getPosts` is returning the `posts` data that is fetched from the `graphcms`
 * API.
 */
export const getPosts = async () => {
  const { posts } = await graphcms.request(QUERY);
  return posts;
};

/**
 * The function `getPost` is an asynchronous function that retrieves a post based on its slug using a
 * GraphQL query.
 * @param slug - The `slug` parameter is a unique identifier for a specific post. It is typically used
 * in content management systems to generate SEO-friendly URLs for individual posts or pages. In this
 * code snippet, the `slug` parameter is used to query the GraphCMS API and retrieve the post with the
 * matching slug.
 * @returns The `getPost` function is returning the `post` object.
 */
export const getPost = async (slug) => {
  const { post } = await graphcms.request(POST_QUERY, { slug });
  return post;
};

/**
 * The function `getSlugList` retrieves a list of slugs from a GraphQL API and returns an object with
 * paths and fallback properties.
 * @returns The function `getSlugList` is returning an object with two properties: `paths` and
 * `fallback`.
 */
export const getSlugList = async () => {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};
