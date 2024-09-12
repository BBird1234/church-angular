import { Component, OnInit } from '@angular/core';
import { ChurchService } from '../church.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
 
})
export class LandingComponent implements OnInit {
  members: any = [];
  updateForm: FormGroup;
  selectedMember: any;

  constructor(
    private httpClient: HttpClient,
    private churchService: ChurchService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      cname: [''],
      cgender: [''],
      email: [''],
      cdob: ['']
    });
  }

  ngOnInit(): void {
    this.getAllmember();
  }

  private getAllmember() {
    this.churchService.getAllmember().subscribe(data => {
      this.members = data;
    });
  }

  goToMember(cid: any): void {
    this.router.navigate(["detail/" + cid]);
  }

  searchText: string = '';

  onSearchTextEntered(searchValue: string): void {
    this.searchText = searchValue;
    console.log(this.searchText);
  }

  deletemember(cid: number): void {
    this.churchService.deletemember(cid).subscribe((res) => {
      this.getAllmember();
    });
  }

  openModel(member: any) {
    this.selectedMember = member;
    this.updateForm.patchValue({
      cname: member.cname,
      cgender: member.cgender,
      email: member.email,
      cdob: member.cdob
    });
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  CloseModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  updateMember() {
    if (this.updateForm.valid) {
      this.churchService.updatemember(this.selectedMember.cid, this.updateForm.value).subscribe((res) => {
        console.log('Member updated successfully:', res);
        this.getAllmember();
        this.CloseModel();
      }, (error) => {
        console.error('Error updating member:', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
