import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserModel} from "../models/user.model";
import {LanguagesList} from "../models/languagesList";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userURL = 'http://localhost:3000/api/user/profile';
  private userRoleURL = 'http://localhost:3000/api/user/role';
  private userLanguagesURL = 'http://localhost:3000/api/user/languages';
  private languagesURL = 'http://localhost:3000/api/languages';

  constructor(private http: HttpClient, private router: Router) {
  }

  getUser() {
    return this.http.get<UserModel>(this.userURL);
  }

  getUserRole() {
    return this.http.get(this.userRoleURL);
  }

  updateUser(user: UserModel) {
    return this.http.put<UserModel>(this.userURL, user);
  }

  getUserLanguages() {
    return this.http.get<LanguagesList[]>(this.userLanguagesURL);
  }

  getLanguages() {
    return this.http.get<LanguagesList[]>(this.languagesURL);
  }
}
