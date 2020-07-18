import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'exl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const el = document.createElement('link');
    el.setAttribute('rel', 'stylesheet');
    document.head.appendChild(el);
    el.setAttribute('href', './themes/green-theme.css');
  }
}
