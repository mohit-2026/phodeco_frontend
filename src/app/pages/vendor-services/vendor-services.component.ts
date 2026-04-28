import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'app-vendor-services',
  templateUrl: './vendor-services.component.html',
  styleUrls: ['./vendor-services.component.scss']
})
export class VendorServicesComponent implements OnInit {
  services: any[] = [];
  loading = false;
  saving = false;
  error = '';
  success = '';
  showForm = false;
  editingId: string | null = null;

  form = this.fb.group({
    title:       ['', Validators.required],
    description: [''],
    priceFrom:   ['', Validators.required],
    priceTo:     [''],
    duration:    ['']
  });

  constructor(private fb: FormBuilder, private vendorService: VendorService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.vendorService.getMyServices().subscribe({
      next: (services) => { this.services = services; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  openAdd() {
    this.editingId = null;
    this.form.reset();
    this.showForm = true;
    this.success = '';
    this.error = '';
  }

  openEdit(service: any) {
    this.editingId = service._id;
    this.form.patchValue({
      title:       service.title,
      description: service.description,
      priceFrom:   service.priceFrom,
      priceTo:     service.priceTo,
      duration:    service.duration
    });
    this.showForm = true;
    this.success = '';
    this.error = '';
  }

  submit() {
    if (this.form.invalid) return;
    this.saving = true;
    this.error = '';

    const payload = {
      title:       this.form.value.title,
      description: this.form.value.description,
      priceFrom:   Number(this.form.value.priceFrom),
      priceTo:     Number(this.form.value.priceTo),
      duration:    this.form.value.duration
    };

    const request = this.editingId
      ? this.vendorService.updateService(this.editingId, payload)
      : this.vendorService.createService(payload);

    request.subscribe({
      next: () => {
        this.success = this.editingId ? 'Service updated!' : 'Service added!';
        this.saving = false;
        this.showForm = false;
        this.load();
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Failed to save service';
        this.saving = false;
      }
    });
  }

  delete(id: string) {
    if (!confirm('Delete this service?')) return;
    this.vendorService.deleteService(id).subscribe({
      next: () => this.load()
    });
  }

  cancel() {
    this.showForm = false;
    this.form.reset();
    this.editingId = null;
  }
}