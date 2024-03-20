import * as lib from '../../node__modules/@enaio-client/communication-library/dist/module.js';

let currentSelectedObjects = [];
let dashletName = "Dashlet";

/**
 * Initialize the dashlet by feeding it incoming enaio® webclient data. The method has no return value.
 * @param data an object which contains enaio® webclient properties that the dashlet can use to enrich itself.
 */
function initDashlet(data) {
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

    for (const temp of retVal) {
      str += `\n${temp.objectId}, ${temp.objectTypeId}`;
    }

    alert(str);
}

async function refreshHitListObjects() {
    await lib.refreshHitListObjects(currentSelectedObjects.map(x => x.objectId));
}

async function openHitListByIds(formData) {
    const params = formatFormData(formData);
    await lib.openHitListByIds(currentSelectedObjects, params.inNewTab, params.title, params.description, params.executeSingleHitAction);
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
