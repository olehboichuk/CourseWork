import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {UserModel} from "../models/user.model";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.scss']
})
export class ProfileStudentComponent implements OnInit {
  private changeForm: FormGroup;
  public loading = true;
  private edited = true;
  private user: UserModel;

  constructor(private formBuilder: FormBuilder, private userService: UserService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = true;
    this.edited = true;
    this.changeForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.userService.getUser().subscribe(res => {
      this.user = res[0];
      this.loading = false;
    })
  }

  onEdit() {
    this.edited = false;
    this.changeForm.controls['first_name'].setValue(this.user.first_name);
    this.changeForm.controls['last_name'].setValue(this.user.last_name);
    this.changeForm.controls['email'].setValue(this.user.email);
  }

  onCancel() {
    this.edited = true;
  }

  onSave() {
    const user = <UserModel>{
      first_name: this.changeForm.get('first_name').value,
      last_name: this.changeForm.get('last_name').value,
      email: this.changeForm.get('email').value,
      about: '',
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
