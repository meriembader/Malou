import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiCallService } from './api-call.service';


describe('ApiCallService', () => {
  let service: ApiCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] ,
      providers: [ApiCallService]
    }),
    service = TestBed.inject(ApiCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
