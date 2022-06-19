import { ViewStyle } from "react-native";

export type MapProps = {
  size?: number;
  backgroundColor?: string;
  mapBackgroundColor?: string;
};

export type TextStyle = {
  backgroundColor: string;
  textColor: string;
  fontSize: number;
};

export type MarkerProps = {
  value: string;
  width: number;
  height: number;
  x: number;
  y: number;
  text?: string;
  textStyle?: TextStyle;
  markerStyle?: ViewStyle;
  textDelay?: number;
  color?: string;
  iconUrl?: string;
  isStairs?: boolean;
  iconSize?: number;
  iconColor?: string;
  iconRotate?: number;
};

export type FloorProps = {
  url: string;
  floor: number;
  markers?: MarkerProps[];
};

export type ZoomProps = {
  zoom?: number;
  maxZoom?: number;
  zoomStyle?: ViewStyle;
  hideZoom?: boolean;
  sensitivity?: number;
  showResetButton?: boolean;
  resetIconUri?: string;
  zoomColor?: string;
  zoomDisabledColor?: string;
  preventReset?: boolean;
  circleColor?: string;
};

export type HeaderProps = {
  showHeader?: boolean;
  zoomOptions?: ZoomProps;
  floorText?: string;
  allowFloorDropdown?: boolean;
  showFloors?: boolean;
  alignment?: "flex-start" | "center" | "flex-end";
  headerOnRight?: boolean;
  floorButtonColor?: string;
  floorCircleColor?: string;
  buttonGap?: number;
};
