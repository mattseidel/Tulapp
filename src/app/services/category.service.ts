import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChange,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../class/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  category: Observable<Category[]>;

  private categoryFireStore: AngularFirestoreCollection<Category>;

  constructor(private afs: AngularFirestore) {
    this.categoryFireStore = this.afs.collection<Category>('category');
    this.category = this.categoryFireStore
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Category))
      );
  }

  getPayloadDoc(payload: DocumentChange<Category>, name: string): any {
    return payload.doc.get(name);
  }

  getCategory(): void {
    this.category = this.categoryFireStore
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Category))
      );
  }

  onSaveCategory(category: Category): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        const id = this.afs.createId();
        const data = { ...category };
        const result = this.categoryFireStore.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });
  }
}
