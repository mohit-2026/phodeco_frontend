import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorService } from '../../services/vendor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendor-search',
  templateUrl: './vendor-search.component.html',
  styleUrls: ['./vendor-search.component.scss']
})
export class VendorSearchComponent implements OnInit {
  vendors: any[] = [];
  total = 0;
  pages = 0;
  currentPage = 1;
  loading = false;
  error = '';
  private route: ActivatedRoute

  categories = [
    { value: '', label: 'All Categories' },
    { value: 'photography', label: 'Photography' },
    { value: 'catering', label: 'Catering' },
    { value: 'decor', label: 'Decor' },
    { value: 'mehendi', label: 'Mehendi' },
    { value: 'music', label: 'Music' },
    { value: 'makeup', label: 'Makeup' },
    { value: 'venue', label: 'Venue' },
  ];

  filterForm = this.fb.group({
    category:  [''],
    city:      [''],
    minRating: [''],
    minPrice:  [''],
    maxPrice:  ['']
  });

  constructor(
    private fb: FormBuilder,
    private vendorService: VendorService,
    private router: Router
  ) {}

 ngOnInit() {
  this.route.queryParams.subscribe(params => {
    if (params['category']) {
      this.filterForm.patchValue({ category: params['category'] });
    }
    this.search();
  });
}

  search(page: number = 1) {
    this.loading = true;
    this.error = '';
    this.currentPage = page;

    const filters = { ...this.filterForm.value, page, limit: 9 };

    this.vendorService.searchVendors(filters).subscribe({
      next: (res: any) => {
        this.vendors = res.vendors;
        this.total   = res.total;
        this.pages   = res.pages;
        this.loading = false;
      },
      error: () => {
        this.error   = 'Failed to load vendors';
        this.loading = false;
      }
    });
  }

  goToVendor(id: string) {
    this.router.navigate(['/vendors', id]);
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  }

  getCategoryLabel(value: string): string {
    return this.categories.find(c => c.value === value)?.label || value;
  }

  get pageArray(): number[] {
    return Array.from({ length: this.pages }, (_, i) => i + 1);
  }
}