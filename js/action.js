import * as action from "./main.js";

/**
 * Clears the inner HTML content of a container element by its ID.
 *
 * @param {string} containerId - The ID of the container to be cleared.
 */
function clearContainer(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = "";
  }
}

/**
 * Clears the value of multiple input fields using their IDs.
 *
 * @param {...string} inputIds - IDs of the input fields to be cleared.
 */
function clearInputFields(...inputIds) {
  inputIds.forEach((inputId) => {
    const input = document.getElementById(inputId);
    if (input) {
      input.value = "";
    }
  });
}

/**
 * Fetches a field value by its internal name.
 */
async function fetchFieldValueByInternal() {
  const internalFieldName = document.getElementById("internalFieldName").value;
  await action.getFieldValueByInternal(internalFieldName);
}

/**
 * Fetches a field value by its name for Workflow.
 */
async function fetchWfFieldValueByInternal() {
  const internalFieldName = document.getElementById("wfVariableName").value;
  await action.getWorkflowVariableByName(internalFieldName);
}

/**
 * Fetches the environment data.
 */
async function fetchEnvironment() {
  await action.getEnvironment();
}

/**
 * Sets a field value using its internal name.
 */
async function setFieldValueByInternal() {
  const internalFieldName = document.getElementById("internalSetFieldName").value;
  const internalFieldValue = document.getElementById("internalFieldValue").value;
  await action.setFieldValueByInternal(internalFieldName, internalFieldValue);
}

/**
 * Sets value of a workflow variable by its name.
 */
async function setWorkflowVariableByName() {
  const variableName = document.getElementById("wfSetVariableName").value;
  const variableValue = document.getElementById("wfSetVariableValue").value;
  await action.setWorkflowVariableByName(variableName, variableValue);
}

/**
 * Sets the caption of the dialog.
 *
 * This function retrieves the caption from an HTML element with the ID "captionName" and sets it as the dialog's caption.
 */
async function setDialogCaption() {
  const newCaption = document.getElementById("captionName").value;
  await action.setDialogCaption(newCaption);
}

/**
 * Closes the modal dialog with a specific value.
 *
 * @param {number} value - The value to send as a parameter when closing the dialog.
 * @throws {Error} If an error occurs while closing the dialog.
 */
function closeModalDialog(value) {
  try {
    action.closeModalDialog(value);
  } catch (error) {
    console.error("Error closing dialog:", error);
    throw error;
  }
}

// Event listeners
document
  .getElementById("getFieldValueByInternal")
  .addEventListener("click", fetchFieldValueByInternal);

document
  .getElementById("getWorkflowVariableByName")
  .addEventListener("click", fetchWfFieldValueByInternal);

document
  .getElementById("getEnvironment")
  .addEventListener("click", fetchEnvironment);

document
  .getElementById("setFieldValueByInternal")
  .addEventListener("click", setFieldValueByInternal);

document
  .getElementById("setWorkflowVariableByName")
  .addEventListener("click", setWorkflowVariableByName);

document
  .getElementById("setDialogCaption")
  .addEventListener("click", setDialogCaption);

// Event listeners for closeModalDialog
document
  .getElementById("closeModalSave")
  .addEventListener("click", function () {
    closeModalDialog(1); // Here we pass the parameter '1'
  });

document
  .getElementById("closeModalCancel")
  .addEventListener("click", function () {
    closeModalDialog(2); // Here we pass the parameter '2' 
  });

// A generic close button for the modal dialog for convenience
document
  .getElementById("closeModalGeneral")
  .addEventListener("click", function () {
    closeModalDialog(); // Here we pass the no parameter and the dialog will be closed with default value '1'
  });




/**
 * This function attempts to execute the onCanCancelMethod from the action object with a given value.
 *
 * @param {any} value - The value to be passed to the onCanCancelMethod of the action object.
 * @throws {Error} If an error occurs during the execution of the onCanCancelMethod, it logs the error and rethrows it.
 */
function onCanCancelMethod(value) {
  try {
    action.onCanCancelMethod(value);
  } catch (error) {
    console.error("Error onCanCancel method:", error);
    throw error;
  }
}


// Event listeners for onCanCancel
document
  .getElementById("onCanCancelEnable")
  .addEventListener("click", function () {
    onCanCancelMethod(1); // Here we pass the parameter '1'
  });

document
  .getElementById("onCanCancelDisable")
  .addEventListener("click", function () {
    onCanCancelMethod(2); // Here we pass the parameter '2' 
  });


/**
 * Clears content and input values when a clear button is clicked.
 */
function setupClearButtonActions() {
  const clearButtons = document.querySelectorAll(".clear-button");
  clearButtons.forEach((button) => {
    button.addEventListener("click", () => {
      clearContainer("getFieldValueByInternal_response");
      clearContainer("getWorkflowVariableByName_response");
      clearContainer("setWorkflowVariableByName_response");
      clearContainer("setFieldValueByInternal_response");
      clearContainer("getEnvironment_response");
      clearInputFields("internalFieldName", "internalFieldValue", "internalSetFieldName", "captionName", "wfVariableName", "wfSetVariableName", "wfSetVariableValue");
    });
  });
}

setupClearButtonActions();
