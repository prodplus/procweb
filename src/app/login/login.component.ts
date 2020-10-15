import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { ModalComponent } from '../shared/modal/modal.component';
import { Mensagem } from '../utils/mensagem.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  @ViewChild('inputLogin', { static: false })
  inputLogin: ElementRef<HTMLInputElement>;
  mensagem: Mensagem;
  isLoading = false;
  @ViewChild('modal', { static: true })
  modal: ModalComponent;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inputLogin.nativeElement.focus();
    }, 100);
  }

  login() {
    this.isLoading = true;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.authService.authenticate(email, password).subscribe({
      error: (err) => {
        this.isLoading = false;
        this.modal.openPadrao(err);
        this.loginForm.reset();
        this.inputLogin.nativeElement.focus();
      },
      complete: () => {
        this.isLoading = false;
        this.router.navigate(['home']);
      },
    });
  }
}
