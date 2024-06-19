import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, asNativeElements } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {
  @Input()
  placeholder:string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @ViewChild('txtInput')
  txtInput!:ElementRef<HTMLInputElement>;


  public emitSearchTerm( searchTerm:string ):void{
    this.onValue.emit( searchTerm );
  }
}
