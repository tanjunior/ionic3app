import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../models/post/post.model';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
  selector: 'page-edit-post',
  templateUrl: 'edit-post.html',
})
export class EditPostPage {
  post = this.navParams.get("post");
  postId = this.navParams.get("postId");

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseService) { }

  savePost(post: Post) {
    this.firebaseService.editPost(this.postId,this.post).then(() => {
      this.navCtrl.pop();
    });
  }

}
