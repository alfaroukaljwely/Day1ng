import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators , FormArray} from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-address',
  imports: [JsonPipe , ReactiveFormsModule , CommonModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent implements OnInit {
  form!: FormGroup;
  submittedData: any = null;

  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: ['', [Validators.required]],
      addresses: this.fb.array([this.createAddressGroup()])
    });
  }
createAddressGroup(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      isDefault: [false]
    });
  }
// getter for easy template access
  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }
  // add new address
  addAddress(): void {
    this.addresses.push(this.createAddressGroup());
  }

  // remove address, but ensure at least one remains
  removeAddress(index: number): void {
    if (this.addresses.length > 1) {
      this.addresses.removeAt(index);
    } else {
      alert('You must have at least one address.');
    }
  }
  // mark all controls touched to show validation
  markAllTouched(): void {
    this.form.markAllAsTouched();
    this.addresses.controls.forEach(g => (g as FormGroup).markAllAsTouched());
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.markAllTouched();
      return;
    }
     // final data
    const data = this.form.value;
    console.log('Collected data', data);
    this.submittedData = data; 
  }
  
}
