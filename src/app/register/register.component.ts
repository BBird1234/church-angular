import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChurchService } from '../church.service';
import { Church } from '../model/church';
import { Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router'; // Correct import

interface FileWithProgress {
  file: File;
  progress: number;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  productForm: FormGroup;
  productObj: Church = new Church();
  file: FileWithProgress[] = [];
  image: string = '';

  constructor(private _snackBar: MatSnackBar, private router: Router, private churchService: ChurchService) {
    this.productForm = new FormGroup({
      cname: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      // ctown: new FormControl("", [Validators.required]),
      cgender: new FormControl("", [Validators.required]),
      // address: new FormControl("", [Validators.required]),
      cdob: new FormControl("", [Validators.required]),
      image: new FormControl([], Validators.required)
    });
  }

  ngOnInit() { }

  handleFileInput(files: File[]) {
    this.prepareFilesList(files);
  }

  prepareFilesList(files: File[]) {
    for (const file of files) {
      const fileWithProgress: FileWithProgress = { file, progress: 0 };
      this.file.push(fileWithProgress);
    }
    this.uploadFilesSimulator(0);
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.file.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.file[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.file[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  onClickSubmitForm() {
    if (!this.productForm.invalid) {
      console.log(this.productForm.value);
      this.productObj.cname = this.productForm.value.cname;
      this.productObj.email = this.productForm.value.email;
      this.productObj.cgender = this.productForm.value.cgender;
      // this.productObj.address = this.productForm.value.address;
      this.productObj.cdob= this.productForm.value.cdob;
      this.productObj.image = this.base64code;
      this.churchService.addmember1(this.productObj).subscribe(data => console.log(data));
      this.router.navigateByUrl('');
    } else {
      this.popup('Input error', 'Retry');
    }
  }

  popup(var1: string, var2: string | undefined) {
    this._snackBar.open(var1, var2, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  myImage!: Observable<any>;
  base64code!: any;

  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((d) => {
      this.myImage = d;
      this.base64code = d;
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    };
  }
}
