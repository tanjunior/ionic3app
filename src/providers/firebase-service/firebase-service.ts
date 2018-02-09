import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Post } from '../../models/post/post.model';
import { User } from '../../models/user/user.model';

@Injectable()
export class FirebaseService {
  private postsRef = this.db.list<any>('/posts');
  private usersRef = this.db.list<any>('/users');
  

  constructor(public db: AngularFireDatabase) {
    
  }

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

  getUser(id: string) {
    var user: User;
    this.db.object(`/users/${id}`).snapshotChanges().subscribe(currentUser => { // Get database of current user uid
      user = currentUser.payload.val();
    });
    return user;
  }

  getUsers() {
    return this.usersRef.snapshotChanges();
  }

  deleteUser(user: User) {
    return this.usersRef.remove(user.key);
  }

  editUser(user: User) {
    return this.usersRef.update(user.key, user);
  }  

}
