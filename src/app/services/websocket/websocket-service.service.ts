import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

  audioContext!: AudioContext;
  socket!: WebSocket;

  constructor() {
    this.audioContext = new (window.AudioContext)();
    this.initWebSocket();
  }

  initWebSocket() {
    this.socket = new WebSocket('ws://localhost:3210');
    this.socket.onmessage = (event) => {
      const audioData = event.data;
      this.audioContext.decodeAudioData(audioData, (buffer) => {
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext.destination);
        source.start();
      }, (error) => {
        console.error("Error decoding audio data", error);
      });
    };
  }
}