import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { UploadFile } from '../../models/upload-file/upload-file.model';
import { Events } from 'ionic-angular';

/**
http://javasampleapproach.com/frontend/angular/angular-4-firebase-upload-file-to-storage
 */
@Injectable()
export class UploadService {
  public basePath: string;
  key;

  constructor(public db: AngularFireDatabase, public events: Events) {
    this.events.subscribe("post", (key) => {
      this.key = key;
    });
  }

  setBasePath(path: string) {
    this.basePath = path;
  }

  pushFileToStorage(fileUpload: UploadFile, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${this.key}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        fileUpload.imgurl = uploadTask.snapshot.downloadURL;
        this.saveFileData(fileUpload)
      }
    );
  }

  private saveFileData(fileUpload: UploadFile) {
    this.db.list(`${this.basePath}`).update(this.key, fileUpload);
  }
}
