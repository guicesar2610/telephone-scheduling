import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss',
})
export class SearchFilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<string>();
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
    const name = this.formFilter.value.name?.trim() || '';
    this.filterChanged.emit(name);
  }

  onClean() {
    this.formFilter.reset();
    this.filterChanged.emit('');
  }
}
