import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChurchService } from '../church.service';



@Component({
  selector: 'app-updatepage',
  templateUrl: './updatepage.component.html',
  styleUrl: './updatepage.component.css'
})
export class UpdatepageComponent {updateCustomerForm!: FormGroup;

  cid:number=this.activatedRoute.snapshot.params['id'];
  constructor(private activatedRoute: ActivatedRoute,
    private service: ChurchService,
    private fb: FormBuilder,
    private router:Router){}
   

    ngOnInit() {
      this.updateCustomerForm = this.fb.group({
        cname: [null],
        email: [null, [Validators.email]],
        cgender: [null]
      });
      this.getmemberById();
    }
    

   getmemberById(){
      this.service.getmemberById(this.cid).subscribe((res) =>{
        console.log(res);
        this.updateCustomerForm.patchValue(res);
        
      })
    }

    updatemember(){
      this.service.updatemember(this.cid, this.updateCustomerForm.value).subscribe((res) =>{
        console.log(res);
        this.router.navigateByUrl("");
        
      })
    }

     
}
