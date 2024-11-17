import { Device } from "./Device";

export class Computer implements Device {
  ipAddress: string;
  parentDevice: Device;
  constructor(ipAddress: string, parentDevice: Device) {
    this.parentDevice = parentDevice;
    this.ipAddress = ipAddress;
  }
}
