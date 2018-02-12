export class UploadFile {

  $key: string;
  imgurl: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}