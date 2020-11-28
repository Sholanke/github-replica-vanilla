//decoded token
const GITHUB_ENCODED_TOKEN =
  "YmVmZWZmM2Q3YjZlZWEwYjgxODQ2ZjMzNjdjMGExYzdhNGY0NWIzOQ==";

const GITHUB_DECODED_TOKEN = atob(GITHUB_ENCODED_TOKEN);

const GITHUB_REPO_QUERY_STRING = `
{
  viewer {
    login
    avatarUrl
    name
    bio
    status {
      emojiHTML
      message
      __typename
    }
    repositories(last: 20, isFork: false) {
      nodes {
        name
        description
        url
        stargazerCount
        updatedAt
        forkCount
        isPrivate
        languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
          nodes {
            color
            name
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
`;
