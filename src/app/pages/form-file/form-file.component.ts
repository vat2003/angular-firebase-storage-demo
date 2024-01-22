import {Component, inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {deleteObject, getDownloadURL, ref, Storage, uploadBytesResumable} from "@angular/fire/storage";
import {listAll} from "firebase/storage";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FirebaseStorageCrudService} from "../../services/firebase-storage-crud.service";
import {ImageModel} from "../../model/image-model";

@Component({
  selector: 'app-form-file',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule
  ],
  templateUrl: './form-file.component.html',
  styleUrl: './form-file.component.css',
  providers: [FirebaseStorageCrudService]
})
export class FormFileComponent {


  uploadProgress$!: Observable<number>;
  downloadURL$!: Observable<string>;

  private data: any;

  constructor(private firebaseStorageService: FirebaseStorageCrudService) {

  }

  private storage: Storage = inject(Storage);

  onFileSelected(event: any) {
    const archivoSelectcionado: File[] = event.target.files;
    console.log("archivoSelectcionado: ", archivoSelectcionado);

    for (const file of archivoSelectcionado) {
      this.uploadFile(file).then(r => console.log(file.name));

    }
  }

  async uploadFile(file: File) {
    await this.firebaseStorageService.uploadFile("archivos", file);
  }

  async getAllFiles() {

    const fileList = await this.firebaseStorageService.getAllFiles("archivos");
    for (const fileRef of fileList.items) {

      const downloadUrl = await getDownloadURL(fileRef);
      const metaData = await this.firebaseStorageService.getFileMetadata("archivos/" + fileRef.name);
      const tes = new ImageModel(metaData.name);
      console.log("IMAGE MODEL =>>>>>>> " + tes.name);
      console.log(metaData.name + " - " + metaData.type + " - " + metaData.size + "KB - " + metaData.lastModified);
    }

  }

  async deleteFiles(filePath: string) {
    await this.firebaseStorageService.deleteFile(filePath);
  }


}
