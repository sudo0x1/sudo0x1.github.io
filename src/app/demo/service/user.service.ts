import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../domain/User';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/config/api.url.config';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getAllUsers():Observable<any> {
        return this.http.get<any>(API_URLS.USERS_URL);
    }
    getAllClients():Observable<any> {
        return this.http.get<any>(API_URLS.USERS_URL+"all-clients");
    }
    saveUser(user:any):Observable<any>{
        return this.http.post<any>(API_URLS.USERS_URL,user);
    }
    saveClient(user:any):Observable<any>{
        return this.http.post<any>(API_URLS.USERS_URL+"client",user);
    }

    updateUser(id:number,user:User):Observable<any>{
        return this.http.put<any>(API_URLS.USERS_URL+id,user);
    }
    deleteUser(id:number):Observable<any>{
        return this.http.delete(API_URLS.USERS_URL+id);
    }
    getUserById(id:number):Observable<any>{
        return this.http.get(API_URLS.USERS_URL+id);
    }
   
    transferArgent(data:any):Observable<any>{
        return this.http.post(API_URLS.USERS_URL+`transfer`,data);
    }
    getHistoriqueTransactions(clientId:number):Observable<any>{
        return this.http.get(API_URLS.USERS_URL+`historique/${clientId}`);
    }
   
    enableUser(clientId:any):Observable<any>{
        return this.http.put(API_URLS.USERS_URL+`enable-client/${clientId}`,{});
    }

}
