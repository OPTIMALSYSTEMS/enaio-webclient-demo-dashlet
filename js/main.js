import * as lib from "./library/library.js";

let lastSelectedEntryOsId;
let currentSelectedOsids = [];
let currentSelectedObjects = [];
let dashletName = "Dashlet";

/**
 * Initialize the dashlet by feeding it incoming enaio® webclient data. The method has no return value.
 * @param data an object which contains enaio® webclient properties that the dashlet can use to enrich itself.
 */
function initDashlet(data) {
  if (data.sessionInfo) {
    //
    // Code for Dashlet initialization
    //
    dashletName = data.activeCustomDashlet["title_" + data.sessionInfo.language.toUpperCase()] || "Dashlet";
    lastSelectedEntryOsId = data.lastSelectedEntry.osid;
    currentSelectedOsids = data.selectedEntries.map((dmsInfo) => dmsInfo.osid);
    currentSelectedObjects = data.selectedEntries.map((dmsInfo) => ({
      objectId: dmsInfo.osid,
      objectTypeId: dmsInfo.objectTypeId,
    }));

    // display selected objects
    const selectedObjects = document.getElementById("selectedObjects");
    selectedObjects.innerHTML = JSON.stringify(currentSelectedObjects);
  } else {
    //
    // Code for modal dialog initialization
    //
    initAsync();
  }
}

async function initAsync() {
  debugger;

  const Tree = await lib.getFieldValueByInternal("tree");
  const Hier = await lib.getFieldValueByInternal("Hierarchie");
  const Liste = await lib.getFieldValueByInternal("Liste");

  // Checkboxen. Box 1 sollte aktiv sein
  const Box1 = await lib.getFieldValueByInternal("Box1");
  const Box2 = await lib.getFieldValueByInternal("Box1_0");

  const RechteDingeAddon_0 = await lib.getFieldValueByInternal("RechteDingeAddon_0");

  // Mehrsprache liste
  const MultilingualList = await lib.getFieldValueByInternal("MultilingualList");

  // Normale felder. Auch eine Datumsspalte darunter
  const NormaleFelder_0_0 = await lib.getFieldValueByInternal("NormaleFelder_0_0");

  // Schreibgeschützte spalten
  const NormaleFelder_0 = await lib.getFieldValueByInternal("NormaleFelder_0");

  // Schreibgeschützte Tabelle
  const NormaleFelder = await lib.getFieldValueByInternal("NormaleFelder");

  // Zahlenfelder
  const Zahlen_0 = await lib.getFieldValueByInternal("Zahlen_0");
  const decZahlen = await lib.getFieldValueByInternal("Zahlen");

  // Datum
  const Datum = await lib.getFieldValueByInternal("Datum");
  const DatumZeit = await lib.getFieldValueByInternal("Datum/Zeit");
  const Zeit = await lib.getFieldValueByInternal("Zeit");

  // Radio
  const Radio1 = await lib.getFieldValueByInternal("Radio1");
  const Radio2 = await lib.getFieldValueByInternal("Radio2");
  const Radio3 = await lib.getFieldValueByInternal("Radio3");

  // Special fields
  const asfFeld = await lib.getFieldValueByInternal("asfFeld");
  const LRFeld = await lib.getFieldValueByInternal("LRFeld");
  const MWFeld = await lib.getFieldValueByInternal("MWFeld");
  const JNFeld = await lib.getFieldValueByInternal("JNFeld");

  // unsichtbares feld
  const UnsichtbaresTextfeld = await lib.getFieldValueByInternal("UnsichtbaresTextfeld");

  // Button
  const button = await lib.getFieldValueByInternal("Schaltflche");
  const buttonFlagge = await lib.getFieldValueByInternal("SchaltFl76");

  debugger;
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
  await lib.openLocation(inNewTab, lastSelectedEntryOsId);
}

async function openIndexData(formData) {
  const objectId = lastSelectedEntryOsId;
  const params = formatFormData(formData);
  return lib.openIndexData(params.inNewTab, params.mode, objectId);
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
