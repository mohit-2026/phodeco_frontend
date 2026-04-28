import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../services/vendor.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit {
  vendor: any = null;
  recentBookings: any[] = [];
  stats = { total: 0, pending: 0, confirmed: 0, completed: 0 };
  loading = false;
  hasProfile = true;

  constructor(
    private vendorService: VendorService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading = true;

    this.vendorService.getMyProfile().subscribe({
      next: (vendor) => {
        this.vendor = vendor;
        this.loading = false;
        this.loadBookings();
      },
      error: (err) => {
        if (err.status === 404) this.hasProfile = false;
        this.loading = false;
      }
    });
  }

  loadBookings() {
    this.bookingService.getVendorBookings().subscribe({
      next: (bookings) => {
        this.recentBookings = bookings.slice(0, 5);
        this.stats.total     = bookings.length;
        this.stats.pending   = bookings.filter(b => b.status === 'pending').length;
        this.stats.confirmed = bookings.filter(b => b.status === 'confirmed').length;
        this.stats.completed = bookings.filter(b => b.status === 'completed').length;
      }
    });
  }
}