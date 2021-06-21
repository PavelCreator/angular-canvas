import { TestBed } from '@angular/core/testing';

import { MouseListenerService } from './mouse-listener.service';

describe('MouseListenerService', () => {
  let service: MouseListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MouseListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
