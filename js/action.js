import * as action from "./main.js";

// Currently available actions that can be executed in the enaio® webclient.

document
  .getElementById("openLocation")
  .addEventListener("click", action.openLocation, false);

document
  .getElementById("openLocationNewTab")
  .addEventListener("click", action.openLocationNewTab, false);

document
  .getElementById("openIndexData")
  .addEventListener("click", action.openIndexData, false);

document
  .getElementById("getSelectedObjects")
  .addEventListener("click", action.getSelectedObjects, false);
