import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSolutionListComponent } from './group-solution-list.component';

describe('GroupSolutionListComponent', () => {
  let component: GroupSolutionListComponent;
  let fixture: ComponentFixture<GroupSolutionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSolutionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSolutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
