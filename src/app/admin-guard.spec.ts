import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Api } from './api';
import { AdminGuard } from './admin-guard';


describe('AdminGuard', () => {
  let guard: AdminGuard;
  let apiMock: jasmine.SpyObj<Api>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    apiMock = jasmine.createSpyObj('Api', ['getToken']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: Api, useValue: apiMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AdminGuard);
  });

  it('should allow activation if token exists', () => {
    apiMock.getToken.and.returnValue('SOME_TOKEN');
    expect(guard.canActivate()).toBeTrue();
  });

  it('should navigate and block activation if token is missing', () => {
    apiMock.getToken.and.returnValue(null);
    expect(guard.canActivate()).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/landing']);
  });
});
