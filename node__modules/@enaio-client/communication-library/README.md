
# @enaio-client/communication-library

## Description
The Communication Library facilitates secure cross-origin communication between the enaio® webclient and dashlets/modal dialogs, using `window.postMessage()`. This library streamlines the process, ensuring compatibility with the enaio® client, and offers an effortless solution for managing `postMessage` communication, enhancing the usability and interoperability of your applications.

## Installation

### In a Node.js Project
```sh
npm install @enaio-client/communication-library
```

## Usage

In your main.js file:
```javascript
import * as lib from 'node_modules/@enaio-client/communication-library/dist/module.js';
```

**In later versions, support for the below will be added:**


### In a Node.js Environment
Import the library using CommonJS or ES6 module syntax:

**CommonJS:**
```javascript
const lib = require('@enaio-client/communication-library');
```

**ES6:**
```javascript
import * as lib from '@enaio-client/communication-library';
```

### In a Browser Environment
Access the library using the global variable defined in your build configuration:
```javascript
var lib = window.CommunicationLibrary;
```

## Examples

### Register Initialization Callback
```javascript
lib.registerOnInitCallback(onInit);

function onInit(data) {
  // Initialization logic here
}
```

### Open Index Data
```javascript
async function openIndexData() {
  try {
    await lib.openIndexData(false, 'edit', 'objectId');
  } catch (error) {
    console.error(error);
  }
}
```

## Building the Package
To build the package, run:
```sh
npm run build
```
This will generate a bundled file in the `dist` folder.

## Testing
To test the package, run:
```sh
npm test
```
This will execute tests defined in your `karma.conf.js` file.

## Repository
[Git Repository](https://git.optimal-systems.org/team-dodo/enaio-client-communication.git)

## Keywords
- optimal-systems
- enaio
- communication-library

## License
This project is licensed under the ISC License.