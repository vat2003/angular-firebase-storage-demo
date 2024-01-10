import {Component, inject} from '@angular/core';
import {Observable} from "rxjs";
import {getDownloadURL, ref, Storage, uploadBytesResumable} from "@angular/fire/storage";

@Component({
  selector: 'app-form-file',
  standalone: true,
  imports: [],
  templateUrl: './form-file.component.html',
  styleUrl: './form-file.component.css'
})
export class FormFileComponent {
  uploadProgress$!: Observable<number>;
  downloadURL$!: Observable<string>;

  private storage: Storage = inject(Storage);
  onFileSelected(event: any) {
    const archivoSelectcionado: File = event.target.files[0];
    console.log("archivoSelectcionado: ", archivoSelectcionado);
    this.uploadFile(archivoSelectcionado);
  }

  async uploadFile(file: File) {
    const filePath = `archivos/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    const uploadFile = uploadBytesResumable(fileRef, file);

    uploadFile.on('state_changed',
      (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Progress ... ', progress);
      },
      (error) => {
      console.error('Error ... ', error);
      },
      async () => {
      console.log('assi');
      const url = await getDownloadURL(fileRef);
      console.log('url ', url);
      })
  }
}
