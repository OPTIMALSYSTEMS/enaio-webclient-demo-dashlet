import * as lib from "./library/library.js";

let lastSelectedEntryOsid;
let currentSelectedOsids = [];
let currentSelectedObjects = [];
let dashletName = "Dashlet";

/**
 * Initialize the dashlet by feeding it incoming enaio® webclient data. The method has no return value.
 * @param data an object which contains enaio® webclient properties that the dashlet can use to enrich itself.
 */
function initDashlet(data) {
  dashletName = data.activeCustomDashlet["title_" + data.sessionInfo.language.toUpperCase()] || "Dashlet";
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
 * Register onInit and onUpdate events callbacks.
 * OnInit event runs if you open the dashlet.
 * OnUpdate event runs if you change your object selection.
 *
 * It is recommended but optional to use origin for source and target messages.
 * You can read more information about origin security concerns here:
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#security_concerns
 */
lib.registerOnInitCallback(initDashlet, "*");
lib.registerOnUpdateCallback(initDashlet, "*");

async function openLocation(inNewTab) {
  const objectId = lastSelectedEntryOsid;
  await lib.openLocation(inNewTab, objectId);
}

async function openIndexData(formData) {
  const objectId = lastSelectedEntryOsid;
  const params = formatFormData(formData);
  return await lib.openIndexData(params.inNewTab, params.mode, objectId);
}

async function getSelectedObjects() {
  const retVal = await lib.getSelectedObjects();
  let str = "";

  for (const temp of retVal) {
    str += `\n${temp.objectId}, ${temp.objectTypeId}`;
  }

  alert(str);
}

async function refreshHitListObjects() {
  const ids = currentSelectedOsids;
  await lib.refreshHitListObjects(ids);
}

async function openHitListByIds(formData) {
  const params = formatFormData(formData);
  const objects = currentSelectedObjects;
	
  await lib.openHitListByIds(objects,params.inNewTab, params.title, params.description, params.executeSingleHitAction);
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
