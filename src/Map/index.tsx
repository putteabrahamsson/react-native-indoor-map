import React, { FC, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import Marker from './components/Marker';
import { Config } from './config';
import { FloorProps, HeaderProps, MapProps } from './types';
import Header from './components/Header';

type Props = {
  mapUrls: FloorProps[];
  floor?: number;
  setFloor?: (floor: number) => void;
  mapStyle?: MapProps;
  header?: HeaderProps;
  onMarkerPress?: (marker: any) => void;
};

const Map: FC<Props> = ({
  mapUrls,
  floor = 0,
  setFloor,
  mapStyle,
  header,
  onMarkerPress,
}) => {
  const { DEFAULT_ZOOM, DEFAULT_MAP_SIZE } = Config;

  const findFloor = () =>
    mapUrls?.find((obj) => obj.floor === floor) ??
    mapUrls[0];

  const [zoom, setZoom] = useState(
    header?.zoomOptions?.zoom ?? DEFAULT_ZOOM,
  );

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  const resetZoom = () => {
    setZoom(DEFAULT_ZOOM);
    pan.setValue({ x: 0, y: 0 });
  };

  return (
    <View style={styles.wrapper}>
      <Header
        floor={floor}
        mapUrls={mapUrls}
        onZoomReset={resetZoom}
        setFloor={setFloor}
        setZoom={setZoom}
        zoom={zoom}
        allowFloorDropdown={header?.allowFloorDropdown}
        floorText={header?.floorText}
        showHeader={header?.showHeader}
        showFloors={header?.showFloors}
        zoomOptions={header?.zoomOptions}
        alignment={header?.alignment}
        headerOnRight={header?.headerOnRight}
        floorButtonColor={header?.floorButtonColor}
        floorCircleColor={header?.floorCircleColor}
        buttonGap={header?.buttonGap}
      />

      <View
        style={[
          styles.outerMapPart,
          { backgroundColor: mapStyle?.backgroundColor },
        ]}>
        <Animated.View
          style={[
            styles.innerMapPart,
            {
              width: mapStyle?.size ?? DEFAULT_MAP_SIZE,
              height: mapStyle?.size ?? DEFAULT_MAP_SIZE,
              transform: [
                { translateX: pan.x },
                { translateY: pan.y },
                { scale: zoom },
              ],
              backgroundColor: mapStyle?.mapBackgroundColor,
            },
          ]}
          {...panResponder.panHandlers}>
          <SvgUri uri={findFloor()?.url} fill="black" />

          {findFloor()?.markers?.map((marker, index) => (
            <Marker
              key={marker.value + index}
              text={marker?.text}
              value={marker?.value}
              width={marker?.width}
              height={marker?.height}
              x={marker?.x}
              y={marker?.y}
              onPress={onMarkerPress}
              textDelay={marker?.textDelay}
              color={marker?.color}
              isStairs={marker?.isStairs}
              iconUrl={marker?.iconUrl}
              iconSize={marker?.iconSize}
              iconColor={marker?.iconColor}
              iconRotate={marker?.iconRotate}
            />
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginHorizontal: 8,
  },
  wrapper: {
    flex: 1,
  },
  outerMapPart: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerMapPart: {
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Map;
