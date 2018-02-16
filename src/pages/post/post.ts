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
  postOwner: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseService) {
    this.getPostOwner();
  }

  getPostOwner() {
    this.firebaseService.db.object(`/users/${this.post.owner}`).snapshotChanges().subscribe(user => {
      this.postOwner = user.payload.val();
    });
  }

  viewOwnerProfile(user: User) {
    this.navCtrl.push('ProfilePage', { user: this.postOwner, uid: this.post.owner });
  }

  editPost(post: Post) {
    this.navCtrl.push('EditPostPage', { post: this.post });
  }

  deletePost(post: Post) {
    this.firebaseService.deletePost(this.post).then(() => {
      this.navCtrl.setRoot('TabsPage');
    });
  }  
}
