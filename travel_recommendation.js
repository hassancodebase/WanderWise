let recommendationData = null;

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const results = document.getElementById("results");
const resultMessage = document.getElementById("resultMessage");
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

fetch("travel_recommendation_api.json")
  .then((response) => {
    if (!response.ok)
      throw new Error(
        `Could not load recommendation data (${response.status})`,
      );
    return response.json();
  })
  .then((data) => {
    recommendationData = data;
    console.log("Travel recommendation data:", data);
  })
  .catch((error) => {
    console.error(error);
    resultMessage.textContent =
      "Recommendation data could not be loaded. Please run the site through a local server or GitHub Pages.";
  });

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchRecommendations(searchInput.value);
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  results.innerHTML = "";
  resultMessage.innerHTML =
    "Search for <strong>beach</strong>, <strong>temple</strong>, or <strong>country</strong>.";
});

function normalizeKeyword(keyword) {
  return keyword.trim().toLowerCase().replace(/s$/, "");
}

function searchRecommendations(keyword) {
  if (!recommendationData) {
    resultMessage.textContent =
      "Please wait for the travel data to finish loading.";
    return;
  }

  const normalized = normalizeKeyword(keyword);
  let items = [];
  let category = "";

  if (normalized === "beach") {
    items = recommendationData.beaches;
    category = "Beaches";
  } else if (normalized === "temple") {
    items = recommendationData.temples;
    category = "Temples";
  } else if (normalized === "country") {
    items = recommendationData.countries.flatMap((country) =>
      country.cities.map((city) => ({ ...city, country: country.name })),
    );
    category = "Countries";
  }

  if (!items.length) {
    results.innerHTML = "";
    resultMessage.textContent = 'Try "beach", "temple", or "country".';
    return;
  }

  renderRecommendations(items, category);
}

function renderRecommendations(items, category) {
  results.innerHTML = items
    .map(
      (item) => `
    <article class="card">
      <img src="${item.imageUrl}" alt="${escapeHtml(item.name)}" loading="lazy">
      <div class="card-body">
        <div class="tag">${category.toUpperCase()}</div>
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.description)}</p>
      </div>
    </article>
  `,
    )
    .join("");

  resultMessage.textContent = `${items.length} recommendations found in ${category}.`;
  document
    .getElementById("recommendations")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[char],
  );
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  contactStatus.textContent = "Thanks! Your message has been received.";
  contactForm.reset();
});
