import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'smart-table-toolbar',
  templateUrl: './table-toolbar.component.html',
  styleUrls: ['./table-toolbar.component.scss']
})
export class TableToolbarComponent implements OnInit, OnChanges {
  @Output() filterUpdated = new EventEmitter();
  @Output() changeFilter = new EventEmitter();
  @Output() columnUpdated = new EventEmitter();

  @Input() showFilter = true;
  @Input() showControls = true;
  @Input() set data(val: Array<{}>) {
    this.filteredData = val;
    this.allData = val;
    this.filterString = '';
    this.filterUpdated.emit(this.filteredData);
  }

  @Input() set columns(val: Array<{}>) {
    this.allColumns = val;
    this.filteredColumns = val;
    this.columnUpdated.emit(this.filteredColumns);
  }

  @Input() clusterType = false;

  allData = [];
  allColumns = [];
  filteredData = [];
  filteredColumns = [];
  filterString = '';

  constructor(private toastr: ToastrService) {}

  ngOnInit() {}
  ngOnChanges() {}

  updateFilter() {
    const val = this.filterString.toLowerCase();

    this.filteredData = this.allData.filter(d => {
      return (
        JSON.stringify(Object.values(d))
          .toLowerCase()
          .indexOf(val) !== -1 || !val
      );
    });
    this.filterUpdated.emit(this.filteredData);
    this.changeFilter.emit(this.filterString);
  }

  toggleCol(col) {
    if (this.isColSelected(col)) {
      this.filteredColumns = this.filteredColumns.filter(c => c.name !== col.name);
    } else {
      const colNames = this.filteredColumns.map(c => c.name);
      this.filteredColumns = this.allColumns.filter(c => colNames.indexOf(c.name) > -1 || col.name === c.name);
    }
    this.columnUpdated.emit(this.filteredColumns);
  }

  isColSelected(col) {
    return this.filteredColumns.filter(c => c.name === col.name).length > 0;
  }

  getDataforExporting() {
    const data = this.filteredData.map(d => {
      const filteredData = [];
      this.filteredColumns.forEach(c => {
        filteredData.push(
          '' +
            (typeof d[this.toCamelCase(c.name)] == undefined || d[this.toCamelCase(c.name)] == null
              ? ''
              : d[this.toCamelCase(c.name)]) +
            ''
        );
      });

      return filteredData;
    });

    let csvContent = '';
    csvContent += this.filteredColumns.map(c => c.title || '').join(',') + '\r\n';
    csvContent += data.map(e => e.join(',')).join('\r\n');
    return csvContent;
  }

  exportToCSV() {
    let csvContent = this.getDataforExporting();
    let filename = 'reports.csv';
    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      var link = document.createElement('a');
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
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
    this.toClipboard(this.getDataforExporting());
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
        filteredData.push(
          typeof d[this.toCamelCase(c.name)] == undefined || d[this.toCamelCase(c.name)] == null
            ? ''
            : d[this.toCamelCase(c.name)]
        );
      });

      return filteredData;
    });

    let html = '<style>table{width: 100%; text-align: center} th,td {border: 1px solid #000000}</style>';

    html += '<table cellspacing="0">';
    html += '<tr>';
    this.filteredColumns.forEach(c => {
      html += '<th>' + c.title + '</th>';
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
