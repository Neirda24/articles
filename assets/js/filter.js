document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('post-grid');
  if (!grid) return;

  var searchInput = document.getElementById('filter-search');
  var tagButtons = document.querySelectorAll('.filter-tag');
  var cards = grid.querySelectorAll('.post-card');
  var emptyMessage = document.getElementById('filter-empty');
  var activeTag = 'all';

  function applyFilters() {
    var query = searchInput.value.trim().toLowerCase();
    var visibleCount = 0;

    cards.forEach(function (card) {
      var matchesTag = activeTag === 'all' || (',' + card.dataset.tags + ',').indexOf(',' + activeTag + ',') !== -1;
      var matchesSearch = !query ||
        card.dataset.title.indexOf(query) !== -1 ||
        card.dataset.excerpt.indexOf(query) !== -1 ||
        card.dataset.tags.indexOf(query) !== -1;
      var visible = matchesTag && matchesSearch;
      card.classList.toggle('is-hidden', !visible);
      if (visible) visibleCount++;
    });

    emptyMessage.classList.toggle('is-visible', visibleCount === 0);
  }

  function setActiveTag(tag) {
    activeTag = tag;
    tagButtons.forEach(function (button) {
      button.classList.toggle('is-active', button.dataset.tag === tag);
    });
    applyFilters();
  }

  tagButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      setActiveTag(button.dataset.tag);
    });
  });

  searchInput.addEventListener('input', applyFilters);

  var requestedTag = new URLSearchParams(window.location.search).get('tag');
  if (requestedTag) {
    setActiveTag(requestedTag.toLowerCase());
  } else {
    applyFilters();
  }
});
