import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  searchTerm: string = ' ';

  isLogin: Boolean = true;

  user: any;

  constructor(private router: Router, private authService: AuthService, private storeService: StorageService) { }
  ngOnInit(): void {
    this.user = this.storeService.getUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/dang-nhap']);
  }

  doSearch(description: string) {
    this.router.navigateByUrl(`/search/${description}`)
    this.searchTerm = '';
    this.scrollToTourSection();
  }

  scrollToTourSection() {
    const element = document.getElementById('tourSection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
