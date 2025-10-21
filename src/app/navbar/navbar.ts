import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../api';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  providers: [Api],
})
export class Navbar implements OnInit {
  isMenuOpen = false;
  isDropdownOpen: boolean[] = [false, false, false, false];
  isLoggedIn = false;

  constructor(private router: Router, private api: Api) {}


  ngOnInit() {
    // Check if user is logged in
    this.isLoggedIn = !!this.api.getToken();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isDropdownOpen = [false, false, false, false];
  }

  toggleDropdown(idx: number) {
    this.isDropdownOpen = this.isDropdownOpen.map((_, i) => i === idx ? !this.isDropdownOpen[idx] : false);
  }

  closeAll() {
    this.isMenuOpen = false;
    this.isDropdownOpen = [false, false, false, false];
  }

  goToAdminPanel() {
    this.router.navigate(['/landing']);
    this.closeAll();
  }

  logout() {
    localStorage.removeItem('adminAuthToken');
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
    this.closeAll();
  }
}
