import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Details } from '../details';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app.state';
import { addPost, updatePost } from '../state/post.actions';
import { getPostById } from '../state/post.selector';
import { DashboardComponent } from '../dashboard/dashboard.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


  registerForm: FormGroup;
    submitted = false;
    details: Details
  usersJson: any[];
 

  constructor(private formBuilder: FormBuilder,private httpClient:HttpClient,private route:ActivatedRoute,private router:Router,private store:Store<AppState>) { }

  post: Details;
  id2 :any
  isAddMode:any
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{

      const id = params.get('id');
      this.id2 = params.get('id')
      console.log(id);
      this.store.select(getPostById,{id}).subscribe(data=>{
        this.post = data
        console.log(this.post)
        console.log(data)
      })
    });

    this.isAddMode = !this.id2;

    this.date = new Date()

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile:['',[Validators.required,Validators.pattern("[0-9]{10}")]],
      address:['',[Validators.required]],
     
  });

  if(!this.isAddMode){
    this.registerForm.patchValue(this.post)
      this.details = this.post;
      
  }
  }

  get f() { return this.registerForm.controls; }

  formValue:any

  existingData:any = []

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }

    if(this.isAddMode){
      this.createUser()
    }

    else{
     this.updateUser()
    }

        
}


format1: string = "";
date: Date;

createUser() {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your registration is successful',
    showConfirmButton: false,
   
  })
   
    const post : Details ={
      firstName:this.registerForm.value.firstName,
      lastName:this.registerForm.value.lastName,
      email:this.registerForm.value.email,
      mobile:this.registerForm.value.mobile,
      address:this.registerForm.value.address,
      date:this.registerForm.value.date
      
    };

    post['date'] = new Date().toLocaleString()
    
    console.log(post)
    this.store.dispatch(addPost({post}));
    

    
    this.router.navigate(['/dashboard'])

    
    
}
updateUser() {
 
  const firstName = this.registerForm.value.firstName;
  const lastName = this.registerForm.value.lastName;
  const email = this.registerForm.value.email;
  const mobile = this.registerForm.value.mobile;
  const address = this.registerForm.value.address;
  const date = new Date().toLocaleString()
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Details Updated',
    showConfirmButton: false,
    
  })
  const post: Details={
    id:this.post.id,
    firstName,lastName,email,mobile,address,date
  };

  this.store.dispatch(updatePost({post}));
  
  this.router.navigate(['/dashboard'])

}
}

