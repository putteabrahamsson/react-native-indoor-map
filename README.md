# React Native Indoor Map

react-native-indoor-map is a library for displaying an indoor map built in svg-format. We will be updating the library frequently.

Library for React Native - TypeScript

- Scroll down to the bottom for exampel usage

!! Still under Beta !!

## Installation

Npm

```bash
npm install react-native-indoor-map
```

Yarn

```bash
yarn add react-native-indoor-map
```

## Usage

```javascript
import { Map } from "react-native-indoor-map";
```

```javascript
<Map mapUrl={mapUrl} />
```

### mapUrl

Will be updated

---

### onMarkerPress

Function when pressing a marker

---

### mapStyle

A prop for styling the map with size, background color & background color of the map

---

## Upcoming news

We plan on releasing some new updates to the package.

- Pinch to zoom
- More configuration

## Example project

![floor1](https://user-images.githubusercontent.com/56152205/174472975-96bb73f5-c496-4f30-bb7e-1394ebe024e5.png)
|
![floor2](https://user-images.githubusercontent.com/56152205/174472976-5a10aba8-ebb0-4247-94e9-9c425f861adf.png)

Creating the floors

```
import {
  FloorProps,
  MarkerProps,
} from 'react-native-indoor-map';

const floor1Markers: MarkerProps[] = [
  {
    width: 30,
    height: 30,
    value: 'bathroom',
    text: 'bathroom',
    x: -70,
    y: 10,
    color: 'transparent',
    iconUrl: 'https://svgshare.com/i/iPk.svg',
    iconSize: 20,
  },
  {
    width: 25,
    height: 25,
    value: 'upstairs',
    x: 50,
    y: 34,
    color: 'rgba(1, 1, 1, .9)',
    isStairs: true,
    iconUrl: 'https://svgshare.com/i/iMJ.svg',
    iconSize: 20,
    iconColor: 'white',
  },
];

const floor2Markers: MarkerProps[] = [
  {
    width: 25,
    height: 25,
    value: 'downstairs',
    x: 50,
    y: 5,
    color: 'rgba(1, 1, 1, .9)',
    isStairs: true,
    iconSize: 20,
    iconColor: 'white',
  },
];

export const floors: FloorProps[] = [
  {
    floor: 1,
    url: 'https://svgshare.com/i/iNZ.svg',
    markers: floor1Markers,
  },
  {
    floor: 2,
    url: 'https://svgshare.com/i/iN_.svg',
    markers: floor2Markers,
  },
];

```

Adding <Map />

```
import React, { FC, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Map } from 'react-native-indoor-map';
import { floors } from './map-examples/house';

const App: FC = () => {
  const [currentFloor, setCurrentFloor] = useState(1);

  const onMarkerPress = (value: string) => {
    if (value === 'upstairs') {
      setCurrentFloor((prev) => prev + 1);
    }
    if (value === 'downstairs') {
      setCurrentFloor((prev) => prev - 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Map
        mapUrls={floors}
        floor={currentFloor}
        onMarkerPress={onMarkerPress}
        header={{
          zoomOptions: {
            zoomDisabledColor: 'gray',
            maxZoom: 4,
            showResetButton: true,
          },
          alignment: 'flex-start',
          headerOnRight: true,
          floorText: 'Våning',
          allowFloorDropdown: true,
        }}
      />
    </SafeAreaView>
  );
};

export default App;

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## GitHub

[GitHub](https://github.com/putteabrahamsson/react-native-indoor-map)
