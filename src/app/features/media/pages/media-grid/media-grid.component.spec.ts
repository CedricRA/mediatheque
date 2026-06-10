import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaGridComponent } from './media-grid.component';

describe('MediaGridComponent', () => {
  let component: MediaGridComponent;
  let fixture: ComponentFixture<MediaGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaGridComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
