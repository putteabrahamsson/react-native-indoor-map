# React Native Indoor Map

react-native-indoor-map is a library for displaying an indoor map built in svg-format. We will be updating the library frequently.

Library for React Native - TypeScript

## Installation

Npm

```bash
npm install react-native-indoor-map
```

## Usage

```javascript
import Map from "react-native-indoor-map";
```

```javascript
<Map mapUrl={mapUrl} />
```

## Available props for map

| Name          | Type          | Required |
| ------------- | ------------- | -------- |
| mapUrl        | string        | true     |
| onMarkerPress | function      | false    |
| mapStyle      | MapProps      | false    |
| markers       | MarkerProps[] | false    |
| zoomOptions   | ZoomProps     | false    |

## Available props for mapStyle

| Name               | Type     | Required |
| ------------------ | -------- | -------- |
| size               | string   | true     |
| backgroundColor    | function | false    |
| mapBackgroundColor | MapProps | false    |

## Available props for markers

| Name        | Type      | Required |
| ----------- | --------- | -------- |
| value       | string    | true     |
| width       | number    | true     |
| height      | number    | true     |
| x           | number    | true     |
| y           | number    | true     |
| text        | string    | false    |
| textStyle   | TextStyle | false    |
| markerStyle | ViewStyle | false    |
| textDelay   | number    | false    |
| color       | string    | false    |

## Available props for zoomOptions

| Name            | Type   | Required |
| --------------- | ------ | -------- |
| zoom            | number | true     |
| maxZoom         | number | false    |
| zoomStyle       | number | false    |
| hideZoom        | number | false    |
| sensitivity     | number | false    |
| showResetButton | string | false    |

### mapUrl

URL to a SVG map.

Example:
[https://svgshare.com/i/iAX.svg](https://svgshare.com/i/iAX.svg)

---

### onMarkerPress

Function when pressing a marker

---

### mapStyle

A prop for styling the map with size, background color & background color of the map

---

### markers

An array with the type `MarkerProps[]`, this is useable if you wanna place markers on your map

---

### zoomOptions

An object with the type `ZoomProps`, this is useable if you wanna change settings on map, for example `sensitivity` which sets how much you zoom in per press.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## GitHub

[GitHub](https://github.com/putteabrahamsson/react-native-indoor-map)
