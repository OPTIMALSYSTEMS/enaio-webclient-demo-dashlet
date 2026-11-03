// Below is only for demo purposes. Github Pages only supports static site hosting.
// In a production environment, import from the npm library as explained here https://www.npmjs.com/package/@enaio-client/communication-library
const lib = window.CommunicationLibrary;
if (!lib) {
    throw new Error('CommunicationLibrary global not found. Ensure js/communicationLibrary.js is loaded before js/main.js');
}

let currentSelectedObjects = [];
let dashletName = "?";
let currentContext = "";

// Browser storage key holding the outcome of the last openHitListByIds call.
const LAST_OPEN_HIT_LIST_CALL_KEY = "enaioDemoDashlet.lastOpenHitListByIds";

let createNewLocationId;

const CREATE_NEW_ERROR_TEXTS = {
    INVALID_PARAMETERS: "Der Aufruf ist unvollständig oder widersprüchlich.",
    UNKNOWN_OBJECT_TYPE: "Den Objekttyp gibt es nicht, oder der Benutzer darf ihn nicht sehen.",
    PARENT_NOT_FOUND: "Der Standort aus parentId wurde nicht gefunden.",
    NOT_ALLOWED_AT_LOCATION: "An diesem Standort kann das Objekt nicht angelegt werden.",
    TYPE_NOT_IN_CABINET: "Der Objekttyp gehört nicht zum Schrank des Standorts.",
    MODAL_DIALOG_OPEN: "Im Webclient ist gerade ein Dialog geöffnet.",
    CREATE_IN_PROGRESS: "Eine Maske zum Anlegen ist schon offen, oder ein anderer Aufruf läuft noch.",
    CREATE_FORM_NOT_OPENED: "Die Maske konnte nicht geöffnet werden.",
    NOT_SUPPORTED: "createNew ist hier nicht verfügbar, oder der Webclient hat nicht innerhalb von 10 Sekunden geantwortet."
};

/**
 * Initialize the dashlet by feeding it incoming enaio® webclient data. The method has no return value.
 * @param data an object which contains enaio® webclient properties that the dashlet can use to enrich itself.
 */
function initDashlet(data) {
    console.log("🚀 ~ DashletInfo ~ data:", data)
    dashletName = data.activeCustomDashlet["title_" + data.sessionInfo.language.toUpperCase()] || "Dashlet";
    currentContext = data.context || "";
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
    createNewLocationId = data.locationInfo?.objectId;
    document.getElementById("createNewUseLocation").disabled = !createNewLocationId;

    // display the outcome of the last openHitListByIds call, also after a reload
    renderLastOpenHitListByIdsCall();
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
lib.registerOnObjectCreationCallback(showObjectCreation);

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
    const statusElement = document.getElementById("openHitListByIdsStatus");
    const startedAt = performance.now();

    statusElement.textContent = "Aufruf läuft …";

    // Persist the started state before the call: if a reloaded panel still shows
    // "gestartet", that is direct proof that the promise never settled before the
    // dashlet was destroyed.
    rememberOpenHitListByIdsCall("gestartet", 0, params.inNewTab);

    try {
        await lib.openHitListByIds(currentSelectedObjects, params.inNewTab, params.title, params.description, params.executeSingleHitAction);
        const durationMs = Math.round(performance.now() - startedAt);
        statusElement.textContent = `Promise aufgelöst nach ${durationMs} ms`;
        rememberOpenHitListByIdsCall("aufgelöst", durationMs, params.inNewTab);
    } catch (error) {
        const durationMs = Math.round(performance.now() - startedAt);
        statusElement.textContent = `Promise abgelehnt nach ${durationMs} ms: ${error}`;
        rememberOpenHitListByIdsCall("abgelehnt", durationMs, params.inNewTab);
    }
}

/**
 * Store the outcome of the last openHitListByIds call in the browser storage.
 * The view change can destroy this dashlet iframe before the status line can be read,
 * so the outcome is persisted and shown again on init.
 */
function rememberOpenHitListByIdsCall(outcome, durationMs, inNewTab) {
    try {
        localStorage.setItem(LAST_OPEN_HIT_LIST_CALL_KEY, JSON.stringify({
            time: new Date().toISOString(),
            outcome,
            durationMs,
            inNewTab: inNewTab === true,
            context: currentContext
        }));
    } catch (error) {
        // storage can be unavailable, e.g. in a sandboxed iframe or private mode
        console.log("Could not store the last openHitListByIds call:", error);
    }

    renderLastOpenHitListByIdsCall();
}

/**
 * Display the stored outcome of the last openHitListByIds call in the panel.
 */
function renderLastOpenHitListByIdsCall() {
    const lastResultElement = document.getElementById("openHitListByIdsLastResult");
    let entry = null;

    try {
        const stored = localStorage.getItem(LAST_OPEN_HIT_LIST_CALL_KEY);
        entry = stored ? JSON.parse(stored) : null;
    } catch (error) {
        // storage can be unavailable or contain an unreadable entry
        console.log("Could not read the last openHitListByIds call:", error);
    }

    if (entry) {
        const time = new Date(entry.time).toLocaleTimeString("de-DE");
        const details = `(inNewTab: ${entry.inNewTab}, Kontext: ${entry.context || "unbekannt"})`;
        const state = entry.outcome === "gestartet"
            ? "gestartet, noch nicht aufgelöst"
            : `${entry.outcome} nach ${entry.durationMs} ms`;
        lastResultElement.textContent = `Letzter Aufruf: ${time} – ${state} ${details}`;
    } else {
        lastResultElement.textContent = "Letzter Aufruf: noch keiner";
    }
}

/**
 * Call createNew with the call typed as JSON and the chosen file, and show whether the webclient accepted it.
 * @param callJson the parameters of createNew as JSON text.
 */
async function createNew(callJson) {
    const outcome = document.getElementById("createNewOutcome");
    outcome.replaceChildren();
    const params = parseCreateNewCall(callJson);

    if (params === undefined) {
        return;
    }

    const button = document.getElementById("createNew");
    button.disabled = true;
    button.textContent = "Wird gesendet …";

    try {
        const file = document.getElementById("createNewFile").files[0];
        const fileData = await file?.arrayBuffer().catch((error) => {
            outcome.append(outcomeRow("bad", "Datei", ...textLines("Die Datei konnte nicht gelesen werden.", error.message)));
        });

        if (file && !fileData) {
            return;
        }

        const call = file ? {...params, file: {name: file.name, type: file.type, data: fileData}} : params;
        const {requestId} = await lib.createNew(call);
        outcome.append(outcomeRow("info", "Angenommen", ...idParts(["requestId", requestId]),
            ...textLines("Der Webclient öffnet die Maske, das Ergebnis folgt als Ereignis.")));
    } catch (error) {
        if (reachesCallback(error)) {
            return;
        }

        const [tone, tag] = error?.errorCode === "NOT_SUPPORTED" ? ["warn", "Nicht unterstützt"] : ["bad", "Fehler"];
        outcome.append(outcomeRow(tone, tag, ...idParts(["requestId", error?.requestId], ["", error?.errorCode]), ...errorLines(error)));
    } finally {
        button.disabled = false;
        button.textContent = "Neues Objekt anlegen";
    }
}

/**
 * Whether the objectCreation callback also reports this rejection: every refusal by the webclient reaches it, NOT_SUPPORTED
 * and errors of the browser do not.
 */
function reachesCallback(error) {
    return Boolean(error?.errorCode) && error.errorCode !== "NOT_SUPPORTED";
}

/**
 * Show the outcome of a createNew call, sent by the enaio® webclient only to the dashlet which made the call.
 * @param objectCreation the requestId and creationState of the call, plus the fields of that creationState.
 */
function showObjectCreation(objectCreation) {
    const {requestId, creationState} = objectCreation;
    const outcome = document.getElementById("createNewOutcome");
    console.log(`objectCreation in "${dashletName}": requestId ${requestId}, creationState ${creationState}`);

    if (creationState === "success") {
        outcome.append(...successRows(objectCreation));
    } else if (creationState === "cancelled") {
        outcome.append(outcomeRow("warn", "Abgebrochen", ...idParts(["requestId", requestId]),
            ...textLines("Die Maske wurde ohne Speichern verlassen.")));
    } else if (creationState === "error") {
        outcome.append(outcomeRow("bad", "Fehler", ...idParts(["requestId", requestId], ["", objectCreation.errorCode]),
            ...errorLines(objectCreation)));
    }
}

/**
 * Set parentId in the typed call to the folder or register of the latest onInit or onUpdate, keeping the other keys.
 */
function useLocationAsParentId() {
    const editor = document.getElementById("createNewCall");
    document.getElementById("createNewOutcome").replaceChildren();
    const params = parseCreateNewCall(editor.value);

    if (params !== undefined) {
        editor.value = JSON.stringify({...params, parentId: createNewLocationId}, null, 2);
    }
}

/**
 * The typed call as parsed JSON, or undefined after showing why it is not valid JSON.
 */
function parseCreateNewCall(callJson) {
    try {
        return JSON.parse(callJson);
    } catch (error) {
        document.getElementById("createNewOutcome")
            .append(outcomeRow("bad", "Eingabe", ...textLines("Der Aufruf ist kein gültiges JSON.", error.message)));
        return undefined;
    }
}

function successRows(objectCreation) {
    const rows = [outcomeRow("ok", "Angelegt", ...idParts(["requestId", objectCreation.requestId],
        ["objectId", objectCreation.objectId], ["objectTypeId", objectCreation.objectTypeId], ["parentId", objectCreation.parentId]))];

    if (objectCreation.ignoredFields?.length > 0) {
        rows.push(outcomeRow("warn", "Nicht übernommen", ...idParts(...objectCreation.ignoredFields.map((field) => ["", field])),
            ...textLines("Diese Werte hat die Maske nicht übernommen.")));
    }

    if (objectCreation.contentWarning) {
        rows.push(outcomeRow("warn", "Datei", ...idParts(["", objectCreation.contentWarning]),
            ...textLines("Das Objekt wurde ohne die Datei angelegt.")));
    }

    return rows;
}

/**
 * The German text for the errorCode of a refusal or an error event, then its English message from the webclient or the library.
 */
function errorLines(error) {
    const text = error?.errorCode ? CREATE_NEW_ERROR_TEXTS[error.errorCode] ?? "" : "Der Aufruf konnte nicht gesendet werden.";
    return textLines(text, error?.message ?? String(error));
}

/**
 * The ids of a row as "name value" pairs joined by a dot; a pair without value is left out, one without name shows the value only.
 */
function idParts(...pairs) {
    return pairs.filter(([, value]) => value).flatMap(([name, value]) => [" · ", name ? `${name} ` : "", codeElement(value)]).slice(1);
}

function textLines(text, technicalMessage) {
    const lines = [lineElement("outcome-text", text)];
    return technicalMessage ? [...lines, lineElement("outcome-detail", `Technische Meldung: ${technicalMessage}`)] : lines;
}

function lineElement(className, text) {
    const element = document.createElement("span");
    element.className = className;
    element.textContent = text;
    return element;
}

/**
 * One row of the outcome area: the tag, coloured by tone ("info", "ok", "warn" or "bad"), followed by the parts.
 */
function outcomeRow(tone, tag, ...parts) {
    const row = document.createElement("div");
    const tagElement = document.createElement("span");
    const textElement = document.createElement("span");
    row.className = "outcome-row";
    tagElement.className = `outcome-tag outcome-${tone}`;
    tagElement.textContent = tag;
    textElement.append(...parts);
    row.append(tagElement, textElement);
    return row;
}

function codeElement(value) {
    const element = document.createElement("code");
    element.textContent = value;
    return element;
}

function showChosenFile() {
    const file = document.getElementById("createNewFile").files[0];
    const size = file ? Math.ceil(file.size / 1024).toLocaleString("de-DE") : "";
    document.getElementById("createNewFileName").textContent = file ? `${file.name} (${size} KB)` : "Keine Datei ausgewählt";
    document.getElementById("createNewFileClear").hidden = !file;
}

function clearChosenFile() {
    document.getElementById("createNewFile").value = "";
    showChosenFile();
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
    resetSessionTimeout,
    createNew,
    useLocationAsParentId,
    showChosenFile,
    clearChosenFile
};