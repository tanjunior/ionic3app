import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../models/post/post.model';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../models/user/user.model';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  uid = firebase.auth().currentUser.uid;
  role = this.navParams.get("role");
  post = this.navParams.get('post');
  postOwner;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
    this.getPostOwner();
  }

  getPostOwner() {
    this.db.object(`/users/${this.post.owner}`).snapshotChanges().subscribe(user => {
      this.postOwner = user.payload.val();
    });
  }

  viewOwnerProfile(user: User) {
    this.navCtrl.push('ProfilePage', { user: this.postOwner, uid: this.post.owner });
  }

  editPost(post: Post) {
    this.navCtrl.push('EditPostPage', { post: this.post });
  }
}
