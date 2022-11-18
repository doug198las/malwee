import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  constructor(private httpSerivce : HttpService) { }

  ngOnInit(): void {
  }

  public click(){
    this.httpSerivce.get('group').then((data) => {
      console.log(data);
    });
  }

}
