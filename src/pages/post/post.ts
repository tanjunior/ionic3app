import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../models/post/post.model';
import { User } from '../../models/user/user.model';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  role = this.navParams.get('role');
  post = this.navParams.get('post');
  uid = this.navParams.get('uid');

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseService) {
  }

  viewOwnerProfile(user: User) {
    this.firebaseService.db.object(`/users/${this.post.ownerKey}`).snapshotChanges().subscribe(user => {
      let postOwner = user.payload.val();
      this.navCtrl.push('ProfilePage', { user: postOwner, uid: this.post.ownerKey });
    });
  }

  editPost(post: Post) {
    this.navCtrl.push('EditPostPage', { post: this.post });
  }

  deletePost(post: Post) {
    this.firebaseService.deletePost(this.post).then(() => {
      this.firebaseService.deletePostFromUser(this.uid, this.post).then(() => {
        this.navCtrl.popToRoot();
      });
    });
  }
}
