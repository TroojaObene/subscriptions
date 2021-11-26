import { Component, OnInit } from '@angular/core';
import { BookmarksService, Bookmarks } from 'src/app/services/bookmarks.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  private bookmarks: Observable<Bookmarks[]>
  constructor(private bookmarksService: BookmarksService) { }
  ngOnInit() {
    this.bookmarks = this.bookmarksService.askBookmarks();
  }
}
