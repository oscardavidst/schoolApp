import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [],
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent {
  @Input() public tag: string = '';
  @Output() public onSearchValue = new EventEmitter<string>();

  emitValue(value: string): void {
    this.onSearchValue.emit(value);
  }
}
