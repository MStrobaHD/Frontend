import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServerAssetComponent } from './add-server-asset.component';

describe('AddServerAssetComponent', () => {
  let component: AddServerAssetComponent;
  let fixture: ComponentFixture<AddServerAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServerAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServerAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
