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
  currentUser = firebase.auth().currentUser;
  asd;
  posts: Observable<any[]>;
  userRole: number;

  constructor(public navCtrl: NavController, private firebaseService: FirebaseService) {
    this.loadPosts();
    this.getRole();
  }

  ionViewWillEnter() {

  }

  ionViewWillLoad() {

  }

  loadPosts() {
    this.posts = this.firebaseService.getPosts().map(actions => {
      return actions.map(action => {
        return {key: action.payload.key, ...action.payload.val()}
      });
    });
  }

  getRole() {
    this.firebaseService.db.object(`/users/${this.currentUser.uid}`).snapshotChanges().subscribe(user => { // Get database of current user uid
      this.userRole = user.payload.val().role; // Get role value
    });
  }

  deletePost(post: Post) {
    this.firebaseService.deletePost(post);
  }

  viewPost(post: Post) {
    this.navCtrl.push('PostPage', { post: post, role: this.userRole });
  }

  async logOut(): Promise<void> {
    await firebase.auth().signOut();
    this.navCtrl.setRoot('LoginPage');
  }

}
