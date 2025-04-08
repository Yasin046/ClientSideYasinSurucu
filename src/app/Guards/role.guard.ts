import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'];
    const currentRole = this.authService.getUserRole();
    if (currentRole && expectedRoles.includes(currentRole)) {
      return true;
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
