
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "registerOnInitCallback", () => $ee4aa6f009fdd7de$export$8f1480d0136598a3);
$parcel$export(module.exports, "registerOnUpdateCallback", () => $ee4aa6f009fdd7de$export$4172dbddf28736a3);
$parcel$export(module.exports, "openIndexData", () => $ee4aa6f009fdd7de$export$c80888c0f1760f07);
$parcel$export(module.exports, "isModalDialog", () => $ee4aa6f009fdd7de$export$cebb092bf393cc5);
$parcel$export(module.exports, "openLocation", () => $ee4aa6f009fdd7de$export$47c4a703efa8e61e);
$parcel$export(module.exports, "getSelectedObjects", () => $ee4aa6f009fdd7de$export$96f907581d671890);
$parcel$export(module.exports, "refreshHitListObjects", () => $ee4aa6f009fdd7de$export$89d12ae34746cff2);
$parcel$export(module.exports, "openHitListByIds", () => $ee4aa6f009fdd7de$export$5b5fa3829992783b);
$parcel$export(module.exports, "getFieldValueByInternal", () => $ee4aa6f009fdd7de$export$468316c75afcb0f3);
$parcel$export(module.exports, "getWorkflowVariableByName", () => $ee4aa6f009fdd7de$export$b3ed74af647c74bd);
$parcel$export(module.exports, "setFieldValueByInternal", () => $ee4aa6f009fdd7de$export$50c2e2f825ad7b4b);
$parcel$export(module.exports, "setWorkflowVariableByName", () => $ee4aa6f009fdd7de$export$23c49f97b8cbcd5b);
$parcel$export(module.exports, "getEnvironment", () => $ee4aa6f009fdd7de$export$57570b1603cf6adb);
$parcel$export(module.exports, "setDialogCaption", () => $ee4aa6f009fdd7de$export$74da6a16c6928c4d);
$parcel$export(module.exports, "closeModalDialog", () => $ee4aa6f009fdd7de$export$f290980283620b4a);
$parcel$export(module.exports, "resetSessionTimeout", () => $ee4aa6f009fdd7de$export$c3d283c41bbe930c);
$parcel$export(module.exports, "registerOnCanCancelCallback", () => $ee4aa6f009fdd7de$export$e12a024d8ae2e5c);
/**
 * This library manage the communication between dashlet and web client.
 */ const $c89a80de080932aa$var$msgQueue = {};
const $c89a80de080932aa$var$alertQueue = [];
let $c89a80de080932aa$var$modalDialog = false;
let $c89a80de080932aa$var$webclientOrigin;
let $c89a80de080932aa$var$trustedOrigin;
let $c89a80de080932aa$var$onInitCallback = ()=>{};
let $c89a80de080932aa$var$onUpdateCallback = ()=>{};
let $c89a80de080932aa$var$onUpdateCallbackRegistered = false;
/**
 * Registers an onInit callback which is executed once the dashlet is initialized.
 *
 * @param {Function} callback
 * @param {string} allowedOrigin origin which is allowed to send and receive messages. Should be the webclient uri.
 * Use "*" to allow every target origin. Example: https://enaio.company-name.de.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */ function $c89a80de080932aa$export$8f1480d0136598a3(callback, allowedOrigin) {
    $c89a80de080932aa$var$onInitCallback = callback;
    $c89a80de080932aa$var$trustedOrigin = allowedOrigin;
}
/**
 * Registers an onUpdate callback which is executed if something changes in the client.
 *
 * @param {Function} callback The callback
 * @param {string} allowedOrigin origin which is allowed to send and receive messages. Should be the webclient uri.
 * Use "*" to allow every target origin. Example: https://enaio.company-name.de.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */ function $c89a80de080932aa$export$4172dbddf28736a3(callback, allowedOrigin) {
    if ($c89a80de080932aa$var$modalDialog) throw "Modal dialogs do not trigger a update event. Please do not register one.";
    else {
        $c89a80de080932aa$var$onUpdateCallbackRegistered = true;
        $c89a80de080932aa$var$onUpdateCallback = callback;
        $c89a80de080932aa$var$trustedOrigin = allowedOrigin;
    }
}
// Listen to "message" type events from web client.
window.addEventListener("message", $c89a80de080932aa$export$221b191fcfaf22a, false);
/**
 * A function responsible for processing all incoming "messages" from the enaio® webclient.
 *
 * @param event the object passed from the other Window i.e. enaio® webclient.
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#the_dispatched_event
 */ function $c89a80de080932aa$export$221b191fcfaf22a(event) {
    // Todo: Why global?
    $c89a80de080932aa$var$webclientOrigin = event.origin;
    /* Ensure "messages" come from a trusted source i.e. your own enaio® hosted domain.
       Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#security_concerns

       "srcOrigin" is the domain URL where enaio® webclient is served. Example: https://enaio.company-name.de
        Please note, in enaio desktop client, "srcOrigin" is represented as "file://" string.
    */ if ($c89a80de080932aa$var$trustedOrigin !== null && $c89a80de080932aa$var$trustedOrigin !== undefined && $c89a80de080932aa$var$trustedOrigin.length > 0 && $c89a80de080932aa$var$trustedOrigin !== "*") {
        // client uses electron webclient so override origin
        if ("file://" === $c89a80de080932aa$var$webclientOrigin) $c89a80de080932aa$var$trustedOrigin = "file://";
        const safeOrigin = $c89a80de080932aa$var$trustedOrigin === $c89a80de080932aa$var$webclientOrigin;
        if (safeOrigin === false) {
            console.log(`webclientOrigin ${$c89a80de080932aa$var$webclientOrigin} is different from srcOrigin ${$c89a80de080932aa$var$trustedOrigin}`);
            return false;
        }
    }
    // "handleWebclientMessage" is a handler function which further processes all incoming "messages" from enaio® webclient (see implementation details in the communication-library.js file).
    // Extract the "type" and "data" properties for further processing.
    // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const { type: type, data: data } = $c89a80de080932aa$var$handleWebclientMessage(event.data);
    data === null || data === void 0 ? true : delete data.dapi; // abstraction layer is taking care of it.
    if (type === "onInit") {
        $c89a80de080932aa$var$detectDashletModalDialog(data);
        // Do initialization work here.
        $c89a80de080932aa$var$onInitCallback(data);
    } else if (type === "onUpdate") // React to osid selection changes here.
    $c89a80de080932aa$var$onUpdateCallback(data);
    return true;
}
/**
 * Detect the kind of script which is running. There are normal dashlets and
 * modal dialogs. They differ in specific way, but we want to make it as smooth
 * to the developer as possible.
 *
 * @param data The init data structure from enaio® webclient.
 */ function $c89a80de080932aa$var$detectDashletModalDialog(data) {
    if (data.selectedEntry) {
        $c89a80de080932aa$var$modalDialog = true;
        if ($c89a80de080932aa$var$onUpdateCallbackRegistered) {
            // Unregister onUpdateCallback because it is not available and write a message to console.
            console.error("Modal dialogs do not trigger a update event. Please do not register one.");
            $c89a80de080932aa$var$onUpdateCallbackRegistered = false;
            $c89a80de080932aa$var$onUpdateCallback = ()=>{};
        }
    }
}
/**
 * A function that handles "messages" coming from the enaio® webclient.
 *
 * @param payload an object with { type, data } as payload.
 * @returns an object with the same shape as the input payload i.e. { type, data }
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/5.2+Kommunikation
 */ function $c89a80de080932aa$var$handleWebclientMessage(payload) {
    if (payload.msgId && $c89a80de080932aa$var$msgQueue[payload.msgId]) {
        if (payload.data.error !== undefined) $c89a80de080932aa$var$msgQueue[payload.msgId].reject(payload.data.error);
        else if (payload.data.result !== undefined) $c89a80de080932aa$var$msgQueue[payload.msgId].resolve(payload.data.result);
        else $c89a80de080932aa$var$msgQueue[payload.msgId].resolve();
        if ($c89a80de080932aa$var$alertQueue.includes(payload.msgId)) {
            // display payload info
            $c89a80de080932aa$var$alertQueue.splice($c89a80de080932aa$var$alertQueue.indexOf(payload.msgId), 1);
            alert(JSON.stringify(payload.data.result));
        }
        delete $c89a80de080932aa$var$msgQueue[payload.msgId];
    }
    return payload;
}
/**
 * A function responsible for sending "messages" to the enaio® webclient.
 * @param payload an array with ["method-name", [arguments]] as payload. Ref: https://help.optimal-systems.com/enaio_develop/display/WEB/5.4+Dashlet-Methoden
 * @param triggerAlert Boolean. If true, a browser alert (with payload results) will be displayed in the enaio® webclient.
 * @returns a JavaScript Promise. Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/5.2+Kommunikation
 */ async function $c89a80de080932aa$export$7980e63f750e794e(payload, triggerAlert = false) {
    const msgId = Math.random().toString(36).substr(2, 8);
    payload.push({
        msgId: msgId
    });
    if (triggerAlert) $c89a80de080932aa$var$alertQueue.push(msgId);
    let _resolve, _reject;
    const promise = new Promise((resolve, reject)=>{
        _resolve = resolve;
        _reject = reject;
    });
    $c89a80de080932aa$var$msgQueue[msgId] = {
        resolve: _resolve,
        reject: _reject
    };
    // "window" is the Dashlet's JavaScript Window object. Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window
    // "parent" is the enaio® webclient Window object.
    // postMessage" is the browser API used to communicate between enaio® webclient and the Dashlet. Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
    if ($c89a80de080932aa$var$trustedOrigin !== null && $c89a80de080932aa$var$trustedOrigin !== undefined && $c89a80de080932aa$var$trustedOrigin.length > 0) window.parent.postMessage(payload, $c89a80de080932aa$var$trustedOrigin);
    else window.parent.postMessage(payload, "*");
    return promise;
}
/**
 * Return true if we are running inside a modal dialog. If we are running inside a dashlet the return is false.
 */ function $c89a80de080932aa$export$cebb092bf393cc5() {
    return $c89a80de080932aa$var$modalDialog;
}
/**
 * This function is only for the unit-tests to reset the webclient library to its original state
 */ function $c89a80de080932aa$export$aad8462122ac592b() {
    $c89a80de080932aa$var$modalDialog = false;
    $c89a80de080932aa$var$onInitCallback = ()=>{};
    $c89a80de080932aa$var$onUpdateCallback = ()=>{};
    $c89a80de080932aa$var$onUpdateCallbackRegistered = false;
}


/**
 * This library manages the communication between dashlet and rich client. It provides a bridge between 
 * the dashlet and the rich client, ensuring that dashlets can operate in a consistent way regardless of 
 * whether they are running in the web or rich client environment. It also includes mechanisms for testing
 * and for handling differences between modal dialogs and standard dashlets.
 */ let $bd804e687d9fc823$var$onInitCallback = null;
let $bd804e687d9fc823$var$onUpdateCallback = null;
let $bd804e687d9fc823$var$dashletCache = null; // static data from rich client only one time for a dashlet
let $bd804e687d9fc823$var$modalDialog = false;
// DODO-26194: Typeless document objecttype IDs that should be mapped to "-1"
// integer 13107200 >> -1 (internal tray)
// integer 19660800 >> -1 (workflow tray)
const $bd804e687d9fc823$var$TYPELESS_OBJECT_TYPE_IDS = [
    "19660800",
    "13107200"
];
// We keep the latest mapped selection so we can detect changes and, if needed,
// emit follow-up updates from the background monitor.
let $bd804e687d9fc823$var$lastSelectionSignature = "";
let $bd804e687d9fc823$var$selectionMonitorIntervalId = null;
let $bd804e687d9fc823$var$selectionMonitorInFlight = false;
let $bd804e687d9fc823$var$lastMappedDashletData = null;
/**
 * Check if the given object type represents a typeless document
 * @param {string} objectTypeId - The objecttype ID to check
 * @returns {boolean} - True if this is a typeless document type
 */ function $bd804e687d9fc823$var$isTypelessDocument(objectTypeId) {
    const isTypeless = $bd804e687d9fc823$var$TYPELESS_OBJECT_TYPE_IDS.includes(objectTypeId);
    return isTypeless;
}
/**
 * Registers an onInit callback which is executed once the dashlet is initialized.
 *
 * @param {Function} callback
 */ function $bd804e687d9fc823$export$8f1480d0136598a3(callback) {
    $bd804e687d9fc823$var$onInitCallback = callback;
}
/**
 * Registers an onUpdate callback which is executed if something changes in the client.
 *
 * @param {Function} callback The callback
 */ function $bd804e687d9fc823$export$4172dbddf28736a3(callback) {
    if ($bd804e687d9fc823$var$modalDialog) throw "Modal dialogs does not trigger a update event. Please do not register one.";
    $bd804e687d9fc823$var$onUpdateCallback = callback;
    $bd804e687d9fc823$var$startSelectionMonitor();
}
/**
 * Providing only necessary information for this rich client dashlet example.
 * We are converting it to be like the webclient structure.
 *
 * @param {Object} data initialize data from the rich client.
 * @private
 */ async function $bd804e687d9fc823$var$internalOnInitUpdate(data) {
    // In rich client payloads, `selectedEntry` means "modal dialog context".
    // Dashlet update payloads do not have this field.
    if (data.selectedEntry) {
        if ($bd804e687d9fc823$var$onUpdateCallback != null) {
            // Unregister onUpdateCallback because it is not available and write a message to console.
            console.error("Modal dialogs does not trigger a update event. Please do not register one.");
            $bd804e687d9fc823$var$onUpdateCallback = null;
            $bd804e687d9fc823$var$stopSelectionMonitor();
        }
        $bd804e687d9fc823$var$modalDialog = true;
        $bd804e687d9fc823$var$internalOnInitModalDialog(data);
    } else await $bd804e687d9fc823$var$internalOnInitUpdateDashlet(data);
}
/**
 * Method which is called if the rich client send the initialize event for a dashlet.
 * The initialize event is also fired in case of an update. The rich client only know
 * one event. We distinguish then. The onInit event is unregistered after first processing.
 * From then on all events are redirected to the update callback. The code inside enrich
 * the rich client data as much as possible to be equal to the webclient data.
 *
 * @param {Object} data initialize data from the rich client.
 * @private
 */ async function $bd804e687d9fc823$var$internalOnInitUpdateDashlet(data) {
    const isInitEvent = $bd804e687d9fc823$var$onInitCallback != null;
    if ($bd804e687d9fc823$var$dashletCache === null) {
        // Static environment values are read once per dashlet lifetime.
        $bd804e687d9fc823$var$dashletCache = {};
        $bd804e687d9fc823$var$dashletCache.dashletCaption = window.osClient.osjxGetDashletCaption();
        $bd804e687d9fc823$var$dashletCache.uri = window.osClient.osjxGetDashletURL();
        $bd804e687d9fc823$var$dashletCache.languageGuiSelected = window.osClient.osjxGetEnvironment(24) || "de";
        $bd804e687d9fc823$var$dashletCache.languageObjectDefinition = window.osClient.osjxGetEnvironment(33);
        $bd804e687d9fc823$var$dashletCache.wfOrgId = window.osClient.osjxGetEnvironment(19);
        $bd804e687d9fc823$var$dashletCache.mail = window.osClient.osjxGetEnvironment(16);
        $bd804e687d9fc823$var$dashletCache.username = window.osClient.osjxGetEnvironment(3);
        $bd804e687d9fc823$var$dashletCache.groups = window.osClient.osjxGetEnvironment(11);
        $bd804e687d9fc823$var$dashletCache.fullname = window.osClient.osjxGetEnvironment(14);
    }
    let selectedEntries = await $bd804e687d9fc823$var$getSelectedObjects();
    if (isInitEvent && (selectedEntries == null || selectedEntries.length === 0 || selectedEntries[0].objectId === "" || selectedEntries[0].objectId === void 0)) // On opening an index data mask for a different ECM object out of the dashlet the selectedEntries has one element
    // but the objectId and objectTypeId are empty. We fix this by assigning the information from the init event.
    selectedEntries = [
        {
            objectId: data.objectident,
            objectTypeId: data.objecttype
        }
    ];
    // For search masks we have a selected object with objectId zero. There isn't a selected object.
    if (selectedEntries.length === 1 && selectedEntries[0].objectId === "0" && selectedEntries[0].objectTypeId === "0") selectedEntries = [];
    // Some rich client updates can return stale multi-selection tuples after Ctrl+Click deselection.
    // In this state, objectident/objecttype already contain the effective primary selection while
    // osjxGetSelectedObjects still includes previously selected IDs, often with objectTypeId "0".
    // We do short retries to wait for the stable post-click state.
    selectedEntries = await $bd804e687d9fc823$var$normalizeStaleRichClientSelection(selectedEntries, data, isInitEvent);
    let lastSelectedEntry = null;
    for (const selectedEntry of selectedEntries){
        $bd804e687d9fc823$var$addObjectTypeAndMainType(selectedEntry);
        if (selectedEntry.objectId === data.objectident) lastSelectedEntry = selectedEntry;
    }
    if (lastSelectedEntry === null && selectedEntries.length > 0) // Rich client can report a primary selection in the init/update payload
    // that does not exist in the full selected object list anymore.
    lastSelectedEntry = selectedEntries[0];
    // get base url
    if (typeof location.origin === "undefined") location.origin = location.protocol + "//" + location.host;
    // map data for webClient structure
    const mappedData = {
        activeCustomDashlet: {
            objectTypes: null,
            platforms: null,
            uri: $bd804e687d9fc823$var$dashletCache.uri,
            title_DE: $bd804e687d9fc823$var$dashletCache.dashletCaption,
            title_EN: $bd804e687d9fc823$var$dashletCache.dashletCaption,
            title_FR: $bd804e687d9fc823$var$dashletCache.dashletCaption,
            iconId: null,
            users: null,
            groups: null
        },
        lastSelectedEntry: {
            ...$bd804e687d9fc823$var$createMappedLastSelectedEntry(lastSelectedEntry)
        },
        osDashletInit: {
            objectident: data.objectident,
            objecttype: $bd804e687d9fc823$var$isTypelessDocument(data.objecttype) ? "-1" : data.objecttype,
            userid: data.userid,
            userguid: data.userguid,
            sessionguid: data.sessionguid,
            regenerate: data.regenerate,
            pagecount: data.pagecount,
            searchterm: data.searchterm
        },
        selectedEntries: $bd804e687d9fc823$var$createMappedSelectedEntries(selectedEntries),
        locationInfo: $bd804e687d9fc823$var$getLocationInfo(data),
        sessionInfo: {
            language: $bd804e687d9fc823$var$dashletCache.languageGuiSelected.substring(0, 2),
            languageObjectDefinition: $bd804e687d9fc823$var$dashletCache.languageObjectDefinition.split("_")[0],
            sessionGuid: data.sessionguid,
            clientType: "rich_client",
            baseUrl: location.origin
        },
        userInfo: {
            email: $bd804e687d9fc823$var$dashletCache.mail,
            fullname: $bd804e687d9fc823$var$dashletCache.fullname,
            groups: $bd804e687d9fc823$var$dashletCache.groups.split(";"),
            name: $bd804e687d9fc823$var$dashletCache.username,
            osGuid: data.userguid,
            userId: data.userid,
            wfGuid: null,
            wfOrgId: $bd804e687d9fc823$var$dashletCache.wfOrgId
        },
        context: null
    };
    const selectionSignature = mappedData.selectedEntries.map((entry)=>`${entry.osid},${entry.objectTypeId}`).join(";");
    // Keep the latest signature even when no callback is fired.
    // The monitor uses this to prevent duplicate synthetic updates.
    if (selectionSignature !== $bd804e687d9fc823$var$lastSelectionSignature) $bd804e687d9fc823$var$lastSelectionSignature = selectionSignature;
    else !isInitEvent && mappedData.selectedEntries.length;
    $bd804e687d9fc823$var$lastMappedDashletData = mappedData;
    // execute registered events with mapped data.
    // onInitCallback is called once. Afterward we set it to null and then onUpdateCallback is called.
    if ($bd804e687d9fc823$var$onInitCallback != null) {
        $bd804e687d9fc823$var$onInitCallback(mappedData);
        $bd804e687d9fc823$var$onInitCallback = null;
    } else if ($bd804e687d9fc823$var$onUpdateCallback != null) $bd804e687d9fc823$var$onUpdateCallback(mappedData);
}
/**
 * Handle the onInit event for modal dialogs and call a callback function if one is registered.
 *
 * @param {Object} data initialize data from the rich client.
 * @private
 */ function $bd804e687d9fc823$var$internalOnInitModalDialog(data) {
    if ($bd804e687d9fc823$var$onInitCallback != null) {
        $bd804e687d9fc823$var$onInitCallback(data);
        $bd804e687d9fc823$var$onInitCallback = null;
    }
}
/**
 * Embed a function to the html file as the rich client looks up for a function
 * named osDashletInit in it. For this example we find that this is a clean solution
 * instead of placing it directly into the html file.
 *
 * @private
 */ function $bd804e687d9fc823$export$c6ba16edd0a0ecfe() {
    // Rich client calls global functions by name (`osDashletInit` / `onInit`).
    // We route both to one internal handler.
    window.internalOnInitUpdate = $bd804e687d9fc823$var$internalOnInitUpdate;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerText = "function osDashletInit(data) { return window.internalOnInitUpdate(data); } function onInit(data) { return window.internalOnInitUpdate(data); }";
    document.getElementsByTagName("head")[0].appendChild(script);
}
/**
 * Call the method directly to register ourselves directly on the window object.
 * A addEventListener("load", registerOnInitUpdate); would be nicer, but it is too late.
 * Then we miss the rich client call which we want to intercept.
 */ $bd804e687d9fc823$export$c6ba16edd0a0ecfe();
/**
 * Entry method for sending commands to the rich client. The payload is the one for enaio web client.
 * It must be converted before sending it to rich client and the response must also be converted back.
 * This method is async even if the method is synchronous. It must be compatible to web client implementation.
 * and the web client is async an
 *
 * @param {*} payload web client format
 * @returns response in web client format
 */ async function $bd804e687d9fc823$export$1079770825fa94d6(payload) {
    switch(payload[0]){
        case "openIndexData":
            return $bd804e687d9fc823$var$openIndexData(payload);
        case "openLocation":
            return $bd804e687d9fc823$var$openLocation(payload);
        case "getSelectedObjects":
            return $bd804e687d9fc823$var$getSelectedObjects(payload);
        case "refreshHitListObjects":
            return $bd804e687d9fc823$var$refreshHitListObjects(payload);
        case "openHitListByIds":
            return $bd804e687d9fc823$var$openHitListByIds(payload);
        case "getFieldValueByInternal":
            return $bd804e687d9fc823$var$getFieldValueByInternal(payload);
        case "setFieldValueByInternal":
            return $bd804e687d9fc823$var$setFieldValueByInternal(payload);
        case "setWorkflowVariableByName":
            return $bd804e687d9fc823$var$setWorkflowVariableByName(payload);
        case "getEnvironment":
            return $bd804e687d9fc823$var$getEnvironment();
        case "closeModalDialog":
            return $bd804e687d9fc823$var$closeModalDialog(payload);
        case "setDialogCaption":
            return $bd804e687d9fc823$var$setDialogCaption(payload);
        case "getWorkflowVariableByName":
            return $bd804e687d9fc823$var$getWorkflowVariableByName(payload);
        default:
            return undefined;
    }
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $bd804e687d9fc823$var$openLocation(payload) {
    // const inNewTab = payload[1][0]; // Only as reminder but not supported by the rich client.
    const osId = Number(payload[1][1]);
    const objectTypeId = Number(payload[1][2]);
    if (objectTypeId && objectTypeId >>> 16 === 0) await window.osClient.osjxOpenObject(osId);
    else await window.osClient.osjxOpenLocation(osId);
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $bd804e687d9fc823$var$openIndexData(payload) {
    // const inNewTab = payload[1][0]; // Only as reminder but not supported by the rich client.
    const osId = Number(payload[1][2]);
    const readonly = payload[1][1].toLowerCase() === "view";
    await window.osClient.osjxOpenDataSheet(osId, readonly);
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $bd804e687d9fc823$var$getSelectedObjects() {
    const selectedObjects = await window.osClient.osjxGetSelectedObjects();
    if (selectedObjects == null || selectedObjects.trim() === "") return [];
    let ignoredEntries = 0;
    const parsedObjects = selectedObjects.split(";").filter((selectedObject)=>selectedObject.trim() !== "").map((selectedObject)=>{
        // Rich client format is "objectId,objectTypeId;objectId,objectTypeId;..."
        const split = selectedObject.split(",");
        const objectId = split[0];
        const objectTypeId = split[1];
        if (!objectId || !objectTypeId) {
            ignoredEntries++;
            return null;
        }
        const retVal = {
            objectId: objectId,
            objectTypeId: objectTypeId
        };
        $bd804e687d9fc823$var$addObjectTypeAndMainType(retVal);
        return retVal;
    }).filter((selectedObject)=>selectedObject !== null);
    ignoredEntries;
    return parsedObjects;
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $bd804e687d9fc823$var$refreshHitListObjects(payload) {
    for (const objectToRefresh of payload[1]){
        const osId = Number(objectToRefresh[0]);
        await window.osClient.osjxRefreshObjectInLists(osId);
    }
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $bd804e687d9fc823$var$openHitListByIds(payload) {
    const ids = payload[1].objects;
    const title = payload[1].title.length === 0 ? "Gemischte Trefferliste" : payload[1].title;
    const request = {
        title: title,
        hits: ids.map((hit)=>({
                id: hit.objectId,
                type: hit.objectTypeId
            }))
    };
    await window.osClient.osjxOpenResultList(JSON.stringify(request));
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $bd804e687d9fc823$var$getFieldValueByInternal(payload) {
    const response = JSON.parse(await window.osClient.getFieldValueByInternal(payload[1][0]));
    return response;
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $bd804e687d9fc823$var$setFieldValueByInternal(payload) {
    const response = JSON.parse(await window.osClient.setFieldValueByInternal(payload[1][0]));
    return response;
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $bd804e687d9fc823$var$setWorkflowVariableByName(payload) {
    const response = JSON.parse(await window.osClient.setWorkflowVariableByName(payload[1][0]));
    return response;
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $bd804e687d9fc823$var$getEnvironment() {
    const response = JSON.parse(await window.osClient.getEnvironment());
    return response;
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $bd804e687d9fc823$var$closeModalDialog(payload) {
    await window.osClient.closeModalDialog(payload[1][0]);
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $bd804e687d9fc823$var$setDialogCaption(payload) {
    const response = window.osClient.setDialogCaption(payload[1][0]);
    return response;
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $bd804e687d9fc823$var$getWorkflowVariableByName(payload) {
    const response = JSON.parse(await window.osClient.getWorkflowVariableByName(payload[1][0]));
    return response;
}
/**
 * Calculate the mainType and objectType from objectTypeId and add the properties to the
 * hand in object.
 *
 * @param selectedObject The object to extend
 */ function $bd804e687d9fc823$var$addObjectTypeAndMainType(selectedObject) {
    if ($bd804e687d9fc823$var$isTypelessDocument(selectedObject.objectTypeId)) selectedObject.objectTypeId = "-1";
    // In WebClient it is a string. Therefore toString();
    selectedObject.mainType = (selectedObject.objectTypeId >>> 16).toString();
    switch(selectedObject.mainType){
        case "0":
            selectedObject.objectType = "FOLDER";
            break;
        case "99":
            selectedObject.objectType = "REGISTER";
            break;
        default:
            selectedObject.objectType = "DOCUMENT";
            break;
    }
}
/**
 * Return true if we are running inside a modal dialog. If we are running inside a dashlet the return is false.
 */ function $bd804e687d9fc823$export$cebb092bf393cc5() {
    return $bd804e687d9fc823$var$modalDialog;
}
/**
 * This function is only for the unit-tests to reset the rich client library to its original state
 */ function $bd804e687d9fc823$export$aad8462122ac592b() {
    $bd804e687d9fc823$var$modalDialog = false;
    $bd804e687d9fc823$var$onInitCallback = ()=>{};
    $bd804e687d9fc823$var$onUpdateCallback = ()=>{};
    $bd804e687d9fc823$var$dashletCache = null;
    $bd804e687d9fc823$var$lastSelectionSignature = "";
    $bd804e687d9fc823$var$lastMappedDashletData = null;
    $bd804e687d9fc823$var$stopSelectionMonitor();
    delete window.osClient;
}
function $bd804e687d9fc823$var$getLocationInfo(data) {
    // Priority: register location if available, otherwise folder location,
    // otherwise return empty object.
    // folder is at the root - no parent information available
    if (data.folderid === data.objectident && data.foldertype === data.objecttype) return {};
    // registers inside the root folder
    if (data.objectident === data.registerid && data.objecttype === data.registertype) return {
        objectId: data.folderid,
        objectTypeId: data.foldertype
    };
    // If registerid/registertype are present, use them
    if (data.registerid != null && data.registertype != null) return {
        objectId: data.registerid,
        objectTypeId: data.registertype
    };
    // If folderid/foldertype are present, use them
    if (data.folderid != null && data.foldertype != null) return {
        objectId: data.folderid,
        objectTypeId: data.foldertype
    };
    // Fallback to empty object
    return {};
}
function $bd804e687d9fc823$var$createMappedLastSelectedEntry(lastSelectedEntry) {
    if (!lastSelectedEntry) return {
        hasVariants: null,
        mainType: 0,
        objectTypeId: "",
        osid: "",
        objectType: "UNKNOWN"
    };
    return {
        hasVariants: null,
        mainType: lastSelectedEntry.mainType,
        objectTypeId: lastSelectedEntry.objectTypeId,
        osid: lastSelectedEntry.objectId,
        objectType: lastSelectedEntry.objectType
    };
}
function $bd804e687d9fc823$var$createMappedSelectedEntries(selectedEntries) {
    return selectedEntries.map((selectedEntry)=>({
            osid: selectedEntry.objectId,
            objectTypeId: selectedEntry.objectTypeId,
            objectType: selectedEntry.objectType,
            mainType: selectedEntry.mainType
        }));
}
function $bd804e687d9fc823$var$getMappedSelectionSignature(mappedSelectedEntries) {
    return mappedSelectedEntries.map((entry)=>`${entry.osid},${entry.objectTypeId}`).join(";");
}
function $bd804e687d9fc823$var$resolveFollowUpLastSelectedEntry(selectedEntries, previousMappedData) {
    var _previousMappedData_lastSelectedEntry;
    // On synthetic monitor updates there is no "clicked item" event payload.
    // Keep the previous lastSelectedEntry if it is still selected.
    const previousOsId = previousMappedData === null || previousMappedData === void 0 ? void 0 : (_previousMappedData_lastSelectedEntry = previousMappedData.lastSelectedEntry) === null || _previousMappedData_lastSelectedEntry === void 0 ? void 0 : _previousMappedData_lastSelectedEntry.osid;
    if (previousOsId) {
        const previousMatch = selectedEntries.find((entry)=>entry.objectId === previousOsId);
        if (previousMatch) return previousMatch;
    }
    return selectedEntries.length > 0 ? selectedEntries[0] : null;
}
function $bd804e687d9fc823$var$mergeMappedDataWithSelection(previousMappedData, selectedEntries) {
    // Reuse previous mapped payload and only replace selection-dependent fields.
    // This keeps session/user/context fields stable for consumers.
    const mappedSelectedEntries = $bd804e687d9fc823$var$createMappedSelectedEntries(selectedEntries);
    const nextLastSelectedEntry = $bd804e687d9fc823$var$resolveFollowUpLastSelectedEntry(selectedEntries, previousMappedData);
    const mappedLastSelectedEntry = $bd804e687d9fc823$var$createMappedLastSelectedEntry(nextLastSelectedEntry);
    const mergedMappedData = {
        ...previousMappedData,
        selectedEntries: mappedSelectedEntries,
        lastSelectedEntry: mappedLastSelectedEntry
    };
    if (mergedMappedData.osDashletInit && nextLastSelectedEntry) mergedMappedData.osDashletInit = {
        ...mergedMappedData.osDashletInit,
        objectident: nextLastSelectedEntry.objectId,
        objecttype: nextLastSelectedEntry.objectTypeId
    };
    return mergedMappedData;
}
function $bd804e687d9fc823$var$isKarmaEnvironment() {
    return typeof window !== "undefined" && window.__karma__ != null;
}
function $bd804e687d9fc823$var$startSelectionMonitor() {
    if ($bd804e687d9fc823$var$selectionMonitorIntervalId != null || $bd804e687d9fc823$var$isKarmaEnvironment()) return;
    // Safety net: rich client can miss or delay a deselection update.
    // Polling keeps dashlet selection in sync without user action.
    const MONITOR_INTERVAL_MS = 250;
    $bd804e687d9fc823$var$selectionMonitorIntervalId = setInterval(async ()=>{
        if ($bd804e687d9fc823$var$selectionMonitorInFlight || $bd804e687d9fc823$var$onUpdateCallback == null || $bd804e687d9fc823$var$modalDialog || !window.osClient || $bd804e687d9fc823$var$lastMappedDashletData == null) return;
        $bd804e687d9fc823$var$selectionMonitorInFlight = true;
        try {
            const currentRead = await $bd804e687d9fc823$var$getSelectedObjects();
            const currentSignature = $bd804e687d9fc823$var$getSelectionSignature(currentRead);
            if (currentSignature === $bd804e687d9fc823$var$lastSelectionSignature) return;
            const mergedMappedData = $bd804e687d9fc823$var$mergeMappedDataWithSelection($bd804e687d9fc823$var$lastMappedDashletData, currentRead);
            const mergedSignature = $bd804e687d9fc823$var$getMappedSelectionSignature(mergedMappedData.selectedEntries);
            if (mergedSignature === $bd804e687d9fc823$var$lastSelectionSignature) return;
            $bd804e687d9fc823$var$lastSelectionSignature = mergedSignature;
            $bd804e687d9fc823$var$lastMappedDashletData = mergedMappedData;
            $bd804e687d9fc823$var$onUpdateCallback(mergedMappedData);
        } catch  {} finally{
            $bd804e687d9fc823$var$selectionMonitorInFlight = false;
        }
    }, MONITOR_INTERVAL_MS);
}
function $bd804e687d9fc823$var$stopSelectionMonitor() {
    if ($bd804e687d9fc823$var$selectionMonitorIntervalId == null) return;
    clearInterval($bd804e687d9fc823$var$selectionMonitorIntervalId);
    $bd804e687d9fc823$var$selectionMonitorIntervalId = null;
    $bd804e687d9fc823$var$selectionMonitorInFlight = false;
}
async function $bd804e687d9fc823$var$normalizeStaleRichClientSelection(selectedEntries, data, isInitEvent) {
    if (isInitEvent || selectedEntries.length <= 1) // Init events and single-select events are usually stable immediately.
    return selectedEntries;
    // Rich-client selection can lag behind update events. A single follow-up read is often still stale.
    // We perform short retries and use the latest stable snapshot.
    const MAX_RETRIES = 4;
    const MIN_RETRIES_BEFORE_STABLE = 2;
    const RETRY_DELAY_MS = 35;
    const reads = [
        selectedEntries
    ];
    let previousSignature = $bd804e687d9fc823$var$getSelectionSignature(selectedEntries);
    for(let attempt = 1; attempt <= MAX_RETRIES; attempt++){
        await $bd804e687d9fc823$var$sleep(RETRY_DELAY_MS);
        const read = await $bd804e687d9fc823$var$getSelectedObjects();
        const signature = $bd804e687d9fc823$var$getSelectionSignature(read);
        reads.push(read);
        if (signature === previousSignature && attempt >= MIN_RETRIES_BEFORE_STABLE) {
            const preferredStableRead = $bd804e687d9fc823$var$preferReadContainingPayload(reads, data.objectident);
            return preferredStableRead;
        }
        previousSignature = signature;
    }
    const selectedRead = $bd804e687d9fc823$var$preferReadContainingPayload(reads, data.objectident);
    return selectedRead;
}
function $bd804e687d9fc823$var$getSelectionSignature(selectedEntries) {
    return selectedEntries.map((entry)=>`${entry.objectId},${entry.objectTypeId}`).join(";");
}
function $bd804e687d9fc823$var$preferReadContainingPayload(reads, payloadObjectId) {
    // Prefer a snapshot that contains the payload primary object.
    // If none match, use the newest snapshot.
    for(let index = reads.length - 1; index >= 0; index--){
        const read = reads[index];
        if (read.some((entry)=>entry.objectId === payloadObjectId)) return read;
    }
    return reads[reads.length - 1];
}
function $bd804e687d9fc823$var$sleep(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}


const $ee4aa6f009fdd7de$var$version = "2.0.7-rc3";
/**
 * Registers an onInit callback which is executed once the dashlet is initialized.
 * 
 * @param {Function} onInitCallback The callback
 * @param {string} trustedOrigin origin which is allowed to send and receive messages. Should be the webclient uri.
 * Use "*" to allow every target origin. Example: https://enaio.company-name.de.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */ function $ee4aa6f009fdd7de$export$8f1480d0136598a3(onInitCallback, trustedOrigin = "*") {
    console.log(`Current Communication library version number: ${$ee4aa6f009fdd7de$var$version}`);
    if (window.osClient) $bd804e687d9fc823$export$8f1480d0136598a3(onInitCallback);
    else $c89a80de080932aa$export$8f1480d0136598a3(onInitCallback, trustedOrigin);
}
/**
 * Registers an onUpdate callback which is executed if something changes in the client.
 * 
 * @param {Function} onUpdateCallback The callback
 * @param {string} trustedOrigin origin which is allowed to send and receive messages. Should be the webclient uri.
 * Use "*" to allow every target origin. Example: https://enaio.company-name.de.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */ function $ee4aa6f009fdd7de$export$4172dbddf28736a3(onUpdateCallback, trustedOrigin = "*") {
    if (window.osClient) $bd804e687d9fc823$export$4172dbddf28736a3(onUpdateCallback);
    else $c89a80de080932aa$export$4172dbddf28736a3(onUpdateCallback, trustedOrigin);
}
/**
 * Opens the index data mask for the currently selected osId.
 * 
 * @param {boolean} inNewTab indicates whether the index data mask should be opened in a new tab. Default is (false).
 * @param {string} mode should the index data view be opened in read-only mode (view) or in edit mode (edit). Default is (edit) mode.
 * @param {string} objectId the osId of the DMS object.
 * @param {string} objectTypeId the objectTypeId of the DMS object. This increases the performance when opening the index data view.
 * @returns {boolean} true if the objectId and objectTypeId are valid and the opening was successful. Otherwise, false.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/openIndexData
 */ async function $ee4aa6f009fdd7de$export$c80888c0f1760f07(inNewTab, mode, objectId, objectTypeId) {
    if ($ee4aa6f009fdd7de$export$cebb092bf393cc5()) throw "Not implemented for modal dialog";
    return $ee4aa6f009fdd7de$var$sendClientMessage([
        "openIndexData",
        [
            inNewTab,
            mode,
            objectId,
            objectTypeId
        ]
    ]);
}
/**
 * Opens the location in the current browser tab (or a location selection in the case of several possible locations) for the DMS object transferred as a parameter.
 * 
 * @param {boolean} inNewTab indicates whether the hit list should be opened in a new tab.
 * @param {string} objectId the osId of the DMS object.
 * @param {string} [objectTypeId] the objectTypeId of the DMS object. This increases the performance when opening the location.
 * @param {string} [parentId] the osId of the parent DMS object to open a specific location if the object has multiple locations.
 * @param {string} [parentTypeId] the objectTypeId of the parent DMS object to open a specific location if the object has multiple locations.
 * @returns {Promise<void>} The method has no return value. In the event of an error, an error is triggered. This can be caught with a try-catch-block or error handler for the method.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/openLocation
 */ async function $ee4aa6f009fdd7de$export$47c4a703efa8e61e(inNewTab, objectId, objectTypeId, parentId, parentTypeId) {
    if ($ee4aa6f009fdd7de$export$cebb092bf393cc5()) throw "Not implemented for modal dialog";
    await $ee4aa6f009fdd7de$var$sendClientMessage([
        "openLocation",
        [
            inNewTab,
            objectId,
            objectTypeId,
            parentId,
            parentTypeId
        ]
    ]);
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
 */ async function $ee4aa6f009fdd7de$export$96f907581d671890() {
    if ($ee4aa6f009fdd7de$export$cebb092bf393cc5()) throw "Not implemented for modal dialog";
    return $ee4aa6f009fdd7de$var$sendClientMessage([
        "getSelectedObjects",
        []
    ]);
}
/**
 * Update/refresh one or more objects in an open hit list.
 * 
 * @param {string[]} osIds of the DMS objects.
 * @return The method has no return value. In the event of an error, an error is triggered. This can be caught with a try-catch-block or error handler for the method.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/refreshHitListObjects
 */ async function $ee4aa6f009fdd7de$export$89d12ae34746cff2(osIds) {
    if ($ee4aa6f009fdd7de$export$cebb092bf393cc5()) throw "Not implemented for modal dialog";
    await $ee4aa6f009fdd7de$var$sendClientMessage([
        "refreshHitListObjects",
        [
            osIds
        ]
    ]);
}
/**
 * Display a mixed hit list with freely selected objects.
 * 
 * @param {Array<{objectId: string, objectTypeId: string}>} objects selected objects
 * @param {boolean} [inNewTab] indicates whether the hit list should be opened in a new tab
 * @param {string} [title] title of the hit list
 * @param {string} [subTitle] subtitle of the hit list
 * @param {boolean} [executeSingleHitAction] specifies whether to execute the default action when there is a single hit
 * @return The method has no return value. In the event of an error, an error is triggered. This can be caught with a try-catch-block or error handler for the method.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/openHitListByIds
 */ async function $ee4aa6f009fdd7de$export$5b5fa3829992783b(objects, inNewTab = false, title = "", subTitle = "", executeSingleHitAction = false) {
    if ($ee4aa6f009fdd7de$export$cebb092bf393cc5()) throw "Not implemented for modal dialog";
    await $ee4aa6f009fdd7de$var$sendClientMessage([
        "openHitListByIds",
        {
            objects: objects,
            inNewTab: inNewTab,
            title: title,
            description: subTitle,
            executeSingleHitAction: executeSingleHitAction
        }
    ]);
}
/**
 * Only available for modal dialogs.
 * Return the value of a field given by its internal name. The return value depends on the field type.
 * See documentation for more information regarding return value.
 *
 * @param json A json object with internalName
 * @return {Promise<string|Array<Array<string>>>}
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/getFieldValueByInternal
 * @returns The answer of the client.
 */ async function $ee4aa6f009fdd7de$export$468316c75afcb0f3(json) {
    if (!$ee4aa6f009fdd7de$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
    return $ee4aa6f009fdd7de$var$sendClientMessage([
        "getFieldValueByInternal",
        [
            $ee4aa6f009fdd7de$var$jsonObjectToString(json)
        ]
    ]);
}
/**
 * Fetches the value of a specific workflow variable by its name. This function is only available for modal dialogs.
 * The return value of the function depends on the type of the workflow variable being queried.
 *
 * @param {object} json - A JSON object containing the `name` of the workflow variable.
 * @return {Promise<string|Array<Array<string>>>} - A promise that resolves to the value of the workflow variable. The type of the return value can be a string or an array of arrays of strings, depending on the variable's type.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/getWorkflowVariableByName - For more information regarding the return value based on the field type.
 * @throws {string} - Throws an error message if the function is invoked outside of a modal dialog context, as it is not implemented for dashlets.
 */ async function $ee4aa6f009fdd7de$export$b3ed74af647c74bd(json) {
    if (!$ee4aa6f009fdd7de$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
    return $ee4aa6f009fdd7de$var$sendClientMessage([
        "getWorkflowVariableByName",
        [
            $ee4aa6f009fdd7de$var$jsonObjectToString(json)
        ]
    ]);
}
/**
 * Only available for modal dialogs.
 * Set the value of a field given by its internal name in the open index data mask behind the modal dialog.
 * The current value of the index data mask field is completely replaced by the new value.
 *
 * @param json A json object with internalName and value.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/setFieldValueByInternal
 * @returns The answer of the client.
 */ async function $ee4aa6f009fdd7de$export$50c2e2f825ad7b4b(json) {
    if (!$ee4aa6f009fdd7de$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
    return $ee4aa6f009fdd7de$var$sendClientMessage([
        "setFieldValueByInternal",
        [
            $ee4aa6f009fdd7de$var$jsonObjectToString(json)
        ]
    ]);
}
/**
 * Only available for modal dialogs.
 * Sets a workflow variable by its name.
 * The current value of the workflow variable is completely replaced by the new value.
 *
 * @param json A json object with the variable name and value.
 * @throws {string} If the function is used outside of a modal dialog.
 * @returns The answer of the client.
 * @async
 */ async function $ee4aa6f009fdd7de$export$23c49f97b8cbcd5b(json) {
    if (!$ee4aa6f009fdd7de$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
    return $ee4aa6f009fdd7de$var$sendClientMessage([
        "setWorkflowVariableByName",
        [
            $ee4aa6f009fdd7de$var$jsonObjectToString(json)
        ]
    ]);
}
/**
 * Return the environment values from the client.
 *
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/getEnvironment
 * @returns The environment values from the client.
 */ async function $ee4aa6f009fdd7de$export$57570b1603cf6adb() {
    if (!$ee4aa6f009fdd7de$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
    return $ee4aa6f009fdd7de$var$sendClientMessage([
        "getEnvironment",
        []
    ]);
}
/**
 * This function is only available for modal dialogs. It sets the caption of the dialog to the provided value.
 *
 * @param {string} newDialogCaption - The caption to be set for the modal dialog. Defaults to an empty string if no value is provided.
 * @throws {string} Throws a string error message if the function is used outside of a modal dialog context.
 * @remarks The caption is set as an array for webclient compatibility. The rich client only accepts a string.
 */ function $ee4aa6f009fdd7de$export$74da6a16c6928c4d(newDialogCaption = "") {
    if (!$ee4aa6f009fdd7de$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
    return $ee4aa6f009fdd7de$var$sendClientMessage([
        "setDialogCaption",
        [
            newDialogCaption
        ]
    ]);
}
/**
 * Cancel the modal dialog
 *
 * @param buttonScriptReturnValue The numeric value which should be sent to the button script
 */ async function $ee4aa6f009fdd7de$export$f290980283620b4a(buttonScriptReturnValue) {
    if (!$ee4aa6f009fdd7de$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
    return $ee4aa6f009fdd7de$var$sendClientMessage([
        "closeModalDialog",
        [
            buttonScriptReturnValue
        ]
    ]);
}
/**
 * Reset the session timeout for the current user session.
 * 
 * @returns {Promise<void>} The method has no return value. In the event of an error, an error is triggered. This can be caught with a try-catch-block or error handler for the method.
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/resetSessionTimeout
 */ async function $ee4aa6f009fdd7de$export$c3d283c41bbe930c() {
    if (window.osClient) return; // there is no session timeout in the rich client
    await $ee4aa6f009fdd7de$var$sendClientMessage([
        "resetSessionTimeout",
        []
    ]);
}
/**
 * Send a command either to the web client or rich client and return the response.
 * 
 * @private
 * @param {Object[]} payload The input parameter for the command
 * @returns The answer of the client
 */ async function $ee4aa6f009fdd7de$var$sendClientMessage(payload) {
    try {
        if (window.osClient) return $bd804e687d9fc823$export$1079770825fa94d6(payload);
        return $c89a80de080932aa$export$7980e63f750e794e(payload);
    } catch (error) {
        console.log(`dashlet says: error caught in ${payload[0]}`, error);
    }
}
/**
 * Checks if the json object is a string. If not the json object is stringify and
 * returned. Otherwise, it is returned as handed in.
 *
 * @private
 * @returns {string} The stringify json object if it is not already a string.
 */ function $ee4aa6f009fdd7de$var$jsonObjectToString(jsonObject) {
    if (!(jsonObject instanceof String) && typeof jsonObject !== "string") {
        if (typeof jsonObject.value === "object" && !Array.isArray(jsonObject.value)) jsonObject.value = JSON.stringify(jsonObject.value);
        return JSON.stringify(jsonObject);
    }
    return jsonObject;
}
/**
 * Return true if we are running inside a modal dialog. If we are running inside a dashlet the return is false.
 *
 * @private
 * @returns true if modal dialog, Otherwise false
 */ function $ee4aa6f009fdd7de$export$cebb092bf393cc5() {
    if (window.osClient) return $bd804e687d9fc823$export$cebb092bf393cc5();
    return $c89a80de080932aa$export$cebb092bf393cc5();
}
// This will store the value for the onCanCancel behavior.
// It's initialized to a default value to ensure it's always callable.
let $ee4aa6f009fdd7de$var$onCanCancelValue = 1;
/**
 * Registers the callback for the ESC key event.
 *
 * @param {Function} valueFunction - A function that returns the current value for the callback.
 */ function $ee4aa6f009fdd7de$export$e12a024d8ae2e5c(valueFunction) {
    return new Promise((resolve, reject)=>{
        // Delay is necessary to ensure the availability of the function.
        setTimeout(()=>{
            if (!$ee4aa6f009fdd7de$export$cebb092bf393cc5()) reject("Not implemented for dashlets");
            else {
                // We assign the function passed from main.js to onCanCancelValue.
                // This allows the function to be updated dynamically from main.js.
                $ee4aa6f009fdd7de$var$onCanCancelValue = valueFunction;
                resolve();
            }
        }, 1000);
    });
}
// Event listener for the ESC key.
window.addEventListener("keydown", function(event) {
    // Check if the ESC key was pressed, and the modal dialog is active.
    if (event.key === "Escape" && !window.osClient && $ee4aa6f009fdd7de$export$cebb092bf393cc5()) {
        // Retrieve the current onCanCancelValue by calling the function.
        const currentValue = typeof $ee4aa6f009fdd7de$var$onCanCancelValue == "function" ? $ee4aa6f009fdd7de$var$onCanCancelValue() : $ee4aa6f009fdd7de$var$onCanCancelValue;
        // If the value is not 2, we close the modal dialog.
        if (currentValue !== 2) $ee4aa6f009fdd7de$export$f290980283620b4a(currentValue);
        else console.warn("ESC key event is disabled.");
    }
});


//# sourceMappingURL=communicationLibrary.cjs.map
