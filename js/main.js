// private scope

const gitHubDetailsNode = gitHubDOM.getAllNode(".github_details");

function fetchAndMapRepos() {
  return new Promise((loadedFn) => {
    fetch("https://api.github.com/graphql", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
        authorization: `token ${GITHUB_DECODED_TOKEN} `,
      },
      body: JSON.stringify({
        query: GITHUB_REPO_QUERY_STRING,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(({ data }) => {
        loadedFn(data);

        const { viewer } = data;

        mapUserData(viewer);
        //show latest repos first
        [...viewer.repositories.nodes].reverse().forEach((repo) => {
          mapRepoData(repo);
        });
      });
  });
}

function animateRepoHeader() {
  const headerUserNode = gitHubDOM.getNode(".repo_app_header-user");

  window.addEventListener("scroll", (e) => {
    if (window.scrollY >= 370) {
      headerUserNode.classList.remove("hide");
    } else {
      headerUserNode.classList.add("hide");
    }
  });
}

function initMiniModals() {
  Array.from(gitHubDetailsNode).forEach((currentTarget) => {
    const detailsNode = currentTarget.querySelector("details");

    currentTarget.addEventListener("blur", () => {
      setTimeout(() => {
        detailsNode.open = false;
        detailsNode.style.pointerEvents = "none";
      }, 200);
    });

    currentTarget.addEventListener("focus", () => {
      detailsNode.open = true;
      detailsNode.style.pointerEvents = "unset";
    });
  });
}

function initHamBurgerMenu() {
  const hamBurgerButton = gitHubDOM.getNode(".js_hamburger_btn");
  const mobileLinks = gitHubDOM.getNode(".mbl_links_container");

  hamBurgerButton.addEventListener("click", () => {
    const mobileLinksClassList = mobileLinks.classList;
    const mobileLinksClassListArray = Array.from(mobileLinksClassList);

    if (mobileLinksClassListArray.includes("is_open")) {
      mobileLinksClassList.remove("is_open");
    } else {
      mobileLinksClassList.add("is_open");
    }
  });
}

const fetchAndMapReposAction = async () => {
  const response = await fetchAndMapRepos();
  const hasLoadedRepos = "viewer" in response;
  const repoContainerNode = gitHubDOM.getNode(".repo_container");
  const pageLoaderNode = gitHubDOM.getNode(".app_page_loader");

  pageLoaderNode.classList.add("hide");
  repoContainerNode.classList.remove("hide");

  animateRepoHeader();
};

fetchAndMapReposAction();
initMiniModals();
initHamBurgerMenu();
