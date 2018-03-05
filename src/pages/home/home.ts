import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FirebaseService } from './../../providers/firebase-service/firebase-service';
import { Post } from '../../models/post/post.model';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  uid = firebase.auth().currentUser.uid;
  posts: Observable<any[]>;
  role: number;

  constructor(public navCtrl: NavController, private firebaseService: FirebaseService) {
    this.posts = this.firebaseService.getPosts().map(actions => {
      return actions.map(action => {
        return { key: action.key, ...action.payload.val() }
      });
    });
    this.getRole();
  }

  getRole() {
    this.firebaseService.db.object(`/users/${this.uid}`).snapshotChanges().subscribe(user => { // Get database of current user uid
      this.role = user.payload.child('role').val(); // Get role value
    });
  }

  viewPost(post: Post) {
    this.navCtrl.push('PostPage', { role: this.role, uid: this.uid, postId: post.key, ownerId: post.ownerKey });
  }

  viewOwnerProfile(key: string) {
    this.firebaseService.db.object(`/users/${key}`).snapshotChanges().subscribe(user => {
      let postOwner = user.payload.val();
      this.navCtrl.push('ProfilePage', { user: postOwner, uid: key });
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
