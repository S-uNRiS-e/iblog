import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PasswordTypes } from '../login/interface/login.interface';
import { Subscription } from 'rxjs';
import { ToastrService } from 'src/app/modules/service/toastr/toastr.service';
import { AuthService } from 'src/app/modules/service/auth/auth.service';
import { RegistrationI, RegistrationIcons, RegistrationPayload, RegistrationResponce } from './interface/registration.interface';
import { NUMBERS_AND_LETTERS } from 'src/app/core/constans';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  @ViewChild('passwordRef', { read: ElementRef }) private passwordRef!: ElementRef;
  public registrationForm!: FormGroup<RegistrationI>;

  //input 
  public inputType = PasswordTypes.password as string;
  //error
  public isShowError = false
  //common 
  public eyeIcon = RegistrationIcons.closed as string;
  public cancelIcon = RegistrationIcons.cancel as string;
  //obs 
  private subscriptions: Subscription = new Subscription();


  constructor(
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._initFormGroup()
  }

  public onChangeVisibility(): void {
    switch (this.passwordRef.nativeElement.type) {
      case PasswordTypes.password:
        this.eyeIcon = RegistrationIcons.open as string;
        this.inputType = PasswordTypes.text as string;
        break;
      case PasswordTypes.text:
        this.inputType = PasswordTypes.password as string;
        this.eyeIcon = RegistrationIcons.closed as string;
        break;
      default:
        this.eyeIcon = RegistrationIcons.closed as string;
        break;
    }

  }
  public getControll(controllName: string): FormControl {
    return this.registrationForm.get(controllName) as FormControl
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
    if (this.registrationForm.valid) {
      this.isShowError = false
      const payload = {
        username:this.getControll('username').value,
        password:this.getControll('firstPassword').value
      }
      this.subscriptions.add(
        this.authService
          .registration(payload as RegistrationPayload)
          .subscribe(
            (result: RegistrationResponce) => {
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
    this.registrationForm = new FormGroup<RegistrationI>({
      username: new FormControl('', [Validators.required, Validators.pattern(NUMBERS_AND_LETTERS)]),
      firstPassword: new FormControl('', Validators.required),
      secondPassword: new FormControl('', [Validators.required,this.passwordOnSameValidator()])
    })
  }
  private passwordOnSameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const passwordValid = value && value === this.getControll('firstPassword').value

      return !passwordValid ? { passwordStrength: true } : null;
    }
  }
  ngOnDestroy(): void {

  }
}
