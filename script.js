
const filterButtons = document.querySelectorAll(".filter-buttons button");
const cards = document.querySelectorAll(".card");

filterButtons.forEach(button => {
  button.addEventListener("click", e => {
    filterCards(e.currentTarget);
  });
});

function filterCards(button) {
  const tag = button.dataset.tag;
  console.log("filterCards called with tag:", tag);

  filterButtons.forEach(btn => btn.classList.toggle("active", btn === button));

  // Filter cards
  cards.forEach(card => {
    let cardTags = card.dataset.tags.split(" ");
      
    card.classList.toggle("hidden", tag !== "all" && !cardTags.includes(tag));
  });
}