import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFiltersComponent } from './media-filters.component';

describe('MediaFiltersComponent', () => {
  let component: MediaFiltersComponent;
  let fixture: ComponentFixture<MediaFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaFiltersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
