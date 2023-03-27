import { ToastrService } from './../../../modules/service/toastr/toastr.service';
import { AuthService } from './../../../modules/service/auth/auth.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NUMBERS_AND_LETTERS } from 'src/app/core/constans';
import { LoginI, LoginIcons, LoginPayload, LoginResponce, PasswordTypes } from './interface/login.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('passwordRef', { read: ElementRef }) private passwordRef!: ElementRef;
  public loginForm!: FormGroup<LoginI>;

  //input 
  public inputType = PasswordTypes.password as string;
  //error
  public isShowError = false
  //common 
  public eyeIcon = LoginIcons.closed as string;
  public cancelIcon = LoginIcons.cancel as string;
  //obs 
  private subscriptions: Subscription = new Subscription();


  constructor(
    private toastrService:ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._initFormGroup()
  }

  public onChangeVisibility(): void {
    switch (this.passwordRef.nativeElement.type) {
      case PasswordTypes.password:
        this.eyeIcon = LoginIcons.open as string;
        this.inputType = PasswordTypes.text as string;
        break;
      case PasswordTypes.text:
        this.inputType = PasswordTypes.password as string;
        this.eyeIcon = LoginIcons.closed as string;
        break;
      default:
        this.eyeIcon = LoginIcons.closed as string;
        break;
    }

  }
  public getControll(controllName: string): FormControl {
    return this.loginForm.get(controllName) as FormControl
  }
  public onChange(controllName: string): void {
    this.getControll(controllName).valueChanges.subscribe((val: string) => {
      this.isShowError = true
      if (new RegExp(NUMBERS_AND_LETTERS).test(val)) {
        this.isShowError = false
      }
    })
  }
  public onSubmit(): void {
    this.isShowError = true
    if (this.loginForm.valid) {
      this.isShowError = false
      this.subscriptions.add(
        this.authService
          .login(this.loginForm.value as LoginPayload)
          .subscribe(
            (result: LoginResponce) => {
              const { accessToken, refreshToken, user: { username, id } } = result;
              localStorage.setItem('blog-token', accessToken)
              this.router.navigate(['/main'])
            },
            (error) => {
              this.toastrService.showError(error.error.message)
            }
          )
      )

    }

  }
  private _initFormGroup(): void {
    this.loginForm = new FormGroup<LoginI>({
      username: new FormControl('', [Validators.required, Validators.pattern(NUMBERS_AND_LETTERS)]),
      password: new FormControl('', Validators.required),
    })
  }

  ngOnDestroy(): void {
    this.subscriptions && this.subscriptions.unsubscribe();
  }
}
