import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageUploadComponent } from './upload-image.component';

describe('UploadImageComponent', () => {
  let component: ImageUploadComponent;
  let fixture: ComponentFixture<ImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageUploadComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add imagem', (done) => {
    const file = new File(['conteúdo fake'], 'teste.png', { type: 'image/png' });

    const event = {
      target: {
        files: [file]
      }
    } as unknown as Event;

    component.onFileSelected(event);

    setTimeout(() => {
      expect(component.fileName).toBe('teste.png');
      expect(component.imagePreview).toContain('data:image/png');
      done();
    }, 100);
  });

  it('add arquivo não imagem', () => {
    const file = new File(['conteudo fake'], 'documento.pdf', { type: 'application/pdf' });

    const mockEvent = {
      target: {
        files: [file],
        value: ''
      }
    } as unknown as Event;

    spyOn(window, 'alert');

    component.onFileSelected(mockEvent);

    expect(window.alert).toHaveBeenCalledWith('Por favor, selecione apenas imagens.');
    expect(component.fileName).toBe('');
    expect((mockEvent.target as HTMLInputElement).value).toBe('');
  });

  it('remover imagem', () => {
    component.imagePreview = 'algum-dado';
    component.fileName = 'teste.png';

    component.removeImage();

    expect(component.imagePreview).toBeNull();
    expect(component.fileName).toBe('');
  });
});
