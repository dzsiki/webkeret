import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Idopont } from '../models/Idopont';

@Injectable({
  providedIn: 'root'
})
export class IdopontService {

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  collectionName = 'Idopontok';
  ujido?: Idopont;

  getIdopontok(asztal: string) {
    return this.afs.collection<Idopont>(this.collectionName, ref => ref.where("Asztal", "==", asztal)).valueChanges();
  }

  getValidIdopontok(asztal: string) {
    return this.afs.collection<Idopont>(this.collectionName, ref => ref.where('Foglalt', '==', false).where("Asztal", "==", asztal)).valueChanges();
  }

  foglalas(idopont: string, asztal: string){
    this.ujido= {"idopont":idopont, "Foglalt":true, Asztal:asztal};
    return this.afs.collection<Idopont>(this.collectionName).doc(asztal + idopont).set(this.ujido)
  }

  resetasztal(asztal: string){
    var pontok = this.afs.collection<Idopont>(this.collectionName, ref => ref.where("Asztal", "==", asztal).where("Foglalt","==",true)).valueChanges();
    var pontok2 = pontok.subscribe(idopontok => {
      idopontok.forEach(idopont=>{
        this.afs.collection<Idopont>(this.collectionName).doc(asztal + idopont.idopont).update({Foglalt:false});
        console.log("for");
      });  
      pontok2.unsubscribe();
      console.log("unsub");
    });
    
  }

}
