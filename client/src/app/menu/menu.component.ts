import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObserverService } from 'src/services/observer.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  opened = true;
  subscription : any = null;

  constructor(private observer : ObserverService) { 

  }

  ngOnInit(): void {
    this.subscription = this.observer.subscribe('menu-toggle', (data : any) => {
      this.opened = !this.opened;
    });
  }

  ngOnDestroy(): void {
    this.observer.unsubscribe(this.subscription);
  }

}
