/**
 * This library manage the communication between dashlet and rich client.
 */
let onInitCallback = null;
let onUpdateCallback = null;
let dashletCache = null; // static data from rich client only one time for a dashlet
let modalDialog = false;

/**
 * Registers an onInit callback which is executed once the dashlet is initialized.
 *
 * @param {Function} callback
 */
function registerOnInitCallback(callback) {
    onInitCallback = callback;
}

/**
 * Registers an onUpdate callback which is executed if something changes in the client.
 *
 * @param {Function} callback The callback
 */
function registerOnUpdateCallback(callback) {
	if (modalDialog) {
		throw "Modal dialogs does not trigger a update event. Please do not register one.";
	}
	
    onUpdateCallback = callback;
}

/**
 * Providing only necessary information for this rich client dashlet example.
 * We are converting it to be like the webclient structure.
 *
 * @param {Object} data initialize data from the rich client.
 * @private
 */
async function internalOnInitUpdate(data) {
	if (data.selectedEntry) {
		if (onUpdateCallback != null) {
			// Unregister onUpdateCallback because it is not available and write a message to console.
			console.error("Modal dialogs does not trigger a update event. Please do not register one.");
			onUpdateCallback = null;
		}
		
		modalDialog = true;
		internalOnInitModalDialog(data);
	} else {
		await internalOnInitUpdateDashlet(data);
	}
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
 */
async function internalOnInitUpdateDashlet(data) {
	if (dashletCache === null) {
        dashletCache = {};
        dashletCache.dashletCaption = window.osClient.osjxGetDashletCaption();
        dashletCache.uri = window.osClient.osjxGetDashletURL();
        dashletCache.languageGuiSelected = window.osClient.osjxGetEnvironment(35);
        dashletCache.languageObjectDefinition = window.osClient.osjxGetEnvironment(33);
        dashletCache.wfOrgId = window.osClient.osjxGetEnvironment(19);
        dashletCache.mail = window.osClient.osjxGetEnvironment(16);
        dashletCache.username = window.osClient.osjxGetEnvironment(3);
        dashletCache.groups = window.osClient.osjxGetEnvironment(11);
        dashletCache.fullname = window.osClient.osjxGetEnvironment(14);
    }

    const selectedEntries = await getSelectedObjects();

    // get base url
    if (typeof location.origin === 'undefined') {
        location.origin = location.protocol + '//' + location.host;
    }

    // map data for webClient structure
    const mappedData= {
        activeCustomDashlet: {
            objectTypes: null, // no information from enaio rich client
            platforms: null, // no information from enaio rich client
            uri: dashletCache.uri,
            title_DE: dashletCache.dashletCaption,
            title_EN: dashletCache.dashletCaption,
            title_FR: dashletCache.dashletCaption,
            iconId: null, // no information from enaio rich client
            users: null, // no information from enaio rich client
            groups: null, // no information from enaio rich client
        },
        lastSelectedEntry: {
            hasVariants: null, // no information from enaio rich client
            mainType: null, // no information from enaio rich client
            objectTypeId: data.objecttype,
            osid: data.objectident,
            objectType: null // no information from enaio rich client
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
        selectedEntries: selectedEntries
            .map(f => ({osid: f.objectId, objectTypeId: f.objectTypeId})),
        sessionInfo: {
            language: dashletCache.languageGuiSelected.substring(0, 2), // only "fr" instead of "fra"
            languageObjectDefinition: dashletCache.languageObjectDefinition.split("_")[0], // only "de" instead of "de_DE"
            sessionGuid: data.sessionguid,
            clientType: "rich_client",
            baseUrl: location.origin
        },
        userInfo: {
            email: dashletCache.mail,
            fullname: dashletCache.fullname,
            groups: dashletCache.groups.split(";"),
            name: dashletCache.username,
            osGuid: data.userguid,
            userId: data.userid,
            wfGuid: null, // no information from enaio rich client
            wfOrdId: dashletCache.wfOrgId
        },
        context: null
    }

    // execute registered events with mapped data.
	// onInitCallback is called once. Afterward we set it to null and then onUpdateCallback is called.
    if (onInitCallback != null) {
        onInitCallback(mappedData);
        onInitCallback = null;
    } else if (onUpdateCallback != null) {
        onUpdateCallback(mappedData);
    }
}

/**
 * Handle the onInit event for modal dialogs and call a callback function if one is registered.
 *
 * @param {Object} data initialize data from the rich client.
 * @private
 */
function internalOnInitModalDialog(data) {
	if (onInitCallback != null) {
        onInitCallback(data);
        onInitCallback = null;
	}
}

/**
 * Embed a function to the html file as the rich client looks up for a function
 * named osDashletInit in it. For this example we find that this is a clean solution
 * instead of placing it directly into the html file.
 *
 * @private
 */
function registerOnInitUpdate() {
    window.internalOnInitUpdate = internalOnInitUpdate;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerText = "function osDashletInit(data) { window.internalOnInitUpdate(data); } function onInit(data) { window.internalOnInitUpdate(data); }";

    document.getElementsByTagName('head')[0].appendChild(script);
}

/**
 * Call the method directly to register ourselves directly on the window object.
 * A addEventListener("load", registerOnInitUpdate); would be nicer, but it is too late.
 * Then we miss the rich client call which we want to intercept.
 */
registerOnInitUpdate();

/**
 * Entry method for sending commands to the rich client. The payload is the one for enaio web client.
 * It must be converted before sending it to rich client and the response must also be converted back.
 * This method is async even if the method is synchronous. It must be compatible to web client implementation.
 * and the web client is async an
 *
 * @param {*} payload web client format
 * @returns response in web client format
 */
async function sendToRichClient(payload) {
    switch (payload[0]) {
        case "openIndexData": 			return openIndexData(payload);
        case "openLocation":  			return openLocation(payload);
        case "getSelectedObjects":		return getSelectedObjects(payload);
        case "refreshHitListObjects": 	return refreshHitListObjects(payload);
        case "openHitListByIds":      	return openHitListByIds(payload);
        case "getFieldValueByInternal": return getFieldValueByInternal(payload);
		case "setFieldValueByInternal": return setFieldValueByInternal(payload);
		case "getEnvironment":			return getEnvironment();
        case "closeModalDialog":        return closeModalDialog(payload);
    }
}

/**
 * Documentation see library.js
 *
 * @private
 */
async function openLocation(payload) {
    // const inNewTab = payload[1][0]; // Only as reminder but not supported by the rich client.
    const osId = Number(payload[1][1]);
    const objectTypeId = Number(payload[1][2]);

    if ((objectTypeId >>> 16) === 0) {
        await window.osClient.osjxOpenObject(osId);
    } else {
        await window.osClient.osjxOpenLocation(osId);
    }
}

/**
 * Documentation see library.js
 *
 * @private
 */
async function openIndexData(payload) {
    // const inNewTab = payload[1][0]; // Only as reminder but not supported by the rich client.
    const osId = Number(payload[1][2]);
    const readonly = payload[1][1].toLowerCase() === "view";

    await window.osClient.osjxOpenDataSheet(osId, readonly);
}

/**
 * Documentation see library.js
 *
 * @private
 */
async function getSelectedObjects() {
    const selectedObjects = await window.osClient.osjxGetSelectedObjects();
    return selectedObjects
        .split(";")
        .map(f => ({
            objectId: f.split(",")[0],
            objectTypeId: f.split(",")[1]
        }));
}

/**
 * Documentation see library.js
 *
 * @private
 */
async function refreshHitListObjects(payload) {
    for (const objectToRefresh of payload[1]) {
        const osId = Number(objectToRefresh[0]);
        await window.osClient.osjxRefreshObjectInLists(osId);
    }
}

/**
 * Documentation see library.js
 *
 * @private
 */
async function openHitListByIds(payload) {
    const ids = payload[1].objects;
    const title = payload[1].title.length === 0 ? "Gemischte Trefferliste" : payload[1].title;

    const request = {
        title,
        hits: ids.map(f => ({id: f.objectId, type: f.objectTypeId}))
    };

    await window.osClient.osjxOpenResultList(JSON.stringify(request));
}

/**
 * Documentation see library.js
 *
 * @private
 */
async function getFieldValueByInternal(payload) {
	return JSON.parse(await window.osClient.getFieldValueByInternal(payload[1][0]));
}

/**
 * Documentation see library.js
 *
 * @private
 */
async function setFieldValueByInternal(payload) {
	return JSON.parse(await window.osClient.setFieldValueByInternal(payload[1][0]));
}

/**
 * Documentation see library.js
 *
 * @private
 */
async function getEnvironment() {
	return JSON.parse(await window.osClient.getEnvironment());
}

/**
 * Documentation see library.js
 *
 * @private
 */
async function closeModalDialog(payload) {
    await window.osClient.closeModalDialog(payload[1][0]);
}

/**
 * Return true if we are running inside a modal dialog. If we are running inside a dashlet the return is false.
 */
function isModalDialog() {
    return modalDialog;
}

/**
 * This function is only for the unit-tests to reset the rich client library to its original state
 */
function reset() {
    modalDialog = false;
    onInitCallback = () => {};
    onUpdateCallback = () => {};
    dashletCache = null;

    delete window.osClient;
}

// Export functions to be used in other JavaScript files.
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
export {
	registerOnInitCallback, 
	registerOnUpdateCallback, 
	sendToRichClient,
	isModalDialog,

    // Only for Unit-Tests
    registerOnInitUpdate,	
    reset
};
