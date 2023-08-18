/**
 * This library manage the communication between dashlet and rich client.
 */
let onInitCallback = null;
let onUpdateCallback = null;
let onInitUpdateRegistered = false;
let cache = null; // load static data from richclient only one time

/**
 * Registers an onInit callback which is executed once the dashlet is initialized.
 *
 * @param {Function} callback
 */
function registerOnInitCallback(callback) {
    onInitCallback = callback;
    registerOnInitUpdate();
}

/**
 * Registers an onUpdate callback which is executed if something changes in the client.
 *
 * @param {Function} callback The callback
 */
function registerOnUpdateCallback(callback) {
    onUpdateCallback = callback;
    registerOnInitUpdate();
}

/**
 * Providing only necessary information for this richclient dashlet example.
 * We are converting it to be like the webclient structure.
 */
async function internalOnInitUpdate(data) {
    if (cache === null) {
        cache = {};
        cache.dashletCaption = window.osClient.osjxGetDashletCaption();
        cache.uri = window.osClient.osjxGetDashletURL();
        cache.languageGuiSelected = window.osClient.osjxGetEnvironment(24);
        cache.languageObjectDefinition = window.osClient.osjxGetEnvironment(33);
        cache.wfOrgId = window.osClient.osjxGetEnvironment(19);
        cache.mail = window.osClient.osjxGetEnvironment(16);
        cache.username = window.osClient.osjxGetEnvironment(3);
        cache.groups = window.osClient.osjxGetEnvironment(11);
    }

    const selectedEntries = await getSelectedObjects();

    // get base url
    if (typeof location.origin === 'undefined') {
        location.origin = location.protocol + '//' + location.host;
    }

    // map data for webClient structure
    const mappedData = {
        activeCustomDashlet: {
            objectTypes: null, // no information from enaio richclient
            platforms: null, // no information from enaio richclient
            uri: cache.uri,
            title_DE: cache.dashletCaption,
            title_EN: cache.dashletCaption,
            title_FR: cache.dashletCaption,
            iconId: null, // no information from enaio richclient
            users: null, // no information from enaio richclient
            groups: null, // no information from enaio richclient
        },
        lastSelectedEntry: {
            hasVariants: null, // no information from enaio richclient
            mainType: null, // no information from enaio richclient
            objectTypeId: data.objecttype,
            osid: data.objectident,
            objectType: null // no information from enaio richclient
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
            language: cache.languageGuiSelected.substring(0, 2), // only "fr" instead of "fra"
            languageObjectDefinition: cache.languageObjectDefinition.split("_")[0], // only "de" instead of "de_DE"
            sessionGuid: data.sessionguid,
            clientType: "rich_client",
            baseUrl: location.origin
        },
        userInfo: {
            email: cache.mail,
            fullname: cache.fullname,
            groups: cache.groups.split(";"),
            name: cache.username,
            osGuid: data.userguid,
            userId: data.userid,
            wfGuid: null, // no information from enaio richclient
            wfOrdId: cache.wfOrgId
        },
        context: null
    }

    // execute registered events with mapped data.
	// onInitCallback is called once. Afterwards we set it to null and then onUpdateCallback is called.
    if (onInitCallback != null) {
        onInitCallback(mappedData);
        onInitCallback = null;
    } else if (onUpdateCallback != null) {
        onUpdateCallback(mappedData);
    }

    // display payload info
    const selectedObjectsHTMLElement = document.getElementById("selectedObjects");
    selectedObjectsHTMLElement.innerHTML = `${JSON.stringify(selectedEntries)}`;
}

/**
 * Embed a function to the html file as the richclient looks up for a function
 * named osDashletInit in it.
 * For this example we find that this is a clean solution instead of placing it
 * directly into the html file.
 */
function registerOnInitUpdate() {
    if (onInitUpdateRegistered === false) {
        window.internalOnInitUpdate = internalOnInitUpdate;

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerText = "function osDashletInit(data) { window.internalOnInitUpdate(data); }";

        document.getElementsByTagName('head')[0].appendChild(script);

        onInitUpdateRegistered = true;
    }
}

/**
 * Entry method for sending commands to the rich client. The payload is the one for enaio web client.
 * It must be converted before sending it to rich client and the response must also be converted back.
 * This method is async even if the method is synchronus. It must be compatible to web client implementation.
 * and the web client is async an
 *
 * @param {*} payload web client format
 * @returns response in web client format
 */
async function sendToRichClient(payload) {
    switch (payload[0]) {
        case "openIndexData":
            return openIndexData(payload);
        case "openLocation":
            return openLocation(payload);
        case "getSelectedObjects":
            return getSelectedObjects(payload);
        case "refreshHitListObjects":
            return refreshHitListObjects(payload);
        case "openHitListByIds":
            return openHitListByIds(payload);
    }
}

async function openLocation(payload) {
    // const inNewTab = payload[1][0];
    const osid = Number(payload[1][1]);

    await window.osClient.osjxOpenLocation(osid);
}

async function openIndexData(payload) {
    // const inNewTab = payload[1][0];
    const osid = Number(payload[1][2]);
    const readonly = payload[1][1].toLowerCase() === "view";

    await window.osClient.osjxOpenDataSheet(osid, readonly);
}

async function getSelectedObjects() {
    const selectedObjects = await window.osClient.osjxGetSelectedObjects();
    return selectedObjects
        .split(";")
        .map(f => ({
            objectId: f.split(",")[0],
            objectTypeId: f.split(",")[1]
        }));
}

async function refreshHitListObjects(payload) {
    const osid = Number(payload[1][0][0]); // we can only send 1 id

    await window.osClient.osjxRefreshObjectInLists(osid);
}

async function openHitListByIds(payload) {
    const ids = payload[1].objects;
    const title = payload[1].title.length === 0 ? "Gemischte Trefferliste" : payload[1].title;

    const request = {
        title,
        hits: ids.map(f => ({id: f.objectId, type: f.objectTypeId}))
    };

    await window.osClient.osjxOpenResultList(JSON.stringify(request));
}

// Export functions to be used in other JavaScript files.
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
export {registerOnInitCallback, registerOnUpdateCallback, sendToRichClient};