import { TestBed } from '@angular/core/testing';

import { TransferenciasService } from './transferencias-service.service';

describe('TransferenciasService', () => {
  let service: TransferenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
