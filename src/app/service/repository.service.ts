import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private db: AngularFirestore) {
  }

  public save(collectionName: Collection, item: any): Promise<any> {
    return this.db.collection(collectionName).add(item);
  }

  public getAll(collectionName: Collection): Observable<any> {
    return this.db.collection(collectionName).valueChanges();
  }
}

export type Collection = 'recipes'
