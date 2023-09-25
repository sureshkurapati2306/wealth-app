import { Injectable } from '@angular/core';


@Injectable()
export class DownloadService {

    downloadFile(headers, items, metadata, filename) {
        if (headers) {
            items.unshift(headers);
        }
    
        // Convert Object to JSON
        const jsonObject = JSON.stringify(items);
    
        let csv = this.convertToCSV(jsonObject);
    
        const exportedFilename = filename + '.csv' || 'export.csv';

        csv = `"${metadata}"\n\r${csv}`;
    
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        const isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        const link = document.createElement("a");

        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportedFilename);
        }else if(isSafariBrowser) {
            link.setAttribute("target", "_blank");
        } else {
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", exportedFilename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    convertToCSV(objArray) {
        const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
    
        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (const index in array[i]) {
                if (line != '') line += ','
    
                line += array[i][index];
            }
    
            str += line + '\r\n';
        }
    
        return str;
    }
    
}