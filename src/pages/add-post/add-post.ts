import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../models/post/post.model';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import { ToastService } from '../../providers/toast-service/toast-service';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {
  userId: string;
  post: Post = {
    owner: '',
    title: '',
    content: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseService: FirebaseService,
    private toast: ToastService,
    private afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(user => {  
        if (user) {
          this.userId = user.uid;
          this.post.owner = this.userId;
        }
      });
     }

  addPost(post: Post) {
    this.firebaseService.addPost(post).then(ref => {
      console.log(ref.key);
      this.firebaseService.db.list(`user`).update(this.userId.concat("/posts/"+ref.key), {title: post.title});
      this.toast.show(`${post.title} added!`);
      this.navCtrl.setRoot('TabsPage', { key: ref.key });
    });
  }
}
