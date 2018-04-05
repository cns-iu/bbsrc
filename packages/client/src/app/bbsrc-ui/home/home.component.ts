import { 
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'bbsrc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @ViewChild('drawer') drawer: any;
  @Output() filterToggled = new EventEmitter<any>();

  toggleOpen = true;
  narrowWidth = 1000;
  wideWidth = 1380;
  width = this.narrowWidth;
  height = 730;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.toggleOpen = !this.toggleOpen;
    this.width = this.toggleOpen? this.narrowWidth : this.wideWidth;
    this.filterToggled.emit(this.toggleOpen);
    this.drawer.toggle();
  }

  log(data) {
    console.log(data);
  }
}
