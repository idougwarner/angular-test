import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Page } from '../page.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'smart-table-listing',
  templateUrl: './table-listing.component.html',
  styleUrls: ['./table-listing.component.scss']
})
export class TableListingComponent implements OnInit, OnChanges {
  @Input() title = '';
  @Input() showRefreshButton = false;
  @Input() showDropDownOptions = true;
  @Input() showDeleteButtons = true;
  @Input() dropDownMenu = [];
  @Input() clientSideFiltering = true;
  @Input() limit = 10;
  @Input() pageNo = 0;
  @Input() totalPages = 0;
  @Input() totalElements = 0;
  @Input() page = new Page();
  @Input() loading = false;
  @Input() externalSorting = false;
  @Input() externalPaging = false;

  @Input() set data(val: Array<{}>) {
    this.allData = val;
  }

  @Input() set columns(val: Array<{}>) {
    this.allColumns = val;
  }

  @Output() buttonClicked = new EventEmitter();
  @Output() filterUpdated = new EventEmitter();
  @Output() setPage = new EventEmitter();
  @Output() onSort = new EventEmitter();
  @Output() changePagination = new EventEmitter();

  @ViewChild('datatable', { static: false }) datatable;

  allData = [];
  allColumns = [];
  filteredData = [];
  filteredColumns = [];
  currentPage = 0;
  pageSize = 0;

  constructor(private toastr: ToastrService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.currentPage = this.pageNo;
    this.pageSize = this.limit;
  }
  ngOnChanges() {}
  pageChanged(event: any): void {
    (this.pageSize = Number(event.itemsPerPage)), (this.currentPage = event.page);
    this.changePagination.emit({
      pageSize: event.pageSize,
      page: event.page < 1 ? 0 : event.page,
      itemsPerPage: Number(event.itemsPerPage) > 0 ? Number(event.itemsPerPage) : 0
    });
  }
  buttonClickedFn(btn, data, domRef?) {
    this.buttonClicked.emit({
      btn,
      data
    });

    if (domRef) {
      domRef.hide();
    }
  }
  refreshList() {
    this.buttonClicked.emit({
      btn: 'refresh',
      data: ''
    });
  }
  getDateString(str) {
    return new Date(str).toLocaleDateString('en-GB');
  }

  setPageFn(event) {
    this.setPage.emit(event);
  }

  onSortFn(event) {
    this.onSort.emit(event);
  }

  updateFilter(event) {
    this.filteredData = event;
    this.cdr.markForCheck();
  }
  toggleCol(cols) {
    this.filteredColumns = cols;
    this.cdr.markForCheck();
  }

  isColSelected(col) {
    return this.filteredColumns.filter(c => c.name === col.name).length > 0;
  }

  exportToCSV() {
    const data = this.filteredData.map(d => {
      const filteredData = [];
      this.filteredColumns.forEach(c => {
        filteredData.push('"' + d[this.toCamelCase(c.name)] + '"');
      });

      return filteredData;
    });

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += this.filteredColumns.map(c => c.name).join(',') + '\r\n';

    csvContent += data.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  toCamelCase(str) {
    return str
      .replace(/\s(.)/g, $1 => {
        return $1.toUpperCase();
      })
      .replace(/\s/g, '')
      .replace(/^(.)/, $1 => {
        return $1.toLowerCase();
      });
  }

  copyToClipboard() {
    const data = this.filteredData.map(d => {
      const filteredData = [];
      this.filteredColumns.forEach(c => {
        filteredData.push(d[this.toCamelCase(c.name)]);
      });

      return filteredData;
    });

    let csvContent = this.filteredColumns.map(c => c.name).join('\t') + '\r\n';

    csvContent += data.map(e => e.join('\t')).join('\n');
    this.toClipboard(csvContent);
  }

  toClipboard(str) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.toastr.success('Data copied to clipboard.', 'Success!');
  }

  print() {
    const data = this.filteredData.map(d => {
      const filteredData = [];
      this.filteredColumns.forEach(c => {
        filteredData.push(d[this.toCamelCase(c.name)]);
      });

      return filteredData;
    });

    let html = '<style>table{width: 100%; text-align: center} th,td {border: 1px solid #000000}</style>';

    html += '<table cellspacing="0">';
    html += '<tr>';
    this.filteredColumns.forEach(c => {
      html += '<th>' + c.name + '</th>';
    });
    html += '</tr>';

    data.forEach(d => {
      html += '<tr>';

      d.forEach(col => {
        html += '<td>' + col + '</td>';
      });

      html += '</tr>';
    });
    html += '</body>';

    const win = window.open('', '');
    win.document.body.innerHTML = html;

    if (navigator.userAgent.match(/Trident\/\d.\d/)) {
      // IE needs to call this without a setTimeout
      win.print();
      win.close();
    } else {
      setTimeout(() => {
        win.print();
        win.close();
      }, 0);
    }
  }
}
