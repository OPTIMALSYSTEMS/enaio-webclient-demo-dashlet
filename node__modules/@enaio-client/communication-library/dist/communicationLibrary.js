
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "registerOnInitCallback", () => $ee4aa6f009fdd7de$export$8f1480d0136598a3);
$parcel$export(module.exports, "registerOnUpdateCallback", () => $ee4aa6f009fdd7de$export$4172dbddf28736a3);
$parcel$export(module.exports, "openIndexData", () => $ee4aa6f009fdd7de$export$c80888c0f1760f07);
$parcel$export(module.exports, "isModalDialog", () => $ee4aa6f009fdd7de$export$cebb092bf393cc5);
$parcel$export(module.exports, "openLocation", () => $ee4aa6f009fdd7de$export$47c4a703efa8e61e);
$parcel$export(module.exports, "getSelectedObjects", () => $ee4aa6f009fdd7de$export$96f907581d671890);
$parcel$export(module.exports, "refreshHitListObjects", () => $ee4aa6f009fdd7de$export$89d12ae34746cff2);
$parcel$export(module.exports, "openHitListByIds", () => $ee4aa6f009fdd7de$export$5b5fa3829992783b);
$parcel$export(module.exports, "getFieldValueByInternal", () => $ee4aa6f009fdd7de$export$468316c75afcb0f3);
$parcel$export(module.exports, "setFieldValueByInternal", () => $ee4aa6f009fdd7de$export$50c2e2f825ad7b4b);
$parcel$export(module.exports, "getEnvironment", () => $ee4aa6f009fdd7de$export$57570b1603cf6adb);
$parcel$export(module.exports, "setDialogCaption", () => $ee4aa6f009fdd7de$export$74da6a16c6928c4d);
$parcel$export(module.exports, "closeModalDialog", () => $ee4aa6f009fdd7de$export$f290980283620b4a);
$parcel$export(module.exports, "registerOnCanCancelCallback", () => $ee4aa6f009fdd7de$export$e12a024d8ae2e5c);
$parcel$export(module.exports, "default", () => $ee4aa6f009fdd7de$export$2e2bcd8739ae039);
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
    delete data.dapi; // abstraction layer is taking care of it.
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
 * This library manage the communication between dashlet and rich client.
 */ let $bd804e687d9fc823$var$onInitCallback = null;
let $bd804e687d9fc823$var$onUpdateCallback = null;
let $bd804e687d9fc823$var$dashletCache = null; // static data from rich client only one time for a dashlet
let $bd804e687d9fc823$var$modalDialog = false;
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
}
/**
 * Providing only necessary information for this rich client dashlet example.
 * We are converting it to be like the webclient structure.
 *
 * @param {Object} data initialize data from the rich client.
 * @private
 */ async function $bd804e687d9fc823$var$internalOnInitUpdate(data) {
    if (data.selectedEntry) {
        if ($bd804e687d9fc823$var$onUpdateCallback != null) {
            // Unregister onUpdateCallback because it is not available and write a message to console.
            console.error("Modal dialogs does not trigger a update event. Please do not register one.");
            $bd804e687d9fc823$var$onUpdateCallback = null;
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
    if ($bd804e687d9fc823$var$dashletCache === null) {
        $bd804e687d9fc823$var$dashletCache = {};
        $bd804e687d9fc823$var$dashletCache.dashletCaption = window.osClient.osjxGetDashletCaption();
        $bd804e687d9fc823$var$dashletCache.uri = window.osClient.osjxGetDashletURL();
        $bd804e687d9fc823$var$dashletCache.languageGuiSelected = window.osClient.osjxGetEnvironment(35);
        $bd804e687d9fc823$var$dashletCache.languageObjectDefinition = window.osClient.osjxGetEnvironment(33);
        $bd804e687d9fc823$var$dashletCache.wfOrgId = window.osClient.osjxGetEnvironment(19);
        $bd804e687d9fc823$var$dashletCache.mail = window.osClient.osjxGetEnvironment(16);
        $bd804e687d9fc823$var$dashletCache.username = window.osClient.osjxGetEnvironment(3);
        $bd804e687d9fc823$var$dashletCache.groups = window.osClient.osjxGetEnvironment(11);
        $bd804e687d9fc823$var$dashletCache.fullname = window.osClient.osjxGetEnvironment(14);
    }
    let selectedEntries = await $bd804e687d9fc823$var$getSelectedObjects();
    let lastObjectType = {
        mainType: 0,
        objectType: "UNKNOWN"
    };
    if (selectedEntries == null || selectedEntries.length === 0 || selectedEntries[0].objectId === "" || selectedEntries[0].objectId === void 0) // On opening an index data mask for a different ECM object out of the dashlet the selectedEntries has one element
    // but the objectId and objectTypeId are empty. We fix this by assigning the information from the init event.
    selectedEntries = [
        {
            objectId: data.objectident,
            objectTypeId: data.objecttype
        }
    ];
    // For search masks we have a selected object with objectId zero. There isn't a selected object.
    if (selectedEntries.length === 1 && selectedEntries[0].objectId === "0" && selectedEntries[0].objectTypeId === "0") selectedEntries = [];
    for (const selectedEntry of selectedEntries){
        $bd804e687d9fc823$var$addObjectTypeAndMainType(selectedEntry);
        if (selectedEntry.objectId === data.objectident) lastObjectType = selectedEntry;
    }
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
            hasVariants: null,
            mainType: lastObjectType.mainType,
            objectTypeId: data.objecttype,
            osid: data.objectident,
            objectType: lastObjectType.objectType
        },
        osDashletInit: {
            objectident: data.objectident,
            objecttype: data.objecttype,
            userid: data.userid,
            userguid: data.userguid,
            sessionguid: data.sessionguid,
            regenerate: data.regenerate,
            pagecount: data.pagecount,
            searchterm: data.searchterm
        },
        selectedEntries: selectedEntries.map((selectedEntry)=>({
                osid: selectedEntry.objectId,
                objectTypeId: selectedEntry.objectTypeId,
                objectType: selectedEntry.objectType,
                mainType: selectedEntry.mainType
            })),
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
            wfOrdId: $bd804e687d9fc823$var$dashletCache.wfOrgId
        },
        context: null
    };
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
    window.internalOnInitUpdate = $bd804e687d9fc823$var$internalOnInitUpdate;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerText = "function osDashletInit(data) { window.internalOnInitUpdate(data); } function onInit(data) { window.internalOnInitUpdate(data); }";
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
        case "getEnvironment":
            return $bd804e687d9fc823$var$getEnvironment();
        case "closeModalDialog":
            return $bd804e687d9fc823$var$closeModalDialog(payload);
        case "setDialogCaption":
            return $bd804e687d9fc823$var$setDialogCaption(payload);
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
    if (objectTypeId >>> 16 === 0) await window.osClient.osjxOpenObject(osId);
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
    return selectedObjects.split(";").map((selectedObject)=>{
        const split = selectedObject.split(",");
        const retVal = {
            objectId: split[0],
            objectTypeId: split[1]
        };
        $bd804e687d9fc823$var$addObjectTypeAndMainType(retVal);
        return retVal;
    });
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
    return JSON.parse(await window.osClient.getFieldValueByInternal(payload[1][0]));
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $bd804e687d9fc823$var$setFieldValueByInternal(payload) {
    return JSON.parse(await window.osClient.setFieldValueByInternal(payload[1][0]));
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $bd804e687d9fc823$var$getEnvironment() {
    return JSON.parse(await window.osClient.getEnvironment());
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
    return window.osClient.setDialogCaption(payload[1][0]);
}
/**
 * Calculate the mainType and objectType from objectTypeId and add the properties to the
 * hand in object.
 *
 * @param selectedObject The object to extend
 */ function $bd804e687d9fc823$var$addObjectTypeAndMainType(selectedObject) {
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
    delete window.osClient;
}


/**
 * Registers an onInit callback which is executed once the dashlet is initialized.
 * 
 * @param {Function} onInitCallback The callback
 * @param {string} trustedOrigin origin which is allowed to send and receive messages. Should be the webclient uri.
 * Use "*" to allow every target origin. Example: https://enaio.company-name.de.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */ function $ee4aa6f009fdd7de$export$8f1480d0136598a3(onInitCallback, trustedOrigin = "*") {
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
const $ee4aa6f009fdd7de$var$CommunicationLibrary = {
    registerOnInitCallback: // Event Callbacks
    $ee4aa6f009fdd7de$export$8f1480d0136598a3,
    registerOnUpdateCallback: $ee4aa6f009fdd7de$export$4172dbddf28736a3,
    registerOnCanCancelCallback: $ee4aa6f009fdd7de$export$e12a024d8ae2e5c,
    openIndexData: // Methods Dashlets
    $ee4aa6f009fdd7de$export$c80888c0f1760f07,
    openLocation: $ee4aa6f009fdd7de$export$47c4a703efa8e61e,
    getSelectedObjects: $ee4aa6f009fdd7de$export$96f907581d671890,
    refreshHitListObjects: $ee4aa6f009fdd7de$export$89d12ae34746cff2,
    openHitListByIds: $ee4aa6f009fdd7de$export$5b5fa3829992783b,
    closeModalDialog: $ee4aa6f009fdd7de$export$f290980283620b4a,
    getFieldValueByInternal: // Methods modal dialogs
    $ee4aa6f009fdd7de$export$468316c75afcb0f3,
    setFieldValueByInternal: $ee4aa6f009fdd7de$export$50c2e2f825ad7b4b,
    getEnvironment: $ee4aa6f009fdd7de$export$57570b1603cf6adb,
    setDialogCaption: $ee4aa6f009fdd7de$export$74da6a16c6928c4d,
    isModalDialog: // export for unit tests
    $ee4aa6f009fdd7de$export$cebb092bf393cc5
};
var $ee4aa6f009fdd7de$export$2e2bcd8739ae039 = $ee4aa6f009fdd7de$var$CommunicationLibrary;


//# sourceMappingURL=communicationLibrary.js.map
