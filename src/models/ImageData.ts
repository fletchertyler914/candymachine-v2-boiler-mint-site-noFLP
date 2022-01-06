export default interface IImageData {
    Background: number,
    Bridge: number,
    Coastline: number,
    ColorPops: number,
    Disaster: number, 
    Flying: number,
    Ocean: number,
    Skyline: number,
    TimeOfDay: number,
    Underground: number,
    Weather: number,
    Wilderness: number
  }

  export default interface IMintData {
    MintId: string,
    Address: string,
    NftData: IImageData
  }
