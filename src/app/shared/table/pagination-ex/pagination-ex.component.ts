import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'smart-pagination-ex',
  templateUrl: './pagination-ex.component.html',
  styleUrls: ['./pagination-ex.component.scss']
})
export class PaginationExComponent implements OnInit {
  @Output() changePagination = new EventEmitter();
  currentPage = 0;
  pageSize = 0;

  @Input() totalPages = 0;
  @Input() totalElements = 0;
  @Input() itemsPerPage = 5;
  @Input() pageNo = 0;

  constructor() {}

  ngOnInit() {
    this.currentPage = this.pageNo;
    this.pageSize = this.itemsPerPage;
  }

  pageChanged(event: any): void {
    this.changePagination.emit({
      pageSize: Number(this.pageSize),
      page: event.page < 1 ? 0 : event.page - 1,
      itemsPerPage: Number(event.itemsPerPage) > 0 ? Number(event.itemsPerPage) : 0
    });
  }
}
