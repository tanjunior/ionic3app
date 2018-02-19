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

  editPost(post: Post) {
    return this.postsRef.update(post.key, post);
  }

  deletePost(post: Post) {
    return this.postsRef.remove(post.key);
  }

  deletePostFromUser(uid: string, post: Post) {
    return this.db.list<any>(`/users/${uid}/posts/`).remove(post.key);
  }

  getUsers() {
    return this.usersRef.snapshotChanges();
  }

}
