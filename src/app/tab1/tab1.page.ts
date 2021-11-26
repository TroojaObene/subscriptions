import { Component, OnInit } from '@angular/core';
import { BookmarksService, Bookmarks } from 'src/app/services/bookmarks.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  private bookmarks: Observable<Bookmarks[]>
  constructor(private bookmarksService: BookmarksService) { }
  ngOnInit() {
    this.bookmarks = this.bookmarksService.askBookmarks();
  }
}
