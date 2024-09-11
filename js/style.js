/**
 * A user-interface function for controlling the dashlet content area. The method has no return value.
 * @param event a pointer event object representing the HTML element that the user clicked.
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events
 */
function collapse(event) {
  // "content" refers to the area of the dashlet where information about events/methods is displayed.
  let content;

  if (event.target.localName === "legend") {
    content = event.target.nextElementSibling;
    event.target.classList.toggle("active");
  } else {
    content = event.target.parentNode.nextElementSibling;
    event.target.parentNode.classList.toggle("active");
  }

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = "unset";
  }
}
