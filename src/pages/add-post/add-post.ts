import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Post } from '../../models/post/post.model';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { ToastService } from '../../providers/toast-service/toast-service';
import { UploadFile } from '../../models/upload-file/upload-file.model';
import { UploadService } from '../../providers/upload-service/upload-service';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {
  selectedFiles: FileList;
  currentFileUpload: UploadFile;
  progress: { percentage: number } = { percentage: 0 };
  userId = firebase.auth().currentUser.uid;
  userName: string;
  post: Post = {
    ownerKey: '',
    owner: '',
    title: '',
    content: '',
    imgurl: '',
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseService: FirebaseService,
    private toast: ToastService,
    public uploadService: UploadService,
    public events: Events) {
    this.firebaseService.db.object(`/users/${this.userId}`).snapshotChanges().subscribe(data => { // Get database of current user uid
      this.post.owner = data.payload.child('username').val();
    });
    this.post.ownerKey = this.userId;
  }

  ngOnInit() {
    this.uploadService.setBasePath("posts");
  }

  selectImage(event) {
    this.selectedFiles = event.target.files;
  }

  addPost(post: Post) {
    this.firebaseService.addPost(post).then(ref => {
      this.firebaseService.db.list(`users/${this.userId}/posts`).update(ref.key, { title: post.title }).then(() => {
        this.events.publish("post", ref.key);
        const file = this.selectedFiles.item(0);
        this.currentFileUpload = new UploadFile(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
      }).then(() => {
        this.toast.show(`${post.title} added!`).then(() => {
          this.navCtrl.popToRoot();
        });
      });
    });
  }
}
