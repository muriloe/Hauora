import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-anamnese-card',
  templateUrl: './anamnese-card.component.html',
  styleUrls: ['./anamnese-card.component.scss'],
})
export class AnamneseCardComponent implements OnInit {
  imagePath: 'http://ec2-54-191-75-41.us-west-2.compute.amazonaws.com:3000/uploads/5ac9cc857ec7ab7d729998a8.jpeg';
  constructor() {imagePath: 'http://ec2-54-191-75-41.us-west-2.compute.amazonaws.com:3000/uploads/5ac9cc857ec7ab7d729998a8.jpeg'; }

  ngOnInit() {
  }

}
