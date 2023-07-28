export enum Breakpoints {
    Mobile = 767.9,
    Tablet = 991.9,
    Desktop = 1200,
  }
  
  export enum DeviceSize {
    large = "large",
    medium = "medium",
    small = "small",
  }
  
  export interface UseWindowTypes {
    windowWidth: number;
    deviceType: DeviceSize;
  }