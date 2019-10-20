import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerAssetComponent } from './server-asset.component';

describe('ServerAssetComponent', () => {
  let component: ServerAssetComponent;
  let fixture: ComponentFixture<ServerAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
