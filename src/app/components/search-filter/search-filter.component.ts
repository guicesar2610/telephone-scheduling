import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
})
export class SearchFilterComponent implements OnInit {
  formFilter!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formFilter = this.formBuilder.group({
      name: [''],
    });
  }

  onFilter() {
    console.log('onFilter', this.formFilter.value);
  }

  onClean() {
    this.formFilter.reset();
  }
}
