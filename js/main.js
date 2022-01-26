import * as lib from "./library.js";

// Listen to "message" type events.
window.addEventListener("message", handlePostMessage, false);

let webclientOrigin;
let lastSelectedEntryOsid;
let currentSelectedOsids = [];
let currentSelectedObjects = [];
let dashletName = "Dashlet";

/**
 * A function responsible for processing all incoming "messages" from the enaio® webclient.
 * @param event the object passed from the other Window i.e. enaio® webclient.
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#the_dispatched_event
 */
function handlePostMessage(event) {
  webclientOrigin = event.origin;

  /* Ensure "messages" come from a trusted source i.e. your own enaio® hosted domain.
     Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#security_concerns

     "srcOrigin" is the domain URL where enaio® webclient is served. Example: https://enaio.company-name.de
      Please note, in enaio desktop client, "srcOrigin" is represented as "file://" string.

     Uncomment the below code and replace "srcOrigin" variable with your own enaio® webclient domain.
      
     // const safeOrigin = ["file://", "https://your-enaio-domain"].includes(webclientOrigin);
     // if (!safeOrigin) {
     //   console.log(`webclientOrigin ${webclientOrigin} is different from srcOrigin ${srcOrigin}`);
     //   return false;
     // }
  */

  // "handleWebclientMessage" is a handler function which further processes all incoming "messages" from enaio® webclient (see implimentation details in the library.js file).
  // Extract the "type" and "data" properties for further processing.
  // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  const { type, data } = lib.handleWebclientMessage(event.data);

  if (type === "onInit") {
    // Do initialization work here.
    initDashlet(data);
    console.log(`onInit event data:`, data);
  } else if (type === "onUpdate") {
    // React to osid selection changes here.
    initDashlet(data);
    console.log(`onUpdate event data:`, data);
  }

  return true;
}

/**
 * Initialize the dashlet by feeding it incoming enaio® webclient data. The method has no return value.
 * @param data an object which contains enaio® webclient properties that the dashlet can use to enrich itself.
 */
function initDashlet(data) {
  dashletName =
    data.activeCustomDashlet[
      "title_" + data.sessionInfo.language.toUpperCase()
    ] || "Dashlet";
  lastSelectedEntryOsid = data.lastSelectedEntry.osid;
  currentSelectedOsids = data.selectedEntries.map((dmsInfo) => dmsInfo.osid);
  currentSelectedObjects = data.selectedEntries.map((dmsInfo) => ({
    objectId: dmsInfo.osid,
    objectTypeId: dmsInfo.objectTypeId,
  }));
  // Uncomment the below code to see an array of the hitlist's currently selected osid(s).
  // console.log(`Currently selected osids`, currentSelectedOSIDs);
}

/**
 * Opens the location in the current browser tab (or a location selection in the case of several possible locations) for the DMS object transferred as a parameter.
 * @param inNewTab boolean - indicates whether or not the hit list should be opened in a new tab.
 * @param objectId string - the osId of the DMS object.
 * @return The method has no return value. In the event of an error, an error is triggered. This can be caught with a try-catch-block or error handler for the method.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/openLocation
 */
async function openLocation(inNewTab) {
  const objectId = lastSelectedEntryOsid;

  const payload = ["openLocation", [inNewTab, objectId]];

  try {
    // "sendWebclientMessage" is a handler function which is responsible for posting "messages" to the enaio® webclient (see implimentation details in the library.js file).
    await lib.sendWebclientMessage(payload, webclientOrigin);
  } catch (error) {
    console.log(`dashlet says: error caught in openLocation`, error);
  }
}

/**
 * Opens the indexdata mask for the currently selected osid.
 * @param inNewTab boolean - indicates whether or not the indexdata mask should be opened in a new tab. Default is (false).
 * @param mode string - should the index data view be opened in read-only mode (view) or in edit mode (edit). Default is (edit) mode.
 * @param objectId string - the osId of the DMS object.
 * @param objectTypeId string (optional) - the objectTypeId of the DMS object. This increases the performance when opening the index data view.
 * @returns Boolean true if the objectId and objectTypeId are valid and the opening was successful. Otherwise false.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/openIndexData
 */
async function openIndexData(formData) {
  const objectId = lastSelectedEntryOsid;
  const params = formatFormData(formData);

  const payload = ["openIndexData", [params.inNewTab, params.mode, objectId]];

  try {
    // "sendWebclientMessage" is a handler function which is responsible for posting "messages" to the enaio® webclient (see implimentation details in the library.js file).
    await lib.sendWebclientMessage(payload, webclientOrigin);
  } catch (error) {
    console.log(`dashlet says: error caught in openIndexData`, error);
  }
}

/**
 * Query the currently selected objects.
 * Depending on whether you call getSelectedObjects or the enaio® RichClient compatibility method,
 * you will get a different result. In the former, a JavaScript array with objects consisting of objectId and
 * objectTypeId of the selected DMS objects. With the compatibility method, a character sect that is separated
 * by a semicolon and returns a tuple from objectId and objectTypeId.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/getSelectedObjects
 */
async function getSelectedObjects() {
  const payload = ["getSelectedObjects", []];

  try {
    // "sendWebclientMessage" is a handler function which is responsible for posting "messages" to the enaio® webclient (see implimentation details in the library.js file).
    await lib.sendWebclientMessage(payload, webclientOrigin, true);
  } catch (error) {
    console.log(`dashlet says: error caught in getSelectedObjects`, error);
  }
}

/**
 * Update/refresh one or more objects in an open hit list.
 * @param string[] osIds of the DMS objects.
 * @return The method has no return value. In the event of an error, an error is triggered. This can be caught with a try-catch-block or error handler for the method.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/refreshHitListObjects
 */
async function refreshHitListObjects() {
  const ids = currentSelectedOsids;

  const payload = ["refreshHitListObjects", [ids]];

  try {
    // "sendWebclientMessage" is a handler function which is responsible for posting "messages" to the enaio® webclient (see implimentation details in the library.js file).
    await lib.sendWebclientMessage(payload, webclientOrigin);
  } catch (error) {
    console.log(`dashlet says: error caught in refreshHitListObjects`, error);
  }
}

/**
 * Display a mixed hit list with freely selected objects.
 * @param inNewTab boolean (optional) - indicates whether or not the hit list should be opened in a new tab
 * @param title string (optional) - title of the hit list
 * @param description string (optional) - additional description (subtitle) of the hit list
 * @param executeSingleHitAction boolean (optional) - specifies whether to execute the default action when there is a single hit
 * @param  objects Array<{objectId: string, objectTypeId: string} - selected objects
 * @return The method has no return value. In the event of an error, an error is triggered. This can be caught with a try-catch-block or error handler for the method.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/openHitListByIds
 */
async function openHitListByIds(formData) {
  const formattedFormData = formatFormData(formData);
  const objects = currentSelectedObjects;

  const params = {
    ...formattedFormData,
    objects,
  };

  const payload = ["openHitListByIds", params];

  try {
    // "sendWebclientMessage" is a handler function which is responsible for posting "messages" to the enaio® webclient (see implimentation details in the library.js file).
    await lib.sendWebclientMessage(payload, webclientOrigin);
  } catch (error) {
    console.log(`dashlet says: error caught in openHitListByIds`, error);
  }
}

function formatFormData(formData) {
  return Object.assign({}, ...formData);
}

// Export functions to be used in other JavaScript files.
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
export {
  openLocation,
  openIndexData,
  getSelectedObjects,
  refreshHitListObjects,
  openHitListByIds,
};
