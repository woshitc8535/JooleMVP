import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup

  constructor(private fb: FormBuilder, public authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      passwordChecker: ['', [Validators.required]]
    }, {updateOn: 'blur'});
  }
  onSubmit(){
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      this.authService.createUser(this.username.value, this.password.value);
      console.log(this.username.value, this.password.value);
    }
  }
  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get passwordChecker() {
    return this.registerForm.get('passwordChecker');
  }
}
