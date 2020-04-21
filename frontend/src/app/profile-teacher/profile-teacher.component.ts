import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../models/user.model";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {LanguagesList} from "../models/languagesList";

@Component({
  selector: 'app-profile-teacher',
  templateUrl: './profile-teacher.component.html',
  styleUrls: ['./profile-teacher.component.scss']
})
export class ProfileTeacherComponent implements OnInit {
  private changeForm: FormGroup;
  public loading = true;
  private edited = true;
  private user: UserModel;
  private languages: LanguagesList [];
  private langListNames= '';
  private langListIds: number[] = [];

  constructor(private formBuilder: FormBuilder, private userService: UserService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.langListIds = [];
    this.langListNames= '';
    this.loading = true;
    this.edited = true;
    this.changeForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      languages: ['', Validators.required],
      about: [''],
      email: ['', [Validators.required, Validators.email]],
    });
    this.userService.getUser().subscribe(res => {
      this.user = res[0];
      this.userService.getUserLanguages().subscribe(lang => {
        for (let i in lang) {
          this.langListNames += lang[i].name+', ';
          this.langListIds[i]=lang[i].id;
        }
        this.langListNames = this.langListNames.substring(0, this.langListNames.length - 2);
        this.userService.getLanguages().subscribe(
          allLan => {
            this.languages = allLan;
            this.loading = false;
          });
      })
    });
  }

  onEdit() {
    this.edited = false;
    this.changeForm.controls['first_name'].setValue(this.user.first_name);
    this.changeForm.controls['last_name'].setValue(this.user.last_name);
    this.changeForm.controls['email'].setValue(this.user.email);
    this.changeForm.controls['about'].setValue(this.user.about);
    this.changeForm.controls['languages'].setValue(this.langListIds);
  }

  onCancel() {
    this.edited = true;
  }

  onSave() {
    const user = <UserModel>{
      first_name: this.changeForm.get('first_name').value,
      last_name: this.changeForm.get('last_name').value,
      email: this.changeForm.get('email').value,
      about: this.changeForm.get('about').value,
      languageIds: this.changeForm.get('languages').value,
      id: this.user.id
    }
    this.loading = true;
    this.userService.updateUser(user).subscribe(res => {
      this.ngOnInit();
    }, error => {
      this.loading = false;
    });
  }
}
