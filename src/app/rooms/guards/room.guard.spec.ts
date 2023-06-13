import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { RoomGuard } from './room.guard';

describe('roomGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => RoomGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
