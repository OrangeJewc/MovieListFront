import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerButtonComponent } from './container-button.component';

describe('ContainerButtonComponent', () => {
  let component: ContainerButtonComponent;
  let fixture: ComponentFixture<ContainerButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
