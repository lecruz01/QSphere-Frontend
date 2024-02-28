import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MicVAD } from "@ricky0123/vad-web";
import { WebsocketService } from '../websocket/websocket-service.service';

declare global {
  interface Window {
    vadit: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class VadService {
  myvad: any;

  constructor(private http: HttpClient, private websocketService: WebsocketService) {}

  async initializeVAD() {
    console.log('Initializing VAD');
    this.myvad = await MicVAD.new({
      onSpeechStart: () => {
        console.log("Speech started!");
      },
      onSpeechEnd: (audio) => {
        this.onSpeechEndCB(audio);
      }
    });
    console.log(this.myvad);
    this.myvad.start();
  }

  async onSpeechEndCB(audio: Float32Array) {
    console.log('Speech ended');
    // Convertir Float32Array a un formato adecuado para WebSocket, por ejemplo, Blob o ArrayBuffer
    const audioBlob = new Blob([audio], { type: 'audio/float32' });
  
    try {
      // Asegúrate de que el servicio WebSocket esté listo y conectado antes de enviar
      if (this.websocketService.socket.readyState === WebSocket.OPEN) {
        this.websocketService.socket.send(audioBlob);
      } else {
        console.error('WebSocket is not open.');
        // Podrías intentar reconectar o manejar este estado adecuadamente
      }
    } catch (error) {
      console.error('Error sending audio over WebSocket:', error);
    }
  }

  /* async onSpeechEndCB(audio: Float32Array) {
    console.log('Speech ended');
    const audioArray = Array.from(audio);
    try {
      this.http.post('http://localhost:3000/api/process-audio', { audio: audioArray })
        .subscribe((res: any) => {
          const audio = new Audio(res.url);
          audio.play();
        });
    } catch (error) {
      console.error('Error converting audio to MP3:', error);
    }
  } */

  startVAD() {
    console.log('Starting VAD');
    this.initializeVAD();
  }
}
