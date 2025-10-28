// Below is only for demo purposes. Github Pages only supports static site hosting.
// In a production environment, import from the npm library as explained here https://www.npmjs.com/package/@enaio-client/communication-library
import * as lib from './dist/legacy/communicationLibrary.js';

let currentSelectedObjects = [];
let dashletName = "Dashlet";

/**
 * Initialize the dashlet by feeding it incoming enaio® webclient data. The method has no return value.
 * @param data an object which contains enaio® webclient properties that the dashlet can use to enrich itself.
 */
function initDashlet(data) {
    console.log("🚀 ~ DashletInfo ~ data:", data)
    dashletName = data.activeCustomDashlet["title_" + data.sessionInfo.language.toUpperCase()] || "Dashlet";
    currentSelectedObjects = data.selectedEntries.map((dmsInfo) => ({
      objectId: dmsInfo.osid,
      objectTypeId: dmsInfo.objectTypeId,
	  objectType: dmsInfo.objectType,
	  mainType: dmsInfo.mainType
    }));

    // display selected objects
    const selectedObjects = document.getElementById("selectedObjects");
    selectedObjects.innerHTML = JSON.stringify(currentSelectedObjects);

    const objectIds = document.getElementById("objectIds");
    objectIds.innerHTML = "";

    const openLocationContainer = document.getElementById("openLocationContainer");
    openLocationContainer.style = data.context == "hitlist.internalTray" ? "display: none;" : "";
    const openHitListByIdsContainer = document.getElementById("openHitListByIdsContainer");
    openHitListByIdsContainer.style = data.context == "hitlist.internalTray" ? "display: none;" : "";
    const openIndexDataContainer = document.getElementById("openIndexDataContainer");
    openIndexDataContainer.style = data.lastSelectedEntry.objectTypeId == "-1" ? "display: none;" : "";
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
    for (const currentSelectedObject of currentSelectedObjects) {
        await lib.openLocation(inNewTab, currentSelectedObject.objectId, currentSelectedObject.objectTypeId);
    }
}

async function openIndexData(formData) {
    const params = formatFormData(formData);

    for (const currentSelectedObject of currentSelectedObjects) {
        lib.openIndexData(params.inNewTab, params.mode, currentSelectedObject.objectId, currentSelectedObject.objectTypeId);
    }
}

async function getSelectedObjects() {
    const retVal = await lib.getSelectedObjects();
    let str = "";

    const objectIds = document.getElementById("objectIds");

    for (const temp of retVal) {
      str = `objectId: ${temp.objectId}, objectTypeId: ${temp.objectTypeId}`;
      objectIds.innerHTML += `<div>${str}</div>`;
    }
}

async function refreshHitListObjects() {
    await lib.refreshHitListObjects(currentSelectedObjects.map(x => x.objectId));
}

async function openHitListByIds(formData) {
    const params = formatFormData(formData);
    await lib.openHitListByIds(currentSelectedObjects, params.inNewTab, params.title, params.description, params.executeSingleHitAction);
}

async function resetSessionTimeout() {
    await lib.resetSessionTimeout();
    console.log('Session timeout has been reset');
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
    resetSessionTimeout
};
