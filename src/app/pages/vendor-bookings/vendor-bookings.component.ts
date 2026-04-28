import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-vendor-bookings',
  templateUrl: './vendor-bookings.component.html',
  styleUrls: ['./vendor-bookings.component.scss']
})
export class VendorBookingsComponent implements OnInit {
  bookings: any[] = [];
  loading = false;
  actionLoading: string | null = null;
  error = '';

  quoteForm = this.fb.group({ quote: [''] });
  showQuoteFor: string | null = null;

  filterStatus = '';
  statuses = ['', 'pending', 'confirmed', 'completed', 'rejected'];

  constructor(
    private bookingService: BookingService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.bookingService.getVendorBookings(this.filterStatus).subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load bookings';
        this.loading = false;
      }
    });
  }

  confirm(id: string) {
    this.actionLoading = id;
    const quote = this.quoteForm.value.quote ? Number(this.quoteForm.value.quote) : undefined;

    this.bookingService.confirmBooking(id, quote).subscribe({
      next: () => {
        this.actionLoading = null;
        this.showQuoteFor = null;
        this.load();
      },
      error: () => { this.actionLoading = null; }
    });
  }

  reject(id: string) {
    this.actionLoading = id;
    this.bookingService.rejectBooking(id).subscribe({
      next: () => { this.actionLoading = null; this.load(); },
      error: () => { this.actionLoading = null; }
    });
  }

  complete(id: string) {
    this.actionLoading = id;
    this.bookingService.completeBooking(id).subscribe({
      next: () => { this.actionLoading = null; this.load(); },
      error: () => { this.actionLoading = null; }
    });
  }

  toggleQuote(id: string) {
    this.showQuoteFor = this.showQuoteFor === id ? null : id;
    this.quoteForm.reset();
  }
}