import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, asNativeElements } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  placeholder:string = '';

  @Input()
  initialValue:string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  @ViewChild('txtInput')
  txtInput!:ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime( 1000 )
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
    });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  public emitSearchTerm( searchTerm:string ):void{
    this.onValue.emit( searchTerm );
  }

  onKeyPress( searchTerm: string):void{
    this.debouncer.next( searchTerm )
  }
}
