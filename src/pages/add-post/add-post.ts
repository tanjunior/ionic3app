import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Post } from '../../models/post/post.model';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { ToastService } from '../../providers/toast-service/toast-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { UploadFile } from '../../models/upload-file/upload-file.model';
import { UploadService } from '../../providers/upload-service/upload-service';

@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {
  selectedFiles: FileList;
  currentFileUpload: UploadFile;
  progress: { percentage: number } = { percentage: 0 };
  userId: string;
  post: Post = {
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
    private afAuth: AngularFireAuth,
    public uploadService: UploadService,
    public events: Events) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.post.owner = this.userId;
      }
    });
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
        this.toast.show(`${post.title} added!`);
        this.navCtrl.setRoot('TabsPage');
      });
    });
  }
}
