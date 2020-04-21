import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterTeacherComponent} from "./register-teacher/register-teacher.component";
import {RegisterStudentComponent} from "./register-student/register-student.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ProfileStudentComponent} from "./profile-student/profile-student.component";
import {ProfileTeacherComponent} from "./profile-teacher/profile-teacher.component";
import {VerificationComponent} from "./verification/verification.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register-teacher', component: RegisterTeacherComponent},
  {path: 'register-student', component: RegisterStudentComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'teacher-profile', component: ProfileTeacherComponent},
  {path: 'student-profile', component: ProfileStudentComponent},
  {path: 'verify', component: VerificationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
