import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }


  deleteacc(){
    var user =this.authService.currentuser();

    user.then(cuser =>{
      try {
        
      if(cuser){
      console.log(cuser.uid);
      this.userService.delete(cuser.uid as string);
      cuser.delete();
      this.authService.logout();
      this.router.navigateByUrl('/main');
      
      }
      }catch (error) {
        
      }
    }).catch(error => {
      console.error(error);
    });
  }
}
