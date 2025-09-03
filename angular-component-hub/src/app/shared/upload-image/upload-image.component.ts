import { Component, ViewChild, ElementRef, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-upload',
  standalone: true, 
  imports: [CommonModule],
  styleUrls: ['./upload-image.component.scss'],
  templateUrl: './upload-image.component.html',
})
export class ImageUploadComponent {
  imagePreview: string | ArrayBuffer | null = null; 
  fileName: string = ''; 

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  HIGHLIGHT_COLOR: string | undefined;
  PRIMARY_COLOR_TEXT: string | undefined;
  constructor(private cdr: ChangeDetectorRef) { } 

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return; 

    const file = input.files[0]; 

    if (!file.type.startsWith('image/')) { 
      alert('Por favor, selecione apenas imagens.');
      input.value = ''; 
      return; 
    }

    this.fileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result; 
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.imagePreview = null;
    this.fileName = '';

    const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
    if (fileInput) {
      fileInput.value = ''; 
    }
  }
}
