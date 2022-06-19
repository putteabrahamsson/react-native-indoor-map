import React, { FC } from 'react';
import { Config } from '../../config';
import { ZoomProps } from '../../types';
import CircleButton from '../CircleButton';
import Spacer from '../Spacer';

type ExtendedZoomProps = {
  onZoomChanged: (value: number) => void;
  onReset?: () => void;
  buttonGap?: number;
} & ZoomProps;

const Zoom: FC<ExtendedZoomProps> = ({
  onZoomChanged,
  onReset,
  zoom = 1,
  maxZoom,
  sensitivity = 1,
  showResetButton,
  hideZoom,
  zoomColor,
  zoomDisabledColor,
  circleColor,
  buttonGap,
}) => {
  const disabledPlus = maxZoom
    ? zoom >= maxZoom + 1
    : undefined;
  const disabledNegative = zoom <= 1;

  if (hideZoom) return <></>;
  return (
    <>
      <CircleButton
        onPress={() => onZoomChanged(zoom + sensitivity)}
        src={String(Config.ZOOM_PLUS_ICON)}
        disabled={disabledPlus}
        color={zoomColor}
        colorDisabled={zoomDisabledColor}
        circleColor={circleColor}
      />

      <Spacer gap={buttonGap ?? 4} vertical />

      <CircleButton
        onPress={() => onZoomChanged(zoom - sensitivity)}
        src={String(Config.ZOOM_MINUS_ICON)}
        disabled={disabledNegative}
        color={zoomColor}
        colorDisabled={zoomDisabledColor}
        circleColor={circleColor}
      />

      {showResetButton && zoom > 1 && (
        <>
          <Spacer gap={buttonGap ?? 4} vertical />
          <CircleButton
            onPress={onReset}
            src={String(Config.RESET_ICON)}
            disabled={disabledPlus}
            color={zoomColor}
            colorDisabled={zoomDisabledColor}
            circleColor={circleColor}
          />
        </>
      )}
    </>
  );
};

export default Zoom;
