import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Role } from '../domain/role';
import { Observable } from 'rxjs';
const ROLES_API = 'http://127.0.0.1:8080/api/v1/roles/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable()
export class RoleService {

    constructor(private http: HttpClient) { }
    getAllRoles():Observable<any> {
        return this.http.get<any>(ROLES_API);
    }
    saveRole(role:Role):Observable<any>{
        return this.http.post(ROLES_API,role);
    }
    updateRole(id:number,role:Role):Observable<any>{
        return this.http.put(ROLES_API+id,role);
    }
    deleteRole(id:number):Observable<any>{
        return this.http.delete(ROLES_API+id);
    }
    
    

}
