import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersWarningComponent } from './players-warning.component';

describe('PlayersWarningComponent', () => {
  let component: PlayersWarningComponent;
  let fixture: ComponentFixture<PlayersWarningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayersWarningComponent]
    });
    fixture = TestBed.createComponent(PlayersWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
