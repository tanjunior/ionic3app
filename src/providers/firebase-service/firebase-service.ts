import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Post } from '../../models/post/post.model';

@Injectable()
export class FirebaseService {
  private postsRef = this.db.list<any>('/posts');
  private usersRef = this.db.list<any>('/users');  

  constructor(public db: AngularFireDatabase) {}

  getPosts() {
    return this.postsRef.snapshotChanges();
  }

  addPost(post: Post) {
    return this.postsRef.push(post);
  }

  editPost(postId: string, post: Post) {
    return this.postsRef.update(postId, post);
  }

  deletePost(postId: string) {
    return this.postsRef.remove(postId);
  }

  deletePostFromUser(uid: string, postId: string) {
    return this.db.list<any>(`/users/${uid}/posts/`).remove(postId);
  }

  getUsers() {
    return this.usersRef.snapshotChanges();
  }

}
