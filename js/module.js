/**
 * This library manage the communication between dashlet and web client.
 */ const $a98a2b9392e1c624$var$msgQueue = {};
const $a98a2b9392e1c624$var$alertQueue = [];
let $a98a2b9392e1c624$var$modalDialog = false;
let $a98a2b9392e1c624$var$webclientOrigin;
let $a98a2b9392e1c624$var$trustedOrigin;
let $a98a2b9392e1c624$var$onInitCallback = ()=>{};
let $a98a2b9392e1c624$var$onUpdateCallback = ()=>{};
let $a98a2b9392e1c624$var$onUpdateCallbackRegistered = false;
/**
 * Registers an onInit callback which is executed once the dashlet is initialized.
 *
 * @param {Function} callback
 * @param {string} allowedOrigin origin which is allowed to send and receive messages. Should be the webclient uri.
 * Use "*" to allow every target origin. Example: https://enaio.company-name.de.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */ function $a98a2b9392e1c624$export$8f1480d0136598a3(callback, allowedOrigin) {
    $a98a2b9392e1c624$var$onInitCallback = callback;
    $a98a2b9392e1c624$var$trustedOrigin = allowedOrigin;
}
/**
 * Registers an onUpdate callback which is executed if something changes in the client.
 *
 * @param {Function} callback The callback
 * @param {string} allowedOrigin origin which is allowed to send and receive messages. Should be the webclient uri.
 * Use "*" to allow every target origin. Example: https://enaio.company-name.de.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */ function $a98a2b9392e1c624$export$4172dbddf28736a3(callback, allowedOrigin) {
    if ($a98a2b9392e1c624$var$modalDialog) throw "Modal dialogs do not trigger a update event. Please do not register one.";
    else {
        $a98a2b9392e1c624$var$onUpdateCallbackRegistered = true;
        $a98a2b9392e1c624$var$onUpdateCallback = callback;
        $a98a2b9392e1c624$var$trustedOrigin = allowedOrigin;
    }
}
// Listen to "message" type events from web client.
window.addEventListener("message", $a98a2b9392e1c624$export$221b191fcfaf22a, false);
/**
 * A function responsible for processing all incoming "messages" from the enaio® webclient.
 *
 * @param event the object passed from the other Window i.e. enaio® webclient.
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#the_dispatched_event
 */ function $a98a2b9392e1c624$export$221b191fcfaf22a(event) {
    // Todo: Why global?
    $a98a2b9392e1c624$var$webclientOrigin = event.origin;
    /* Ensure "messages" come from a trusted source i.e. your own enaio® hosted domain.
       Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#security_concerns

       "srcOrigin" is the domain URL where enaio® webclient is served. Example: https://enaio.company-name.de
        Please note, in enaio desktop client, "srcOrigin" is represented as "file://" string.
    */ if ($a98a2b9392e1c624$var$trustedOrigin !== null && $a98a2b9392e1c624$var$trustedOrigin !== undefined && $a98a2b9392e1c624$var$trustedOrigin.length > 0 && $a98a2b9392e1c624$var$trustedOrigin !== "*") {
        // client uses electron webclient so override origin
        if ("file://" === $a98a2b9392e1c624$var$webclientOrigin) $a98a2b9392e1c624$var$trustedOrigin = "file://";
        const safeOrigin = $a98a2b9392e1c624$var$trustedOrigin === $a98a2b9392e1c624$var$webclientOrigin;
        if (safeOrigin === false) {
            console.log(`webclientOrigin ${$a98a2b9392e1c624$var$webclientOrigin} is different from srcOrigin ${$a98a2b9392e1c624$var$trustedOrigin}`);
            return false;
        }
    }
    // "handleWebclientMessage" is a handler function which further processes all incoming "messages" from enaio® webclient (see implementation details in the communication-library.js file).
    // Extract the "type" and "data" properties for further processing.
    // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const { type: type, data: data } = $a98a2b9392e1c624$var$handleWebclientMessage(event.data);
    delete data.dapi; // abstraction layer is taking care of it.
    if (type === "onInit") {
        $a98a2b9392e1c624$var$detectDashletModalDialog(data);
        // Do initialization work here.
        $a98a2b9392e1c624$var$onInitCallback(data);
    } else if (type === "onUpdate") // React to osid selection changes here.
    $a98a2b9392e1c624$var$onUpdateCallback(data);
    return true;
}
/**
 * Detect the kind of script which is running. There are normal dashlets and
 * modal dialogs. They differ in specific way, but we want to make it as smooth
 * to the developer as possible.
 *
 * @param data The init data structure from enaio® webclient.
 */ function $a98a2b9392e1c624$var$detectDashletModalDialog(data) {
    if (data.selectedEntry) {
        $a98a2b9392e1c624$var$modalDialog = true;
        if ($a98a2b9392e1c624$var$onUpdateCallbackRegistered) {
            // Unregister onUpdateCallback because it is not available and write a message to console.
            console.error("Modal dialogs do not trigger a update event. Please do not register one.");
            $a98a2b9392e1c624$var$onUpdateCallbackRegistered = false;
            $a98a2b9392e1c624$var$onUpdateCallback = ()=>{};
        }
    }
}
/**
 * A function that handles "messages" coming from the enaio® webclient.
 *
 * @param payload an object with { type, data } as payload.
 * @returns an object with the same shape as the input payload i.e. { type, data }
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/5.2+Kommunikation
 */ function $a98a2b9392e1c624$var$handleWebclientMessage(payload) {
    if (payload.msgId && $a98a2b9392e1c624$var$msgQueue[payload.msgId]) {
        if (payload.data.error !== undefined) $a98a2b9392e1c624$var$msgQueue[payload.msgId].reject(payload.data.error);
        else if (payload.data.result !== undefined) $a98a2b9392e1c624$var$msgQueue[payload.msgId].resolve(payload.data.result);
        else $a98a2b9392e1c624$var$msgQueue[payload.msgId].resolve();
        if ($a98a2b9392e1c624$var$alertQueue.includes(payload.msgId)) {
            // display payload info
            $a98a2b9392e1c624$var$alertQueue.splice($a98a2b9392e1c624$var$alertQueue.indexOf(payload.msgId), 1);
            alert(JSON.stringify(payload.data.result));
        }
        delete $a98a2b9392e1c624$var$msgQueue[payload.msgId];
    }
    return payload;
}
/**
 * A function responsible for sending "messages" to the enaio® webclient.
 * @param payload an array with ["method-name", [arguments]] as payload. Ref: https://help.optimal-systems.com/enaio_develop/display/WEB/5.4+Dashlet-Methoden
 * @param triggerAlert Boolean. If true, a browser alert (with payload results) will be displayed in the enaio® webclient.
 * @returns a JavaScript Promise. Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/5.2+Kommunikation
 */ async function $a98a2b9392e1c624$export$7980e63f750e794e(payload, triggerAlert = false) {
    const msgId = Math.random().toString(36).substr(2, 8);
    payload.push({
        msgId: msgId
    });
    if (triggerAlert) $a98a2b9392e1c624$var$alertQueue.push(msgId);
    let _resolve, _reject;
    const promise = new Promise((resolve, reject)=>{
        _resolve = resolve;
        _reject = reject;
    });
    $a98a2b9392e1c624$var$msgQueue[msgId] = {
        resolve: _resolve,
        reject: _reject
    };
    // "window" is the Dashlet's JavaScript Window object. Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window
    // "parent" is the enaio® webclient Window object.
    // postMessage" is the browser API used to communicate between enaio® webclient and the Dashlet. Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
    if ($a98a2b9392e1c624$var$trustedOrigin !== null && $a98a2b9392e1c624$var$trustedOrigin !== undefined && $a98a2b9392e1c624$var$trustedOrigin.length > 0) window.parent.postMessage(payload, $a98a2b9392e1c624$var$trustedOrigin);
    else window.parent.postMessage(payload, "*");
    return promise;
}
/**
 * Return true if we are running inside a modal dialog. If we are running inside a dashlet the return is false.
 */ function $a98a2b9392e1c624$export$cebb092bf393cc5() {
    return $a98a2b9392e1c624$var$modalDialog;
}
/**
 * This function is only for the unit-tests to reset the webclient library to its original state
 */ function $a98a2b9392e1c624$export$aad8462122ac592b() {
    $a98a2b9392e1c624$var$modalDialog = false;
    $a98a2b9392e1c624$var$onInitCallback = ()=>{};
    $a98a2b9392e1c624$var$onUpdateCallback = ()=>{};
    $a98a2b9392e1c624$var$onUpdateCallbackRegistered = false;
}


/**
 * This library manage the communication between dashlet and rich client.
 */ let $98f3c34ecca6b01b$var$onInitCallback = null;
let $98f3c34ecca6b01b$var$onUpdateCallback = null;
let $98f3c34ecca6b01b$var$dashletCache = null; // static data from rich client only one time for a dashlet
let $98f3c34ecca6b01b$var$modalDialog = false;
/**
 * Registers an onInit callback which is executed once the dashlet is initialized.
 *
 * @param {Function} callback
 */ function $98f3c34ecca6b01b$export$8f1480d0136598a3(callback) {
    $98f3c34ecca6b01b$var$onInitCallback = callback;
}
/**
 * Registers an onUpdate callback which is executed if something changes in the client.
 *
 * @param {Function} callback The callback
 */ function $98f3c34ecca6b01b$export$4172dbddf28736a3(callback) {
    if ($98f3c34ecca6b01b$var$modalDialog) throw "Modal dialogs does not trigger a update event. Please do not register one.";
    $98f3c34ecca6b01b$var$onUpdateCallback = callback;
}
/**
 * Providing only necessary information for this rich client dashlet example.
 * We are converting it to be like the webclient structure.
 *
 * @param {Object} data initialize data from the rich client.
 * @private
 */ async function $98f3c34ecca6b01b$var$internalOnInitUpdate(data) {
    if (data.selectedEntry) {
        if ($98f3c34ecca6b01b$var$onUpdateCallback != null) {
            // Unregister onUpdateCallback because it is not available and write a message to console.
            console.error("Modal dialogs does not trigger a update event. Please do not register one.");
            $98f3c34ecca6b01b$var$onUpdateCallback = null;
        }
        $98f3c34ecca6b01b$var$modalDialog = true;
        $98f3c34ecca6b01b$var$internalOnInitModalDialog(data);
    } else await $98f3c34ecca6b01b$var$internalOnInitUpdateDashlet(data);
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
 */ async function $98f3c34ecca6b01b$var$internalOnInitUpdateDashlet(data) {
    if ($98f3c34ecca6b01b$var$dashletCache === null) {
        $98f3c34ecca6b01b$var$dashletCache = {};
        $98f3c34ecca6b01b$var$dashletCache.dashletCaption = window.osClient.osjxGetDashletCaption();
        $98f3c34ecca6b01b$var$dashletCache.uri = window.osClient.osjxGetDashletURL();
        $98f3c34ecca6b01b$var$dashletCache.languageGuiSelected = window.osClient.osjxGetEnvironment(24) || "de";
        $98f3c34ecca6b01b$var$dashletCache.languageObjectDefinition = window.osClient.osjxGetEnvironment(33);
        $98f3c34ecca6b01b$var$dashletCache.wfOrgId = window.osClient.osjxGetEnvironment(19);
        $98f3c34ecca6b01b$var$dashletCache.mail = window.osClient.osjxGetEnvironment(16);
        $98f3c34ecca6b01b$var$dashletCache.username = window.osClient.osjxGetEnvironment(3);
        $98f3c34ecca6b01b$var$dashletCache.groups = window.osClient.osjxGetEnvironment(11);
        $98f3c34ecca6b01b$var$dashletCache.fullname = window.osClient.osjxGetEnvironment(14);
    }
    let selectedEntries = await $98f3c34ecca6b01b$var$getSelectedObjects();
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
        $98f3c34ecca6b01b$var$addObjectTypeAndMainType(selectedEntry);
        if (selectedEntry.objectId === data.objectident) lastObjectType = selectedEntry;
    }
    // get base url
    if (typeof location.origin === "undefined") location.origin = location.protocol + "//" + location.host;
    // map data for webClient structure
    const mappedData = {
        activeCustomDashlet: {
            objectTypes: null,
            platforms: null,
            uri: $98f3c34ecca6b01b$var$dashletCache.uri,
            title_DE: $98f3c34ecca6b01b$var$dashletCache.dashletCaption,
            title_EN: $98f3c34ecca6b01b$var$dashletCache.dashletCaption,
            title_FR: $98f3c34ecca6b01b$var$dashletCache.dashletCaption,
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
            language: $98f3c34ecca6b01b$var$dashletCache.languageGuiSelected.substring(0, 2),
            languageObjectDefinition: $98f3c34ecca6b01b$var$dashletCache.languageObjectDefinition.split("_")[0],
            sessionGuid: data.sessionguid,
            clientType: "rich_client",
            baseUrl: location.origin
        },
        userInfo: {
            email: $98f3c34ecca6b01b$var$dashletCache.mail,
            fullname: $98f3c34ecca6b01b$var$dashletCache.fullname,
            groups: $98f3c34ecca6b01b$var$dashletCache.groups.split(";"),
            name: $98f3c34ecca6b01b$var$dashletCache.username,
            osGuid: data.userguid,
            userId: data.userid,
            wfGuid: null,
            wfOrdId: $98f3c34ecca6b01b$var$dashletCache.wfOrgId
        },
        context: null
    };
    // execute registered events with mapped data.
    // onInitCallback is called once. Afterward we set it to null and then onUpdateCallback is called.
    if ($98f3c34ecca6b01b$var$onInitCallback != null) {
        $98f3c34ecca6b01b$var$onInitCallback(mappedData);
        $98f3c34ecca6b01b$var$onInitCallback = null;
    } else if ($98f3c34ecca6b01b$var$onUpdateCallback != null) $98f3c34ecca6b01b$var$onUpdateCallback(mappedData);
}
/**
 * Handle the onInit event for modal dialogs and call a callback function if one is registered.
 *
 * @param {Object} data initialize data from the rich client.
 * @private
 */ function $98f3c34ecca6b01b$var$internalOnInitModalDialog(data) {
    if ($98f3c34ecca6b01b$var$onInitCallback != null) {
        $98f3c34ecca6b01b$var$onInitCallback(data);
        $98f3c34ecca6b01b$var$onInitCallback = null;
    }
}
/**
 * Embed a function to the html file as the rich client looks up for a function
 * named osDashletInit in it. For this example we find that this is a clean solution
 * instead of placing it directly into the html file.
 *
 * @private
 */ function $98f3c34ecca6b01b$export$c6ba16edd0a0ecfe() {
    window.internalOnInitUpdate = $98f3c34ecca6b01b$var$internalOnInitUpdate;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerText = "function osDashletInit(data) { window.internalOnInitUpdate(data); } function onInit(data) { window.internalOnInitUpdate(data); }";
    document.getElementsByTagName("head")[0].appendChild(script);
}
/**
 * Call the method directly to register ourselves directly on the window object.
 * A addEventListener("load", registerOnInitUpdate); would be nicer, but it is too late.
 * Then we miss the rich client call which we want to intercept.
 */ $98f3c34ecca6b01b$export$c6ba16edd0a0ecfe();
/**
 * Entry method for sending commands to the rich client. The payload is the one for enaio web client.
 * It must be converted before sending it to rich client and the response must also be converted back.
 * This method is async even if the method is synchronous. It must be compatible to web client implementation.
 * and the web client is async an
 *
 * @param {*} payload web client format
 * @returns response in web client format
 */ async function $98f3c34ecca6b01b$export$1079770825fa94d6(payload) {
    switch(payload[0]){
        case "openIndexData":
            return $98f3c34ecca6b01b$var$openIndexData(payload);
        case "openLocation":
            return $98f3c34ecca6b01b$var$openLocation(payload);
        case "getSelectedObjects":
            return $98f3c34ecca6b01b$var$getSelectedObjects(payload);
        case "refreshHitListObjects":
            return $98f3c34ecca6b01b$var$refreshHitListObjects(payload);
        case "openHitListByIds":
            return $98f3c34ecca6b01b$var$openHitListByIds(payload);
        case "getFieldValueByInternal":
            return $98f3c34ecca6b01b$var$getFieldValueByInternal(payload);
        case "setFieldValueByInternal":
            return $98f3c34ecca6b01b$var$setFieldValueByInternal(payload);
        case "setWorkflowVariableByName":
            return $98f3c34ecca6b01b$var$setWorkflowVariableByName(payload);
        case "getEnvironment":
            return $98f3c34ecca6b01b$var$getEnvironment();
        case "closeModalDialog":
            return $98f3c34ecca6b01b$var$closeModalDialog(payload);
        case "setDialogCaption":
            return $98f3c34ecca6b01b$var$setDialogCaption(payload);
        case "getWorkflowVariableByName":
            return $98f3c34ecca6b01b$var$getWorkflowVariableByName(payload);
    }
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $98f3c34ecca6b01b$var$openLocation(payload) {
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
 */ async function $98f3c34ecca6b01b$var$openIndexData(payload) {
    // const inNewTab = payload[1][0]; // Only as reminder but not supported by the rich client.
    const osId = Number(payload[1][2]);
    const readonly = payload[1][1].toLowerCase() === "view";
    await window.osClient.osjxOpenDataSheet(osId, readonly);
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $98f3c34ecca6b01b$var$getSelectedObjects() {
    const selectedObjects = await window.osClient.osjxGetSelectedObjects();
    return selectedObjects.split(";").map((selectedObject)=>{
        const split = selectedObject.split(",");
        const retVal = {
            objectId: split[0],
            objectTypeId: split[1]
        };
        $98f3c34ecca6b01b$var$addObjectTypeAndMainType(retVal);
        return retVal;
    });
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $98f3c34ecca6b01b$var$refreshHitListObjects(payload) {
    for (const objectToRefresh of payload[1]){
        const osId = Number(objectToRefresh[0]);
        await window.osClient.osjxRefreshObjectInLists(osId);
    }
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $98f3c34ecca6b01b$var$openHitListByIds(payload) {
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
 */ async function $98f3c34ecca6b01b$var$getFieldValueByInternal(payload) {
    return JSON.parse(await window.osClient.getFieldValueByInternal(payload[1][0]));
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $98f3c34ecca6b01b$var$setFieldValueByInternal(payload) {
    return JSON.parse(await window.osClient.setFieldValueByInternal(payload[1][0]));
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $98f3c34ecca6b01b$var$setWorkflowVariableByName(payload) {
    return JSON.parse(await window.osClient.setWorkflowVariableByName(payload[1][0]));
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $98f3c34ecca6b01b$var$getEnvironment() {
    return JSON.parse(await window.osClient.getEnvironment());
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $98f3c34ecca6b01b$var$closeModalDialog(payload) {
    await window.osClient.closeModalDialog(payload[1][0]);
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $98f3c34ecca6b01b$var$setDialogCaption(payload) {
    return window.osClient.setDialogCaption(payload[1][0]);
}
/**
 * Documentation see communication-library.js
 *
 * @private
 */ async function $98f3c34ecca6b01b$var$getWorkflowVariableByName(payload) {
    return JSON.parse(await window.osClient.getWorkflowVariableByName(payload[1][0]));
}
/**
 * Calculate the mainType and objectType from objectTypeId and add the properties to the
 * hand in object.
 *
 * @param selectedObject The object to extend
 */ function $98f3c34ecca6b01b$var$addObjectTypeAndMainType(selectedObject) {
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
 */ function $98f3c34ecca6b01b$export$cebb092bf393cc5() {
    return $98f3c34ecca6b01b$var$modalDialog;
}
/**
 * This function is only for the unit-tests to reset the rich client library to its original state
 */ function $98f3c34ecca6b01b$export$aad8462122ac592b() {
    $98f3c34ecca6b01b$var$modalDialog = false;
    $98f3c34ecca6b01b$var$onInitCallback = ()=>{};
    $98f3c34ecca6b01b$var$onUpdateCallback = ()=>{};
    $98f3c34ecca6b01b$var$dashletCache = null;
    delete window.osClient;
}


const $5bfac67df813e95a$var$version = "2.0.2-rc4";
/**
 * Registers an onInit callback which is executed once the dashlet is initialized.
 * 
 * @param {Function} onInitCallback The callback
 * @param {string} trustedOrigin origin which is allowed to send and receive messages. Should be the webclient uri.
 * Use "*" to allow every target origin. Example: https://enaio.company-name.de.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */ function $5bfac67df813e95a$export$8f1480d0136598a3(onInitCallback, trustedOrigin = "*") {
    console.log(`Current Communication library version number: ${$5bfac67df813e95a$var$version}`);
    if (window.osClient) $98f3c34ecca6b01b$export$8f1480d0136598a3(onInitCallback);
    else $a98a2b9392e1c624$export$8f1480d0136598a3(onInitCallback, trustedOrigin);
}
/**
 * Registers an onUpdate callback which is executed if something changes in the client.
 * 
 * @param {Function} onUpdateCallback The callback
 * @param {string} trustedOrigin origin which is allowed to send and receive messages. Should be the webclient uri.
 * Use "*" to allow every target origin. Example: https://enaio.company-name.de.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */ function $5bfac67df813e95a$export$4172dbddf28736a3(onUpdateCallback, trustedOrigin = "*") {
    if (window.osClient) $98f3c34ecca6b01b$export$4172dbddf28736a3(onUpdateCallback);
    else $a98a2b9392e1c624$export$4172dbddf28736a3(onUpdateCallback, trustedOrigin);
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
 */ async function $5bfac67df813e95a$export$c80888c0f1760f07(inNewTab, mode, objectId, objectTypeId) {
    if ($5bfac67df813e95a$export$cebb092bf393cc5()) throw "Not implemented for modal dialog";
    return $5bfac67df813e95a$var$sendClientMessage([
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
 */ async function $5bfac67df813e95a$export$47c4a703efa8e61e(inNewTab, objectId, objectTypeId, parentId, parentTypeId) {
    if ($5bfac67df813e95a$export$cebb092bf393cc5()) throw "Not implemented for modal dialog";
    await $5bfac67df813e95a$var$sendClientMessage([
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
 */ async function $5bfac67df813e95a$export$96f907581d671890() {
    if ($5bfac67df813e95a$export$cebb092bf393cc5()) throw "Not implemented for modal dialog";
    return $5bfac67df813e95a$var$sendClientMessage([
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
 */ async function $5bfac67df813e95a$export$89d12ae34746cff2(osIds) {
    if ($5bfac67df813e95a$export$cebb092bf393cc5()) throw "Not implemented for modal dialog";
    await $5bfac67df813e95a$var$sendClientMessage([
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
 */ async function $5bfac67df813e95a$export$5b5fa3829992783b(objects, inNewTab = false, title = "", subTitle = "", executeSingleHitAction = false) {
    if ($5bfac67df813e95a$export$cebb092bf393cc5()) throw "Not implemented for modal dialog";
    await $5bfac67df813e95a$var$sendClientMessage([
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
 */ async function $5bfac67df813e95a$export$468316c75afcb0f3(json) {
    if (!$5bfac67df813e95a$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
    return $5bfac67df813e95a$var$sendClientMessage([
        "getFieldValueByInternal",
        [
            $5bfac67df813e95a$var$jsonObjectToString(json)
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
 */ async function $5bfac67df813e95a$export$b3ed74af647c74bd(json) {
    if (!$5bfac67df813e95a$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
    return $5bfac67df813e95a$var$sendClientMessage([
        "getWorkflowVariableByName",
        [
            $5bfac67df813e95a$var$jsonObjectToString(json)
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
 */ async function $5bfac67df813e95a$export$50c2e2f825ad7b4b(json) {
    if (!$5bfac67df813e95a$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
    return $5bfac67df813e95a$var$sendClientMessage([
        "setFieldValueByInternal",
        [
            $5bfac67df813e95a$var$jsonObjectToString(json)
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
 */ async function $5bfac67df813e95a$export$23c49f97b8cbcd5b(json) {
    if (!$5bfac67df813e95a$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
    return $5bfac67df813e95a$var$sendClientMessage([
        "setWorkflowVariableByName",
        [
            $5bfac67df813e95a$var$jsonObjectToString(json)
        ]
    ]);
}
/**
 * Return the environment values from the client.
 *
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/getEnvironment
 * @returns The environment values from the client.
 */ async function $5bfac67df813e95a$export$57570b1603cf6adb() {
    if (!$5bfac67df813e95a$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
    return $5bfac67df813e95a$var$sendClientMessage([
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
 */ function $5bfac67df813e95a$export$74da6a16c6928c4d(newDialogCaption = "") {
    if (!$5bfac67df813e95a$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
    return $5bfac67df813e95a$var$sendClientMessage([
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
 */ async function $5bfac67df813e95a$export$f290980283620b4a(buttonScriptReturnValue) {
    if (!$5bfac67df813e95a$export$cebb092bf393cc5()) throw "Not implemented for dashlets";
    return $5bfac67df813e95a$var$sendClientMessage([
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
 */ async function $5bfac67df813e95a$var$sendClientMessage(payload) {
    try {
        if (window.osClient) return $98f3c34ecca6b01b$export$1079770825fa94d6(payload);
        return $a98a2b9392e1c624$export$7980e63f750e794e(payload);
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
 */ function $5bfac67df813e95a$var$jsonObjectToString(jsonObject) {
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
 */ function $5bfac67df813e95a$export$cebb092bf393cc5() {
    if (window.osClient) return $98f3c34ecca6b01b$export$cebb092bf393cc5();
    return $a98a2b9392e1c624$export$cebb092bf393cc5();
}
// This will store the value for the onCanCancel behavior.
// It's initialized to a default value to ensure it's always callable.
let $5bfac67df813e95a$var$onCanCancelValue = 1;
/**
 * Registers the callback for the ESC key event.
 *
 * @param {Function} valueFunction - A function that returns the current value for the callback.
 */ function $5bfac67df813e95a$export$e12a024d8ae2e5c(valueFunction) {
    return new Promise((resolve, reject)=>{
        // Delay is necessary to ensure the availability of the function.
        setTimeout(()=>{
            if (!$5bfac67df813e95a$export$cebb092bf393cc5()) reject("Not implemented for dashlets");
            else {
                // We assign the function passed from main.js to onCanCancelValue.
                // This allows the function to be updated dynamically from main.js.
                $5bfac67df813e95a$var$onCanCancelValue = valueFunction;
                resolve();
            }
        }, 1000);
    });
}
// Event listener for the ESC key.
window.addEventListener("keydown", function(event) {
    // Check if the ESC key was pressed, and the modal dialog is active.
    if (event.key === "Escape" && !window.osClient && $5bfac67df813e95a$export$cebb092bf393cc5()) {
        // Retrieve the current onCanCancelValue by calling the function.
        const currentValue = typeof $5bfac67df813e95a$var$onCanCancelValue == "function" ? $5bfac67df813e95a$var$onCanCancelValue() : $5bfac67df813e95a$var$onCanCancelValue;
        // If the value is not 2, we close the modal dialog.
        if (currentValue !== 2) $5bfac67df813e95a$export$f290980283620b4a(currentValue);
        else console.warn("ESC key event is disabled.");
    }
});
const $5bfac67df813e95a$var$CommunicationLibrary = {
    registerOnInitCallback: // Event Callbacks
    $5bfac67df813e95a$export$8f1480d0136598a3,
    registerOnUpdateCallback: $5bfac67df813e95a$export$4172dbddf28736a3,
    registerOnCanCancelCallback: $5bfac67df813e95a$export$e12a024d8ae2e5c,
    openIndexData: // Methods Dashlets
    $5bfac67df813e95a$export$c80888c0f1760f07,
    openLocation: $5bfac67df813e95a$export$47c4a703efa8e61e,
    getSelectedObjects: $5bfac67df813e95a$export$96f907581d671890,
    refreshHitListObjects: $5bfac67df813e95a$export$89d12ae34746cff2,
    openHitListByIds: $5bfac67df813e95a$export$5b5fa3829992783b,
    closeModalDialog: $5bfac67df813e95a$export$f290980283620b4a,
    getFieldValueByInternal: // Methods modal dialogs
    $5bfac67df813e95a$export$468316c75afcb0f3,
    setFieldValueByInternal: $5bfac67df813e95a$export$50c2e2f825ad7b4b,
    getEnvironment: $5bfac67df813e95a$export$57570b1603cf6adb,
    setDialogCaption: $5bfac67df813e95a$export$74da6a16c6928c4d,
    getWorkflowVariableByName: // Methods for Workflows
    $5bfac67df813e95a$export$b3ed74af647c74bd,
    isModalDialog: // export for unit tests
    $5bfac67df813e95a$export$cebb092bf393cc5
};
var $5bfac67df813e95a$export$2e2bcd8739ae039 = $5bfac67df813e95a$var$CommunicationLibrary;


export {$5bfac67df813e95a$export$8f1480d0136598a3 as registerOnInitCallback, $5bfac67df813e95a$export$4172dbddf28736a3 as registerOnUpdateCallback, $5bfac67df813e95a$export$c80888c0f1760f07 as openIndexData, $5bfac67df813e95a$export$cebb092bf393cc5 as isModalDialog, $5bfac67df813e95a$export$47c4a703efa8e61e as openLocation, $5bfac67df813e95a$export$96f907581d671890 as getSelectedObjects, $5bfac67df813e95a$export$89d12ae34746cff2 as refreshHitListObjects, $5bfac67df813e95a$export$5b5fa3829992783b as openHitListByIds, $5bfac67df813e95a$export$468316c75afcb0f3 as getFieldValueByInternal, $5bfac67df813e95a$export$b3ed74af647c74bd as getWorkflowVariableByName, $5bfac67df813e95a$export$50c2e2f825ad7b4b as setFieldValueByInternal, $5bfac67df813e95a$export$23c49f97b8cbcd5b as setWorkflowVariableByName, $5bfac67df813e95a$export$57570b1603cf6adb as getEnvironment, $5bfac67df813e95a$export$74da6a16c6928c4d as setDialogCaption, $5bfac67df813e95a$export$f290980283620b4a as closeModalDialog, $5bfac67df813e95a$export$e12a024d8ae2e5c as registerOnCanCancelCallback, $5bfac67df813e95a$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=module.js.map
