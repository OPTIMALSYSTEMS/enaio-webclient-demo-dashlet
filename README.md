# enaio® webclient demo dashlet

## License

Copyright 2023 OPTIMAL SYSTEMS GmbH

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

```
http://www.apache.org/licenses/LICENSE-2.0
```

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

## Documentation

Please visit our official [Dashlet API](https://help.optimal-systems.com/enaio_develop/display/WEB/5.+Dashlet+API) documentation for more information about developing and integrating dashlets into enaio® webclient.

## Introduction

In the enaio® webclient, from version 10.0 Service Release 2, we provide you with the option of integrating customer-specific and freely configurable areas - so-called dashlets. Dashlets support you in the implementation of a wide variety of business processes and scenarios by making them available as additional information and interaction options for users, depending on the context.

For the preview area, in which the content and detailed previews are currently displayed, you can configure individual dashlets that, for example, integrate other information sources with the help of so-called dashlet services (e.g. websites such as Wikipedia or Google Maps). Alternatively, you can integrate complete web applications such as the enaio® documentviewer.

## Abstraction Library for Dashlet Communication (new)

Abstraction Library is a critical component of this project designed to facilitate seamless communication between the dashlet and both the enaio® webclient and enaio® richclient. This library, available as an npm package accessible [here](https://www.npmjs.com/package/@enaio-client/communication-library), serves as a foundational bridge, enhancing interaction between the dashlet and the enaio® platforms.

### Purpose

The Abstraction Library is primarily intended to simplify and streamline the process of communication between the dashlet  and both the enaio® webclient and enaio® richclient. By adopting this library, the integration of the dashlet into both platforms becomes a cohesive and straightforward endeavor, all while maintaining a unified codebase.

## Events

The enaio® webclient works on an event basis. The individual events are shown in an overview below. Details about each event can then be found on the respective event subpage. Below are the currently available events:

### onInit

The onInit event is triggered every time the dashlet is activated and thus made visible. The payload of the event contains information about the current status, which enables the dashlet to initialize itself directly without having to call many methods afterwards.

You can find more information about this event on our [documentation page](https://help.optimal-systems.com/enaio_develop/display/WEB/onInit).

### onUpdate

The onUpdate event is triggered every time the object selection has changed in the enaio® webclient. It contains the same properties as the onInit event.

You can find more information about this event on our [documentation page](https://help.optimal-systems.com/enaio_develop/display/WEB/onUpdate).

## Methods

Dashlets can control the enaio® webclient and trigger actions. The techique behind the communication to the enaio® webclient is done via the browser API postMessage [window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). To simplify the communication the abstraction library is encapsulating this and provide the currently available asynchronous methods:

For more information on methods, see our [documentation page](https://help.optimal-systems.com/enaio_develop/display/WEB/5.4+Dashlet-Methoden).

### Open location

The openLocation method is used to call the enaio® webclient's Open Location scripting method, which opens the location (or a location selection if there are several possible locations) for the DMS object transferred as a parameter.

### Open index data

Using the method openIndexData, the scripting method Show Indexdata or Edit Indexdata of the enaio® webclient is called, which opens the index data mask for the DMS object transferred as a parameter.

### Get selected objects

The getSelectedObjects method is used to query the currently selected objects. If no objects are selected or no hit list is currently displayed, an empty list is returned.

Please visit our official [Dashlet API](https://help.optimal-systems.com/enaio_develop/display/WEB/5.+Dashlet+API) documentation for more information about developing and integrating dashlets into enaio® webclient.

### Refresh hit list objects

The refreshHitListObjects method is used to refresh one or more objects in an open hit list. To demo this feature; open any hit list, then open a second tab and modifiy an object's index data which is displayed in the hit list. Return to the first tab's hit list and press the refresh hit list button. The modified data should be updated.

Please visit our official [Dashlet API](https://help.optimal-systems.com/enaio_develop/display/WEB/5.+Dashlet+API) documentation for more information about developing and integrating dashlets into enaio® webclient.

### Open hit list by ids

The openHitListByIds method is used to be able to display a mixed hit list with freely selected objects.

Please visit our official [Dashlet API](https://help.optimal-systems.com/enaio_develop/display/WEB/openHitListByIds) documentation for more information about developing and integrating dashlets into enaio® webclient.
