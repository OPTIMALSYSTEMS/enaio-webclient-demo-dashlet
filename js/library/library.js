import * as libWebClient from "./libraryWebClient.js";
import * as libRichClient from "./libraryRichClient.js";

/**
 * Registers an onInit callback which is executed once the dashlet is initialized.
 * 
 * @param {Function} onInitCallback The callback
 * @param {string} trustedOrigin origin which is allowed to send and receive messages. Should be the webclient uri.
 * Use "*" to allow every target origin. Example: https://enaio.company-name.de.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */
function registerOnInitCallback(onInitCallback, trustedOrigin = "*") {
  if (window.osClient) {
    libRichClient.registerOnInitCallback(onInitCallback);
  } else {
    libWebClient.registerOnInitCallback(onInitCallback, trustedOrigin);
  }
}

/**
 * Registers an onUpdate callback which is executed if something changes in the client.
 * 
 * @param {Function} onUpdateCallback The callback
 * @param {string} trustedOrigin origin which is allowed to send and receive messages. Should be the webclient uri.
 * Use "*" to allow every target origin. Example: https://enaio.company-name.de.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */
function registerOnUpdateCallback(onUpdateCallback, trustedOrigin = "*") {
  if (window.osClient) {
    libRichClient.registerOnUpdateCallback(onUpdateCallback);
  } else {
    libWebClient.registerOnUpdateCallback(onUpdateCallback, trustedOrigin);
  }
}

/**
 * Opens the indexdata mask for the currently selected osid.
 * 
 * @param {boolean} inNewTab indicates whether or not the indexdata mask should be opened in a new tab. Default is (false).
 * @param {string} mode should the index data view be opened in read-only mode (view) or in edit mode (edit). Default is (edit) mode.
 * @param {string} objectId the osId of the DMS object.
 * @param {string} objectTypeId the objectTypeId of the DMS object. This increases the performance when opening the index data view.
 * @returns {boolean} true if the objectId and objectTypeId are valid and the opening was successful. Otherwise false.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/openIndexData
 */
async function openIndexData(inNewTab, mode, objectId, objectTypeId = undefined) {
  return await sendClientMessage(["openIndexData", [inNewTab, mode, objectId, objectTypeId]]);
}

/**
 * Opens the location in the current browser tab (or a location selection in the case of several possible locations) for the DMS object transferred as a parameter.
 * 
 * @param {boolean} inNewTab indicates whether or not the hit list should be opened in a new tab.
 * @param {string} objectId the osId of the DMS object.
 * @param {string} [objectTypeId] the objectTypeId of the DMS object. This increases the performance when opening the location.
 * @param {string} [parentId] the osId of the parent DMS object to open a specific location if the object has multiple locations.
 * @param {string} [parentTypeId] the objectTypeId of the parent DMS object to open a specific location if the object has multiple locations.
 * @returns {Promise<void>} The method has no return value. In the event of an error, an error is triggered. This can be caught with a try-catch-block or error handler for the method.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/openLocation
 */
async function openLocation(inNewTab, objectId, objectTypeId = undefined, parentId = undefined, parentTypeId = undefined) {
  await sendClientMessage(["openLocation", [inNewTab, objectId, objectTypeId, parentId, parentTypeId]]);
}

/**
 * Query the currently selected objects.
 * Depending on whether you call getSelectedObjects or the enaio® RichClient compatibility method,
 * you will get a different result. In the former, a JavaScript array with objects consisting of objectId and
 * objectTypeId of the selected DMS objects. With the compatibility method, a character sect that is separated
 * by a semicolon and returns a tuple from objectId and objectTypeId.
 * 
 * @returns {Promise<string>} Semicolon separated string of tuples with objectId and objectTypeId.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/getSelectedObjects
 */
async function getSelectedObjects() {
  return sendClientMessage(["getSelectedObjects", []]);
}

/**
 * Update/refresh one or more objects in an open hit list.
 * 
 * @param {string[]} osIds of the DMS objects.
 * @return The method has no return value. In the event of an error, an error is triggered. This can be caught with a try-catch-block or error handler for the method.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/refreshHitListObjects
 */
async function refreshHitListObjects(osIds) {
  await sendClientMessage(["refreshHitListObjects", [osIds]]);
}

/**
 * Display a mixed hit list with freely selected objects.
 * 
 * @param {Array<{objectId: string, objectTypeId: string}>} objects selected objects
 * @param {boolean} [inNewTab] indicates whether or not the hit list should be opened in a new tab
 * @param {string} [title] title of the hit list
 * @param {string} [subTitle] subtitle of the hit list
 * @param {boolean} [executeSingleHitAction] specifies whether to execute the default action when there is a single hit
 * @return The method has no return value. In the event of an error, an error is triggered. This can be caught with a try-catch-block or error handler for the method.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/openHitListByIds
 */
async function openHitListByIds(objects, inNewTab = false, title = "", subTitle = "", executeSingleHitAction = false) {
  await sendClientMessage(["openHitListByIds", { 
    objects,
    inNewTab,
    title,
    description: subTitle,
    executeSingleHitAction
  }]);
}

/**
 * Send a command either to the web client or rich client and return the response.
 * 
 * @param {Object[]} payload The input parameter for the command
 * @returns 
 */
async function sendClientMessage(payload) {
  try {
    if (window.osClient) {
      return libRichClient.sendToRichClient(payload);
    } else {
      return libWebClient.sendWebclientMessage(payload);
    }
  } catch (error) {
    console.log(`dashlet says: error caught in ${payload[0]}`, error);
  }
}

// Export functions to be used in other JavaScript files.
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
export { 
  // Event Callbacks
  registerOnInitCallback,
  registerOnUpdateCallback,

  // Methods
  openIndexData, 
  openLocation,
  getSelectedObjects,
  refreshHitListObjects,
  openHitListByIds
};