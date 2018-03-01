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
  //post = this.navParams.get('post');
  post;
  postId = this.navParams.get('postId');
  ownerId = this.navParams.get('ownerId');
  uid = this.navParams.get('uid');

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseService) {
    this.getPost();
  }

  getPost() {
    this.firebaseService.db.object<any>(`/posts/${this.postId}`).snapshotChanges().subscribe(data => {
      console.log(data.payload.val().comments);
      this.post = data.payload.val();
    });
  }

  viewOwnerProfile(user: User) {
    this.firebaseService.db.object(`/users/${this.ownerId}`).snapshotChanges().subscribe(user => {
      let postOwner = user.payload.val();
      this.navCtrl.push('ProfilePage', { user: postOwner, uid: this.ownerId });
    });
  }

  addComment(comment: string) {
    this.firebaseService.db.object(`/users/${this.uid}`).snapshotChanges().subscribe(user => {
      let username = user.payload.child('username').val()
      this.firebaseService.db.list(`posts/${this.postId}/comments`).push({ ownerKey: this.uid, owner: username, comment: comment });
    });

  }

  editPost() {
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
