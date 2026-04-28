import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit {
  hasProfile = false;
  loading = false;
  saving = false;
  success = '';
  error = '';

  categories = ['photography', 'catering', 'decor', 'mehendi', 'music', 'makeup', 'venue'];

  form = this.fb.group({
    businessName: ['', Validators.required],
    category:     ['', Validators.required],
    city:         ['', Validators.required],
    bio:          [''],
    minPrice:     [''],
    maxPrice:     ['']
  });

  constructor(private fb: FormBuilder, private vendorService: VendorService) {}

  ngOnInit() {
    this.loading = true;
    this.vendorService.getMyProfile().subscribe({
      next: (vendor) => {
        this.hasProfile = true;
        this.form.patchValue({
          businessName: vendor.businessName,
          category:     vendor.category,
          city:         vendor.city,
          bio:          vendor.bio,
          minPrice:     vendor.priceRange?.min,
          maxPrice:     vendor.priceRange?.max
        });
        this.loading = false;
      },
      error: () => {
        this.hasProfile = false;
        this.loading = false;
      }
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.saving = true;
    this.success = '';
    this.error = '';

    const payload = {
      businessName: this.form.value.businessName,
      category:     this.form.value.category,
      city:         this.form.value.city,
      bio:          this.form.value.bio,
      priceRange: {
        min: Number(this.form.value.minPrice),
        max: Number(this.form.value.maxPrice)
      }
    };

    const request = this.hasProfile
      ? this.vendorService.updateProfile(payload)
      : this.vendorService.createProfile(payload);

    request.subscribe({
      next: () => {
        this.success = 'Profile saved successfully!';
        this.hasProfile = true;
        this.saving = false;
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Failed to save profile';
        this.saving = false;
      }
    });
  }
}