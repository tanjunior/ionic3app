import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user/user.model';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  role = this.navParams.get('role');
  postId = this.navParams.get('postId');
  ownerId = this.navParams.get('ownerId');
  uid = this.navParams.get('uid');
  username: string = "";
  message: string = "";
  comments = [];
  post;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseService) {
    this.firebaseService.db.object<any>(`/posts/${this.postId}`).snapshotChanges().subscribe(data => {
      this.post = data.payload.val();
      this.getComments(data.payload.child('comments').val());
    });

    this.firebaseService.db.object(`/users/${this.uid}`).snapshotChanges().subscribe(user => {
      this.username = user.payload.child('username').val();
    });
  }

  getComments(coms) {
    this.comments = [];
    for (let com in coms) {
      this.comments.push(coms[com]);
    }
  }

  viewOwnerProfile(user: User) {
    this.firebaseService.db.object(`/users/${this.ownerId}`).snapshotChanges().subscribe(user => {
      let postOwner = user.payload.val();
      this.navCtrl.push('ProfilePage', { user: postOwner, uid: this.ownerId });
    });
  }

  addComment() {
    this.firebaseService.db.list(`posts/${this.postId}/comments`).push({ ownerKey: this.uid, owner: this.username, comment: this.message });
    this.message = "";
  }

  editPost() {
    this.navCtrl.push('EditPostPage', { post: this.post, postId: this.postId });
  }

  deletePost() {
    this.firebaseService.deletePost(this.postId).then(() => {
      this.firebaseService.deletePostFromUser(this.ownerId, this.postId).then(() => {
        this.navCtrl.popToRoot();
      });
    });
  }

}
