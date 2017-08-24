import { Component, OnInit, Input } from '@angular/core';
// (click)="select()" [class.active]="selected == true"
@Component({
  selector: 'container-button',
  template: `
    <div>
      <button class="btn btn-grey btn-full" [class.active]="selected == true">{{text}}</button>
    </div>
  `,
  styleUrls: ['./container-button.component.css']
})
export class ContainerButtonComponent implements OnInit {

  @Input() text: string;
  @Input() selected: boolean;

  constructor() { }

  ngOnInit() {
    // this.selected = false;
  }

}
