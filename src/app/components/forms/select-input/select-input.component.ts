import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
 
@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css']
})
export class SelectInputComponent implements ControlValueAccessor {
 
  @Input() label: string;
  @Input() class: string;
  @Input() autoComplete: string;
  @Input() optionsValue;
 
  constructor(@Self() public ngControl: NgControl) { 
    this.ngControl.valueAccessor = this;
  }
 
  writeValue(obj: any): void {
  }
 
  registerOnChange(fn: any): void {
  }
 
  registerOnTouched(fn: any): void {
  }
 
}