import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CurrentUserServiceService } from '../services/current-user.service';
import { Observable, filter, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) :Observable<boolean> => {
  const localData = sessionStorage.getItem('loginToken');

  const router = inject(Router);
  const currenServiceUser = inject(CurrentUserServiceService);

 return currenServiceUser.getCurrentUser().pipe(
  map((currentUser) => {
  if(!currentUser || currentUser === undefined ){
   router.navigateByUrl('/login');
    return false;
  }
  return true;
 }));

}
