import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Image } from '../../../shared/models/Image';
import { Comment } from '../../../shared/models/Comment';
import { GalleryService } from '../../../shared/services/gallery.service';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/User';
import { IdopontService } from 'src/app/shared/services/idopont.service';
import { Idopont } from 'src/app/shared/models/Idopont';


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnChanges {

  @Input() imageInput?: Image;
  loadedImage?: string;
  user?: User;
  idopontok?: any = ["asd","ew"];

  osszesidopont: Array<Idopont> = [];

  commentsForm = this.createForm({
    id: '',
    username: '',
    idopont: '',
    comment: '',
    date: 0,
    imageId: this.imageInput?.id
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private galleryService: GalleryService,
    private userService: UserService,
    private idopontService: IdopontService
    ) { }

  ngOnChanges(): void {
    if (this.imageInput?.id) {
      this.commentsForm.get('imageId')?.setValue(this.imageInput.id);
      this.galleryService.loadImage(this.imageInput.url).subscribe(data => {
        this.loadedImage = data;
      });
      this.idopontService.getValidIdopontok(this.imageInput.id).subscribe(idopontok => {this.idopontok = idopontok;});
      this.idopontService.getIdopontok(this.imageInput.id).subscribe(idopontok => {this.osszesidopont = idopontok;});
    }
    
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.commentsForm.get('username')?.setValue(this.user?.name.firstname + " " + this.user?.name.lastname);
    }, error => {
      console.error(error);
    });

  }

  createForm(model: Comment) {
    let formGroup = this.fb.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get("idopont")?.addValidators([Validators.required])
    
    return formGroup;
  }

  convertStringtoNumber(szoveg:string){
    return Number(szoveg);
  }

  addComment() {
    if (this.commentsForm.valid) {
      if (this.imageInput?.id) {
        this.idopontService.foglalas(this.commentsForm.get("idopont")?.value,this.imageInput?.id).then(_ => {
          this.router.navigateByUrl('/gallery/successful/' + this.commentsForm.get('username')?.value);
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }

  resetfoglalt(){
    if(this.imageInput)
    this.idopontService.resetasztal(this.imageInput.id);
  }

}
