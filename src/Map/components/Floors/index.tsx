import React, { FC, useState } from 'react';
import { Config } from '../../config';
import { FloorProps } from '../../types';
import CircleButton from '../CircleButton';
import FloorModal from './Modal';

type Props = {
  floors: FloorProps[];
  currentFloor: number;
  onFloorChanged: (floor: number) => void;
  floorText?: string;
  allowDropdown?: boolean;
  showFloors?: boolean;
  buttonColor?: string;
  circleColor?: string;
};

const Floors: FC<Props> = ({
  floors,
  currentFloor,
  onFloorChanged,
  floorText,
  allowDropdown = true,
  showFloors = true,
  buttonColor,
  circleColor,
}) => {
  const [expanded, setExpanded] = useState(false);

  if (floors?.length <= 1 || !showFloors) return <></>;
  return (
    <>
      <CircleButton
        onPress={() => setExpanded(true)}
        src={String(Config.STAIRS_ICON)}
        text={String(currentFloor)}
        disabled={!allowDropdown}
        color={buttonColor}
        circleColor={circleColor}
      />

      {allowDropdown && (
        <FloorModal
          floors={floors}
          closeModal={() => setExpanded(false)}
          expanded={expanded}
          onFloorChanged={onFloorChanged}
          floorText={floorText}
        />
      )}
    </>
  );
};

export default Floors;
