import { TestBed } from '@angular/core/testing';

import { ContactosService } from './contactos.service';

describe('Contactos', () => {
  let service: ContactosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
