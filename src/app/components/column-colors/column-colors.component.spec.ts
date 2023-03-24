import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnColorsComponent } from './column-colors.component';

describe('ColumnColorsComponent', () => {
  let component: ColumnColorsComponent;
  let fixture: ComponentFixture<ColumnColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnColorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
