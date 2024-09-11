/**
 * Initializes collapsible functionality for sections.
 * Each section toggles its content visibility when its header is clicked.
 */
function initializeCollapsibles() {
  const collapsibles = document.querySelectorAll('.collapsible-section');

  collapsibles.forEach((collapsible) => {
    const header = collapsible.querySelector('.section-header');
    const content = collapsible.querySelector('.content');

    /**
     * Toggles the visibility of the content of a collapsible section.
     */
    function toggleCollapsibleContent() {
      collapsible.classList.toggle('active');

      if (collapsible.classList.contains('active')) {
        content.style.maxHeight = '100%';
      } else {
        content.style.maxHeight = '0';
      }
    }

    header.addEventListener('click', toggleCollapsibleContent);
  });
}

// Initialize the collapsible functionality.
initializeCollapsibles(); 