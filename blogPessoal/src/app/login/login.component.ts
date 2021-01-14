import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin: UserLogin=  new UserLogin


  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertasService

  ) { }
 

  ngOnInit() {
  }
  entrar(){
    this.authService.logar(this.userLogin).subscribe((resp: UserLogin)=>{
      this.userLogin= resp
      environment.token = this.userLogin.token
      console.log('Esse é o nosso token'+environment.token)
      //localStorage.setItem('token', this.userLogin.token)

      this.router.navigate(['/feed'])


    },err=> {

      if(err.status==500){
        this.alert.showAlertDanger('Email ou Senha incorretos')
      }
    })





  }
}
