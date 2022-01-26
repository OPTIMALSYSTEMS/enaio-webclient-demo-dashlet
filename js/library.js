const msgQueue = {};
const alertQueue = [];

/**
 * A function that handles "messages" coming from the enaio® webclient.
 * @param payload an object with { type, data } as payload.
 * @returns an object with the same shape as the input payload i.e. { type, data }
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/5.2+Kommunikation
 */
function handleWebclientMessage(payload) {
  if (payload.type == "onUpdate" || payload.type == "onInit") {
    const selectedObjects = document.getElementById("selectedObjects");

    // display payload info
    selectedObjects.innerHTML = `${JSON.stringify(
      payload.data.selectedEntries.map((dmsInfo) => ({
        objectId: dmsInfo.osid,
        objectTypeId: dmsInfo.objectTypeId,
      }))
    )}`;
  }

  if (payload.msgId && msgQueue[payload.msgId]) {
    if (payload.data.result !== undefined) {
      msgQueue[payload.msgId].resolve(payload.data.result);
    } else if (payload.data.error !== undefined) {
      msgQueue[payload.msgId].reject(payload.data.error);
    }

    if (alertQueue.includes(payload.msgId)) {
      // display payload info
      const selectedObjectsContainer = document.getElementById(
        "selectedObjectsContainer"
      );

      selectedObjectsContainer.innerHTML = `${JSON.stringify(
        payload.data.result
      )}`;

      alertQueue.splice(alertQueue.indexOf(payload.msgId), 1);
    }

    delete msgQueue[payload.msgId];
  }

  return payload;
}

/**
 * A function responsible for sending "messages" to the enaio® webclient.
 * @param payload an array with ["method-name", [arguments]] as payload. Ref: https://help.optimal-systems.com/enaio_develop/display/WEB/5.4+Dashlet-Methoden
 * @param targetOrigin a string representing the domain URL where enaio® webclient is served. Example: https://enaio.company-name.de.
 * @param triggerAlert Boolean. If true, a browser alert (with payload results) will be displayed in the enaio® webclient.
 * @returns a JavaScript Promise. Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * @link https://help.optimal-systems.com/enaio_develop/display/WEB/5.2+Kommunikation
 */
async function sendWebclientMessage(
  payload,
  targetOrigin = "*",
  triggerAlert = false
) {
  const msgId = Math.random().toString(36).substr(2, 8);
  payload.push({ msgId });

  if (triggerAlert) {
    alertQueue.push(msgId);
  }

  let _resolve, _reject;
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });

  msgQueue[msgId] = { resolve: _resolve, reject: _reject };

  // "window" is the Dashlet's JavaScript Window object. Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window
  // "parent" is the enaio® webclient Window object.
  // postMessage" is the browser API used to communicate between enaio® webclient and the Dashlet. Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
  window.parent.postMessage(payload, targetOrigin);
  return promise;
}

// Export functions to be used in other JavaScript files.
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
export { handleWebclientMessage, sendWebclientMessage };
