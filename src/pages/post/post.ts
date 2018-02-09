import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../models/post/post.model';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  currentUser = firebase.auth().currentUser;
  role = this.navParams.get("role");
  post = this.navParams.get('post');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.post.owner);
  }

  editPost(post: Post) {
    this.navCtrl.push('EditPostPage', { post: this.post });
  }
}
