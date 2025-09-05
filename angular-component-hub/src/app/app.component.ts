import { Component } from '@angular/core';
import { ImageUploadComponent } from "./shared/upload-image/upload-image.component";
@Component({
  selector: 'app-root',
  imports: [ImageUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}

