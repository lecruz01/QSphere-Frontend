declare module 'lamejs' {
    export class Mp3Encoder {
      constructor(numChannels: number, sampleRate: number, bitRate: number);
      encodeBuffer(left: Float32Array, right: Float32Array): number[];
      flush(): number[];
    }
  }
  