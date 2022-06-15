import React, { FC, useRef, useState } from "react";
import { StyleSheet, View, PanResponder, Animated } from "react-native";
import { SvgUri } from "react-native-svg";
import Marker, { MarkerProps } from "./components/Marker";
import Zoom, { ZoomProps } from "./components/Zoom";
import { Config } from "./config";

type MapProps = {
  size?: number;
  backgroundColor?: string;
  mapBackgroundColor?: string;
};

type Props = {
  mapUrl: string;
  onMarkerPress?: (marker: any) => void;
  mapStyle?: MapProps;
  markers?: MarkerProps[];
  zoomOptions?: ZoomProps;
};

const Map: FC<Props> = ({
  mapUrl,
  onMarkerPress,
  mapStyle,
  markers,
  zoomOptions,
}) => {
  const { DEFAULT_ZOOM, DEFAULT_MAP_SIZE } = Config;

  const [zoom, setZoom] = useState(zoomOptions?.zoom ?? DEFAULT_ZOOM);

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
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.outerMapPart,
          { backgroundColor: mapStyle?.backgroundColor },
        ]}
      >
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
          {...panResponder.panHandlers}
        >
          <SvgUri uri={mapUrl} fill={Config.DEFAULT_TEXTCOLOR} />

          {markers?.map((marker, index) => (
            <Marker
              key={marker?.value + index}
              text={marker?.text}
              value={marker?.value}
              width={marker?.width}
              height={marker?.height}
              x={marker?.x}
              y={marker?.y}
              onPress={onMarkerPress}
              textDelay={marker?.textDelay}
              color={marker?.color}
            />
          ))}
        </Animated.View>
      </View>

      {!zoomOptions?.hideZoom && (
        <Zoom
          zoom={zoom}
          onZoomChanged={(value) => setZoom(value)}
          maxZoom={zoomOptions?.maxZoom}
          zoomStyle={zoomOptions?.zoomStyle}
          sensitivity={zoomOptions?.sensitivity}
          showResetButton={zoomOptions?.showResetButton}
          onReset={() => {
            setZoom(1);
            pan.setValue({ x: 0, y: 0 });
          }}
        />
      )}
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
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  innerMapPart: {
    zIndex: -1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Map;
