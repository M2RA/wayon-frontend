import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaTransferencia } from './nova-transferencia';

describe('NovaTransferencia', () => {
  let component: NovaTransferencia;
  let fixture: ComponentFixture<NovaTransferencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaTransferencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaTransferencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
