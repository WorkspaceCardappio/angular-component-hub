import { Component, ViewChild, ElementRef, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-upload', //nome do componente
  standalone: true, //indica que é um componente independente
  imports: [CommonModule],
  styleUrls: ['./upload-image.component.scss'],
  templateUrl: './upload-image.component.html',
})
export class ImageUploadComponent {
  imagePreview: string | ArrayBuffer | null = null; //imagem pode ser string, array de bytes ou null (antes de carregar algo)
  fileName: string = ''; //guarda o nome do arquivo

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  HIGHLIGHT_COLOR: string | undefined;
  PRIMARY_COLOR_TEXT: string | undefined;
  constructor(private cdr: ChangeDetectorRef) { } //para forçar atualização do preview rapida

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return; //se n tiver arquivo, sai

    const file = input.files[0]; //pega o primeiro arquivo (só permite um)

    if (!file.type.startsWith('image/')) { //verifica se é imagem
      alert('Por favor, selecione apenas imagens.'); //alerta se n for
      input.value = ''; //reseta o input
      return; //sai da função
    }

    this.fileName = file.name; //guarda o nome do arquivo

    //pega a imagem, converte para string que o navegador entende como imagem, e guarda em imagePreview
    //api nativa js para ler arquivos 
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result; // garante atualização do preview
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }
  // remove a imagem e o nome do arquivo
  removeImage(): void {
    this.imagePreview = null;
    this.fileName = '';

    const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
    if (fileInput) {
      fileInput.value = ''; // reseta input
    }
  }
}
