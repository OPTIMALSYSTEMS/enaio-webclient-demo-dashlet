import * as action from "./main.js";

// Currently available actions that can be executed in the enaio® webclient.

document
  .getElementById("openLocation")
  .addEventListener("click", processForm, false);

document
  .getElementById("openIndexData")
  .addEventListener("click", processForm, false);

document
  .getElementById("getSelectedObjects")
  .addEventListener("click", action.getSelectedObjects, false);

document
  .getElementById("refreshHitListObjects")
  .addEventListener("click", action.refreshHitListObjects, false);

document
  .getElementById("openHitListByIds")
  .addEventListener("click", processForm, false);

function processForm(clicked) {
  if (clicked.target.id === "openHitListByIds") {
    const openHitListByIdsForm = document.getElementById(
      "openHitListByIdsForm"
    );

    clicked.preventDefault();
    action.openHitListByIds.bind(this, processFormData(openHitListByIdsForm))();
    return;
  }

  if (clicked.target.id === "openIndexData") {
    const openIndexDataFormForm = document.getElementById(
      "openIndexDataFormForm"
    );

    clicked.preventDefault();
    action.openIndexData.bind(this, processFormData(openIndexDataFormForm))();
    return;
  }

  if (clicked.target.id === "openLocation") {
    const checkbox = document.getElementById("openLocationNewTab");

    clicked.preventDefault();
    action.openLocation.bind(this, checkbox.checked)();
    return;
  }
}

function processFormData(form) {
  const formData = [];
  const data = new FormData(form);

  for (const entry of data) {
    const alreadyExists = formData.some((obj) => obj.inNewTab === false);

    if (form.id === "openHitListByIdsForm") {
      data.has("executeSingleHitAction") === false && !alreadyExists
        ? formData.push({ executeSingleHitAction: false })
        : null;
    }

    data.has("inNewTab") === false && !alreadyExists
      ? formData.push({ inNewTab: false })
      : null;

    formData.push({
      [entry[0]]:
        (entry[0] === "inNewTab" || entry[0] === "executeSingleHitAction") &&
        entry[1] === "on"
          ? true
          : entry[1],
    });
  }

  return formData;
}
