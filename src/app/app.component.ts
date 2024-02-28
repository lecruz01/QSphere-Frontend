import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VadService } from './services/vad/vad-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor(private vadService: VadService) { }

  ngOnInit(): void {
    this.vadService.startVAD();
  }
}
