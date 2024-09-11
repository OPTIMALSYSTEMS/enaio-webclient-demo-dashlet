# enaio® Webclient Demo Modal Dialog Addon

## License

Copyright © 2023 OPTIMAL SYSTEMS GmbH

This software is licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0). Ensure you comply with the License when using this software. It's distributed without warranties or conditions, either express or implied. Consult the License specifics related to permissions and limitations.

## Documentation

For comprehensive details on developing and integrating custom modal dialogs into enaio® webclient, refer to our official [Modal Dialog API documentation](https://help.optimal-systems.com/enaio_develop/x/XQCxB).

## Introduction

Starting from version 11.10 FINAL, enaio® webclient has introduced the ability to open bespoke and fully designable modal dialogs. These dialogs enable the integration of external webpages hosted under the same hostname and facilitate seamless interaction through an API for data exchange. Explore the [documentation](https://help.optimal-systems.com/enaio_develop/x/ZwCxB) for more details.

Utilize the formHelper method "openModalDialog" to launch a custom modal dialog. Provide the URL, and optionally its title and size, as parameters. The modal dialogs support comprehensive interaction via API, covering various methods and events for a dynamic and flexible user experience.

To bridge communication between a modal dialog and the enaio® webclient, we offer the Modal Dialog API. It's enriched with special events and methods that enhance information exchange and interaction.

## Abstraction Library for Dashlet Communication (new)

Abstraction Library is a critical component of this project designed to facilitate seamless communication between the modal dialog and both the enaio® webclient and enaio® richclient. This library, available as an npm package accessible [here](https://www.npmjs.com/package/@enaio-client/communication-library), serves as a foundational bridge, enhancing interaction between the modal dialog and the enaio® platforms.

### Purpose

The Abstraction Library is primarily intended to simplify and streamline the process of communication between the modal dialog  and both the enaio® webclient and enaio® richclient. By adopting this library, the integration of the modal dialog  into both platforms becomes a cohesive and straightforward endeavor, all while maintaining a unified codebase.

## Events

In the enaio® webclient, modal dialogs interact with the main application through a series of events, facilitating a dynamic and responsive user experience. The key events include:

- **onInit**: Activated as soon as the modal dialog becomes visible to the user, this event allows the dialog to initialize itself with context-specific information, ensuring a seamless integration at runtime. Find out more in the [onInit event documentation](https://help.optimal-systems.com/enaio_develop/x/cQCxB).
  
- **onCanCancel**: This event enables the modal dialog to handle cancellation actions, such as when a user presses the ESC key. It's crucial for implementing conditional logic that determines whether the dialog can be closed based on the current state or other criteria. Learn more about it in the [onCanCancel event documentation](https://help.optimal-systems.com/enaio_develop/x/-oCiBQ).

## Methods

The enaio® webclient provides a comprehensive set of API methods for modal dialogs, allowing for intricate interactions and data exchange between the dialog and the webclient. These methods include:

- **getEnvironment()**: Offers a snapshot of the current environmental settings within the enaio® webclient, such as user details and language preferences, empowering the modal dialog with context-aware capabilities. Access the method's [documentation here](https://help.optimal-systems.com/enaio_develop/x/QYAHBQ).

- **getFieldValueByInternal(internalFieldName)**: Facilitates the retrieval of specific field values from the active index data screen, enabling modal dialogs to access and display relevant data dynamically. Dive into the specifics in the [getFieldValueByInternal method documentation](https://help.optimal-systems.com/enaio_develop/x/dwCxB).

- **setFieldValueByInternal(internalFieldName, value)**: This method allows the modal dialog to update field values on the active index data screen, making it possible to alter index data directly from the dialog. Detailed information can be found in the [setFieldValueByInternal method documentation](https://help.optimal-systems.com/enaio_develop/x/IIAHBQ).

- **closeModalDialog(value)**: Defines the action to close the modal dialog, optionally performing additional tasks upon closure. This method is essential for ending the dialog session in a controlled manner. More details are available in the [closeModalDialog method documentation](https://help.optimal-systems.com/enaio_develop/x/CYA9BQ).

- **setDialogCaption(value)**: Adjusts the title of the modal dialog dynamically at runtime, offering flexibility in how the dialog is presented to the user based on the current context or user actions. Read more about this method in the [setDialogCaption method documentation](https://help.optimal-systems.com/enaio_develop/x/QYGiBQ).

- **getWorkflowVariableByName(name)**: Enables the modal dialog to query and retrieve data from specific workflow mask variables, facilitating a deeper integration with the underlying business processes. For further details, refer to the [getWorkflowVariableByName method documentation](https://help.optimal-systems.com/enaio_develop/x/o4OiBQ).

- **setWorkflowVariableByName(nameOfTheWorkflowVariable, valueForTheWorkflowVariable)**: Enables values to be written to workflow variables for the current workflow activity and therefore also to the respective linked field on the workflow screen, refer to the [setWorkflowVariableByName method documentation](https://help.optimal-systems.com/enaio_develop/display/WEB/setWorkflowVariableByName).


## Installation

1. **Clone the Repository**
    ```sh
    git clone https://github.com/OPTIMALSYSTEMS/enaio-webclient-demo-modal-dialog-addon.git
    ```

2. **Navigate to the Project Directory**
    ```sh
    cd enaio-webclient-demo-modal-dialog-addon
    ```

3. **Install Necessary Packages**
    ```sh
    npm install
    ```
4. **Start The Project**
    ```sh
    npm start
    ```
Voilà! You're primed to launch the project.