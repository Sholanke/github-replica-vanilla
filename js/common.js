const gitHubDOM = {
  getNode: (elementSelector) => document.querySelector(elementSelector),
  getAllNode: (elementSelector) => document.querySelectorAll(elementSelector),
};

function mapUserData({ avatarUrl, name, login, bio, status }) {
  let userNodeContainer = gitHubDOM.getAllNode(".js_repo_grid_user-profile");
  userNodeContainer = Array.from(userNodeContainer);

  userNodeContainer.forEach(
    (e) =>
      (e.innerHTML += `<div class="dp_rapper_container">
  <div class="dp_container">
    <img
      src="${avatarUrl}"
      alt=""
      class="dp_rapper"
      srcset=""
    /><span class="app_user_status"
      ><span class="icon"
        >${status.emojiHTML}</span
      ><a href="/#" class="text"
        >${status.message}</a
      ></span
    >
  </div>
  <div class="text_holder">
    <h2 class="name">Olamide</h2>
    <p class="username">Sholanke</p>
  </div>
</div>
<span class="app_user_status mbl open"
  ><span class="icon"
    >${status.emojiHTML}</span
  ><a href="/#" class="text"
    >${status.message}</a
  ></span
>
<div class="data">
  <p class="bio">
    ${bio}
  </p>
</div>`)
  );
}

function mapRepoData({
  name,
  isPrivate,
  updatedAt,
  stargazerCount,
  forkCount,
  description,
  url,
  languages: {
    nodes: [language],
  },
}) {
  let repoContainerNode = gitHubDOM.getNode(".js_repos_container");

  repoContainerNode.innerHTML += `
  <div class="repository_card flex">
    <div>
      <div class="_top">
        <div class="flex">
          <a
            href="${url}"
            class="repo_name flex hv-undeline"
            data-is-private="false"
            target="blank"
            >${name}</a
          >
        </div>
        ${
          description
            ? `
          <p class="repo_desc">${description}</p>
        `
            : ""
        }
      </div>
      <div class="repo_footer flex">

         ${
           language
             ? `
             <div class="language flex repo_footer-elem">
                <span
                  class="co"
                  style="background-color: ${language.color}"
                ></span
                >${language.name}
            </div>
            `
             : ""
         }
        


        ${ActionButton({
          count: stargazerCount,
          svg: `<svg
        xmlns="http://www.w3.org/2000/svg"
        class="octicon octicon-star mr-1"
        viewBox="0 0 16 16"
        version="1.1"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
        ></path>
      </svg>`,
        })}


        ${ActionButton({
          count: forkCount,
          svg: `<svg
          xmlns="http://www.w3.org/2000/svg"
          aria-label="fork"
          class="octicon octicon-repo-forked"
          viewBox="0 0 16 16"
          version="1.1"
          role="img"
        >
          <path
            fill-rule="evenodd"
            d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
          ></path>
        </svg>`,
        })}

        


        <div class="repo_updated_at repo_footer-elem">
          Updated on ${formatDate(updatedAt)}
        </div>
      </div>
    </div>
    <div class="_right">
      <button class="repo_star_button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="octicon octicon-star mr-1"
          viewBox="0 0 16 16"
          version="1.1"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
          ></path></svg
        >Star
      </button>
    </div>
  </div>
  
  `;
}

function formatDate(date_str) {
  const d = new Date(date_str);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

  return `${da} ${mo} ${ye}`;
}

function ActionButton({ count, svg }) {
  return count > 0
    ? `
    <button class="action_button">
    ${svg}
    ${count}
  </button>
  `
    : "";
}
