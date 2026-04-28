import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  categories = [
    { icon: '📷', label: 'Photography',  value: 'photography' },
    { icon: '🍽️', label: 'Catering',     value: 'catering' },
    { icon: '🌸', label: 'Decor',        value: 'decor' },
    { icon: '🎨', label: 'Mehendi',      value: 'mehendi' },
    { icon: '🎵', label: 'Music',        value: 'music' },
    { icon: '💄', label: 'Makeup',       value: 'makeup' },
    { icon: '🏛️', label: 'Venue',        value: 'venue' },
  ];

  steps = [
    { icon: '🔍', title: 'Browse Vendors',   desc: 'Search verified vendors by category and city' },
    { icon: '📋', title: 'View Profiles',    desc: 'Check portfolios, services, pricing and reviews' },
    { icon: '📅', title: 'Send Request',     desc: 'Pick a service and send a booking request' },
    { icon: '🎉', title: 'Plan Your Day',    desc: 'Confirm your vendor and plan your perfect wedding' },
  ];

  constructor(private router: Router) {}

  browseCategory(category: string) {
    this.router.navigate(['/vendors'], { queryParams: { category } });
  }
}