// Importing all methods from the library module.
// This library module likely contains API functions to interact with enaio® web-client.
// Below is only for demo purposes. Github Pages only supports static site hosting.
// In a production environment, import from the npm library as explained here https://www.npmjs.com/package/@enaio-client/communication-library
import * as lib from './module.mjs';

// =======================
// MAIN FUNCTIONS
//
// These functions are the primary means to access the enaio® API. 
// They handle fetching, updating, and setting data in the enaio® web-client.
// =======================

/**
 * Asynchronously retrieves environment data from the enaio® web-client.
 * Once retrieved, this function updates a designated container 
 * on the webpage with the received data.
 * 
 * Expected use: 
 * To fetch and display general environment details from enaio® web-client.
 */
async function getEnvironment() {
  try {
    // Fetching environment data from enaio® web-client.
    const response = await lib.getEnvironment();
    // Display the fetched data on the webpage and in the console.
    displayResponse("getEnvironment", response);
  } catch (error) {
    // Handle any errors that occur during the fetch.
    logError("getEnvironment", error);
  }
}

/**
 * Fetches a specific field's value using its internal name.
 * @param {string} internalFieldName - The unique identifier (internal name) of the index field in enaio® web-client.
 * 
 * Expected use:
 * To fetch specific metadata or field values based on their internal names.
 */
async function getFieldValueByInternal(internalFieldName = "") {
  try {
    // Fetching field value from enaio® web-client based on the provided internal name.
    const response = await lib.getFieldValueByInternal({ internalName: internalFieldName });
    // Display the fetched data on the webpage and in the console.
    displayResponse("getFieldValueByInternal", response);
  } catch (error) {
    // Handle any errors that occur during the fetch.
    logError("getFieldValueByInternal", error);
  }
}

/**
 * Fetches a specific workflow variable's value using its name.
 * @param {string} name - The name of the workflow variable in enaio® web-client.
 * 
 * Expected use:
 * To retrieve values of specific workflow variables based on their names.
 */
async function getWorkflowVariableByName(name = "") {
  try {
    // Fetching field value from enaio® web-client based on the provided name.
    const response = await lib.getWorkflowVariableByName({ name: name });
    // Display the fetched data on the webpage and in the console.
    displayResponse("getWorkflowVariableByName", response);
  } catch (error) {
    // Handle any errors that occur during the fetch.
    logError("getWorkflowVariableByName", error);
  }
}

/**
 * Sets the caption of the modal dialog using the provided value.
 *
 * @param {string} value - The caption to be set for the modal dialog. Defaults to an empty string if no value is provided.
 * @throws {Error} If an error occurs during the process, it logs the error with the function name.
 */
async function setDialogCaption(value = "") {
  try {
    // Fetching field value from enaio® web-client based on the provided internal name.
    await lib.setDialogCaption(value);
    // Display the fetched data on the webpage and in the console.
  } catch (error) {
    // Handle any errors that occur during the fetch.
    logError("setDialogCaption", error);
  }
}

/**
 * Sets (or updates) a field's value using its internal name and a specified value.
 * @param {string} internalFieldName - The unique identifier (internal name) of the index field in enaio® web-client.
 * @param {string} internalFieldValue - The new value to be set for the specified field.
 * 
 * Expected use:
 * To update or set specific metadata or field values in enaio® web-client.
 */
async function setFieldValueByInternal(internalFieldName = "", internalFieldValue = "") {
  try {
    // Updating the field value in enaio® web-client based on the provided internal name and value.
    const response = await lib.setFieldValueByInternal({ internalName: internalFieldName, value: internalFieldValue });
    // Display the update status on the webpage and in the console.
    displayResponse("setFieldValueByInternal", response);
  } catch (error) {
    // Handle any errors that occur during the update.
    logError("setFieldValueByInternal", error);
  }
}

/**
 * Sets (or updates) a workflow variable's value using its name and a specified value.
 * @param {string} variableName - The unique identifier (name) of the workflow variable in enaio® web-client.
 * @param {string} variableValue - The new value to be set for the specified variable.
 * 
 * @throws {Error} If an error occurs during the update, it logs the error with the function name.
 * 
 * Expected use:
 * To update or set specific workflow variables in enaio® web-client.
 */
async function setWorkflowVariableByName(name = "", value = "") {
  try {
    // Updating the variable value in enaio® web-client based on the provided internal name and value.
    const response = await lib.setWorkflowVariableByName({ name, value });
    // Display the update status on the webpage and in the console.
    displayResponse("setWorkflowVariableByName", response);
  } catch (error) {
    // Handle any errors that occur during the update.
    logError("setWorkflowVariableByName", error);
  }
}

/**
 * Sends an event to close the modal dialog with a specific value.
 *
 * @param {string} [value=1] - The value to determine the type of close action.
 *   Defaults to 1 if not provided.
 *
 * @throws {Error} If an error occurs while closing the dialog.
 *
 */
async function closeModalDialog(value = 1) {
  try {
    await lib.closeModalDialog(value);
  } catch (error) {
    logError("closeModalDialog", error);
    throw error;
  }
}

// =======================
// SUPPORT FUNCTIONS
//
// These functions provide supplementary functionality and are not directly related to accessing the enaio® API.
// They help in handling the response, formatting data, and managing errors.
// =======================

/**
 * Logs errors for the associated function in a standardized format.
 * @param {string} functionName - The name of the function where the error occurred.
 * @param {Error} error - The caught error object detailing what went wrong.
 */
function logError(functionName, error) {
  console.error(`Error in ${functionName}:`, error);
}

/**
 * Takes response data, logs it to the console, and displays it in a designated container on the webpage.
 * @param {string} responseName - The name associated with the response, typically the function name.
 * @param {Object} data - The data (usually JSON) to be displayed.
 */
function displayResponse(responseName, data) {
  // Log the response data to the console.
  console.log(`${responseName} response:`, data);

  // Locate the designated container on the webpage to display the data.
  const container = document.getElementById(`${responseName}_response`);
  if (container) {
    // Clear any existing data in the container.
    container.innerHTML = "";
    // Append the formatted JSON data to the container.
    container.appendChild(getFormattedJSON(data));
  }
}

/**
 * Converts raw JSON data into a human-readable format and prepares it for display in an HTML container.
 * @param {Object} jsonData - The raw JSON data to be formatted.
 * @returns {HTMLElement} A preformatted ('pre') HTML element containing the beautified JSON data.
 */
function getFormattedJSON(jsonData) {
  // Create a 'pre' element to display the data in a formatted manner.
  const preElement = document.createElement("pre");
  // Set the content of the 'pre' element to the beautified version of the JSON data.
  preElement.textContent = JSON.stringify(
    jsonData,
    (key, value) => (value === undefined ? "undefined" : value),
    2
  );
  return preElement;
}

/**
 * Handles the initialization event from the enaio® web-client.
 * This function is triggered when the enaio® web-client sends the 'onInit' event.
 * It processes the initial data received from the web-client, typically containing details
 * about the selected entry, and then displays this data using the `displayResponse` function.
 *
 * @param {Object} data - The initialization data sent from the enaio® web-client, usually includes details about the selected entry.
 * 
 */
function onInit(data) {
  displayResponse("onInit", data || {});
}

// Registering the 'onInit' callback function with the enaio® web-client.
// This setup ensures that when the web-client initializes, the 'onInit' function is called
// with the initial data provided by the web-client.
lib.registerOnInitCallback(onInit);


// This value is used to control the behavior of the ESC key event in the iframe.
let onCanCancelValue = 1;

// Register a function to handle the ESC key event.
// Instead of passing a getter, we're directly passing the value itself.
lib.registerOnCanCancelCallback(() => onCanCancelValue);

/**
 * Sets the value for onCanCancel.
 *
 * @param {number} [value=1] - The value to set for onCanCancel.
 */
function onCanCancelMethod(value = 1) {
  onCanCancelValue = value;
}

// =======================
// EXPORTS
//
// These functions are made available for external use. Including them in an HTML file will provide 
// the ability to interact with the enaio® API directly from the webpage.
// =======================

export {
  getEnvironment,
  getFieldValueByInternal,
  setFieldValueByInternal,
  closeModalDialog,
  onCanCancelMethod,
  setDialogCaption,
  getWorkflowVariableByName,
  setWorkflowVariableByName,
};
