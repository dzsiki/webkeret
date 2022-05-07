import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = 'Users';

  constructor(private afs: AngularFirestore) { }
  create(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getAll() {
    return this.afs.collection<User>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).valueChanges();
  }

  update(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  delete(id: string) {
    console.log("Users/"+id);
    
    var curruser = this.afs.collection<User>(this.collectionName, ref => ref.where("id", "==", id)).valueChanges();
    var curruser2 = curruser.subscribe(currusers => {
      currusers.forEach(asd=>{
        this.afs.collection<User>(this.collectionName).doc(asd.id).delete();
        console.log("for");
      });  
      curruser2.unsubscribe();
      console.log("unsub");
    });
  }
}
