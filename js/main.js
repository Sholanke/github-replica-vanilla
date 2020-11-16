const gitHubDetailsNode = gitHubDOM.getAllNode(".github_details");

//onblur of minimodals
Array.from(gitHubDetailsNode).forEach((detail) => {
  detail.addEventListener("blur", () => {
    detail.removeAttribute("open");
  });
});

fetch("https://api.github.com/graphql", {
  method: "POST",
  mode: "cors",
  cache: "no-cache",
  referrerPolicy: "no-referrer",
  headers: {
    "Content-Type": "application/json",
    authorization: `token ${token} `,
  },
  body: JSON.stringify({
    query: `
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
  `,
  }),
})
  .then((res) => {
    return res.json();
  })
  .then(({ data }) => {
    const { viewer } = data;
    mapUserData(viewer);
    [...viewer.repositories.nodes].reverse().forEach((repo) => {
      mapRepoData(repo);
    });
  });

//scroll animation on repo header
const headerUserNode = gitHubDOM.getNode(".repo_app_header-user");
window.addEventListener("scroll", (e) => {
  if (window.scrollY >= 370) {
    headerUserNode.classList.remove("hide");
  } else {
    headerUserNode.classList.add("hide");
  }
});
