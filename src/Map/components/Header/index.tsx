import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { FloorProps, ZoomProps } from '../../types';
import Floors from '../Floors';
import Spacer from '../Spacer';
import Zoom from '../Zoom';

type Props = {
  zoom: number;
  mapUrls: FloorProps[];
  floor: number;
  setZoom: (value: number) => void;
  onZoomReset: () => void;
  setFloor: (value: number) => void;
  showHeader?: boolean;
  zoomOptions?: ZoomProps;
  floorText?: string;
  allowFloorDropdown?: boolean;
  showFloors?: boolean;
  alignment?: 'flex-start' | 'center' | 'flex-end';
  headerOnRight?: boolean;
  floorButtonColor?: string;
  floorCircleColor?: string;
  buttonGap?: number;
};
const Header: FC<Props> = ({
  zoom,
  mapUrls,
  floor,
  setZoom,
  onZoomReset,
  setFloor,
  showHeader = true,
  zoomOptions,
  floorText,
  allowFloorDropdown,
  showFloors,
  alignment = 'center',
  headerOnRight,
  floorButtonColor,
  floorCircleColor,
  buttonGap,
}) => {
  if (!showHeader) return <></>;

  return (
    <View
      style={[
        styles.actionWrapper,
        {
          justifyContent: alignment,
          alignSelf: headerOnRight
            ? 'flex-end'
            : 'flex-start',
        },
      ]}>
      {!zoomOptions?.hideZoom && (
        <Zoom
          zoom={zoom}
          onZoomChanged={(value) => setZoom(value)}
          maxZoom={zoomOptions?.maxZoom}
          zoomStyle={zoomOptions?.zoomStyle}
          sensitivity={zoomOptions?.sensitivity}
          showResetButton={zoomOptions?.showResetButton}
          onReset={onZoomReset}
          hideZoom={zoomOptions?.hideZoom}
          zoomColor={zoomOptions?.zoomColor}
          zoomDisabledColor={zoomOptions?.zoomDisabledColor}
          circleColor={zoomOptions?.circleColor}
          buttonGap={buttonGap}
        />
      )}

      <Spacer vertical gap={buttonGap ?? 4} />

      <Floors
        floors={mapUrls}
        currentFloor={floor}
        onFloorChanged={(newFloor: number) => {
          setFloor(newFloor);
          !zoomOptions?.preventReset && onZoomReset();
        }}
        floorText={floorText}
        allowDropdown={allowFloorDropdown}
        showFloors={showFloors}
        buttonColor={floorButtonColor}
        circleColor={floorCircleColor}
      />

      <Spacer vertical gap={buttonGap ?? 4} />
    </View>
  );
};

const styles = StyleSheet.create({
  actionWrapper: {
    height: '100%',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999999,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
});

export default Header;
