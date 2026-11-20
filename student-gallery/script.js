"use strict";

const grid = document.querySelector("#student-grid");
const status = document.querySelector("#focus-status");
const cards = [...document.querySelectorAll(".student-card")];

function clearFocus() {
  grid.classList.remove("has-focus");
  cards.forEach((card) => {
    card.classList.remove("is-focused", "is-blurred");
    card.setAttribute("aria-pressed", "false");
  });
  status.textContent = "";
}

function toggleFocus(card) {
  // Keep one profile in focus, or restore the grid when it is selected again.
  if (card.classList.contains("is-focused")) {
    clearFocus();
    return;
  }

  grid.classList.add("has-focus");
  cards.forEach((profile) => {
    const isSelected = profile === card;
    profile.classList.toggle("is-focused", isSelected);
    profile.classList.toggle("is-blurred", !isSelected);
    profile.setAttribute("aria-pressed", String(isSelected));
  });

  const name = card.querySelector("h3").textContent;
  status.textContent = `${name} is in focus. Select another profile or click outside the cards to reset.`;
}

grid.addEventListener("click", (event) => {
  const card = event.target.closest(".student-card");
  if (card) toggleFocus(card);
});

grid.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches(".student-card")) {
    event.preventDefault();
    toggleFocus(event.target);
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".student-card") && grid.classList.contains("has-focus")) {
    clearFocus();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && grid.classList.contains("has-focus")) {
    clearFocus();
  }
});

document.querySelectorAll(".portrait img").forEach((image) => {
  image.addEventListener("error", () => {
    // Keep the profile legible if a replaceable remote portrait is unavailable.
    image.closest(".portrait").classList.add("portrait-image-failed");
  }, { once: true });
});
