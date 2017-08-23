import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'list-filter',
  template: `
    <div style="display: flex;">
      <input [(ngModel)]="searchTerm" [placeholder]="placeholder" class="form-control" (ngModelChange)="updateSearchTerm($event)"/>
      <span class="fa fa-search fa-2x" style="position: absolute; right: 0; margin-right: 15px; margin-top: 9px; color: gray;"></span>
    </div>
  `,
  styles: [`
    .form-control {
      height: 50px;
      background-color: #E2E2E2;
    }
  `]
})
export class ListFilterComponent implements OnInit {

  @Input() placeholder: string;
  searchTerm: string;

  constructor() { }

  ngOnInit() {
  }

  updateSearchTerm(str) {
    this.searchTerm = str;
  }

}
