/**
 * This library manage the communication between dashlet and web client.
 */
const msgQueue = {};
const alertQueue = [];

let modalDialog = false;

let webclientOrigin;
let trustedOrigin;

let onInitCallback = () => {};
let onUpdateCallback = () => {};
let onUpdateCallbackRegistered = false;

/**
 * Registers an onInit callback which is executed once the dashlet is initialized.
 *
 * @param {Function} callback
 * @param {string} allowedOrigin origin which is allowed to send and receive messages. Should be the webclient uri.
 * Use "*" to allow every target origin. Example: https://enaio.company-name.de.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */
function registerOnInitCallback(callback, allowedOrigin) {
    onInitCallback = callback;
    trustedOrigin = allowedOrigin;
}

/**
 * Registers an onUpdate callback which is executed if something changes in the client.
 *
 * @param {Function} callback The callback
 * @param {string} allowedOrigin origin which is allowed to send and receive messages. Should be the webclient uri.
 * Use "*" to allow every target origin. Example: https://enaio.company-name.de.
 * Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 */
function registerOnUpdateCallback(callback, allowedOrigin) {
	if (modalDialog) {
		throw "Modal dialogs do not trigger a update event. Please do not register one.";
	} else {
		onUpdateCallbackRegistered = true;
		onUpdateCallback = callback;
		trustedOrigin = allowedOrigin;
	}
}

// Listen to "message" type events from web client.
window.addEventListener("message", handlePostMessage, false);

/**
 * A function responsible for processing all incoming "messages" from the enaio® webclient.
 *
 * @param event the object passed from the other Window i.e. enaio® webclient.
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#the_dispatched_event
 */
function handlePostMessage(event) {
    // Todo: Why global?
    webclientOrigin = event.origin;

    /* Ensure "messages" come from a trusted source i.e. your own enaio® hosted domain.
       Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#security_concerns

       "srcOrigin" is the domain URL where enaio® webclient is served. Example: https://enaio.company-name.de
        Please note, in enaio desktop client, "srcOrigin" is represented as "file://" string.
    */
    if (trustedOrigin !== null && trustedOrigin !== undefined && trustedOrigin.length > 0 && trustedOrigin !== "*") {
        // client uses electron webclient so override origin
        if ("file://" === webclientOrigin) {
            trustedOrigin = "file://";
        }

        const safeOrigin = trustedOrigin === webclientOrigin;
		
        if (safeOrigin === false) {
            console.log(`webclientOrigin ${webclientOrigin} is different from srcOrigin ${trustedOrigin}`);
            return false;
        }
    }

    // "handleWebclientMessage" is a handler function which further processes all incoming "messages" from enaio® webclient (see implementation details in the library.js file).
    // Extract the "type" and "data" properties for further processing.
    // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const {type, data} = handleWebclientMessage(event.data);
    delete data.dapi; // abstraction layer is taking care of it.

    if (type === "onInit") {
		detectDashletModalDialog(data);
        // Do initialization work here.
        onInitCallback(data);
    } else if (type === "onUpdate") {
        // React to osid selection changes here.
        onUpdateCallback(data);
    }

    return true;
}

/**
 * Detect the kind of script which is running. There are normal dashlets and
 * modal dialogs. They differ in specific way, but we want to make it as smooth
 * to the developer as possible.
 *
 * @param data The init data structure from enaio® webclient.
 */
function detectDashletModalDialog(data) {
	if (data.selectedEntry) {
		modalDialog = true;
		
		if (onUpdateCallbackRegistered) {
			// Unregister onUpdateCallback because it is not available and write a message to console.
			console.error("Modal dialogs do not trigger a update event. Please do not register one.");
			onUpdateCallbackRegistered = false;
			onUpdateCallback = () => {}
		}
	}
}

/**
 * A function that handles "messages" coming from the enaio® webclient.
 *
 * @param payload an object with { type, data } as payload.
 * @returns an object with the same shape as the input payload i.e. { type, data }
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/5.2+Kommunikation
 */
function handleWebclientMessage(payload) {
    if (payload.msgId && msgQueue[payload.msgId]) {
        if (payload.data.error !== undefined) {
            msgQueue[payload.msgId].reject(payload.data.error);
        } else if (payload.data.result !== undefined) {
            msgQueue[payload.msgId].resolve(payload.data.result);
        } else {
            msgQueue[payload.msgId].resolve();
        }

        if (alertQueue.includes(payload.msgId)) {
            // display payload info
			alertQueue.splice(alertQueue.indexOf(payload.msgId), 1);
            alert(JSON.stringify(payload.data.result));
        }

        delete msgQueue[payload.msgId];
    }

    return payload;
}

/**
 * A function responsible for sending "messages" to the enaio® webclient.
 * @param payload an array with ["method-name", [arguments]] as payload. Ref: https://help.optimal-systems.com/enaio_develop/display/WEB/5.4+Dashlet-Methoden
 * @param triggerAlert Boolean. If true, a browser alert (with payload results) will be displayed in the enaio® webclient.
 * @returns a JavaScript Promise. Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/5.2+Kommunikation
 */
async function sendWebclientMessage(payload, triggerAlert = false) {
    const msgId = Math.random().toString(36).substr(2, 8);
    payload.push({msgId});

    if (triggerAlert) {
        alertQueue.push(msgId);
    }

    let _resolve, _reject;
    const promise = new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
    });

    msgQueue[msgId] = {resolve: _resolve, reject: _reject};

    // "window" is the Dashlet's JavaScript Window object. Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window
    // "parent" is the enaio® webclient Window object.
    // postMessage" is the browser API used to communicate between enaio® webclient and the Dashlet. Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
    if (trustedOrigin !== null && trustedOrigin !== undefined && trustedOrigin.length > 0) {
        window.parent.postMessage(payload, trustedOrigin);
    } else {
        window.parent.postMessage(payload, "*");
    }
	
    return promise;
}

/**
 * Return true if we are running inside a modal dialog. If we are running inside a dashlet the return is false.
 */
function isModalDialog() {
	return modalDialog;
}

/**
 * This function is only for the unit-tests to reset the webclient library to its original state
 */
function reset() {
    modalDialog = false;
    onInitCallback = () => {};
    onUpdateCallback = () => {};
    onUpdateCallbackRegistered = false;
}

// Export functions to be used in other JavaScript files.
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
export {
	registerOnInitCallback, 
	registerOnUpdateCallback, 
	sendWebclientMessage,
	isModalDialog,

    // Only for Unit-Tests
    handlePostMessage,
    reset
};
