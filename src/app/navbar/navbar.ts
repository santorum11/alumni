import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  isMenuOpen = false;
  isDropdownOpen: boolean[] = [false, false, false, false];

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
}
