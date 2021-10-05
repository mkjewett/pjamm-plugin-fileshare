import { WebPlugin } from '@capacitor/core';

import type { DownloadOptions, PJAMMFileSharePlugin } from './definitions';

export class PJAMMFileShareWeb extends WebPlugin implements PJAMMFileSharePlugin {
  downloadFile(options:DownloadOptions):Promise<any> {
    if(!options.file){
      throw "File not provided";
    }
    
    if (!options.filename) {
      throw "Filename not provided";
    }

    if(window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(options.file, options.filename);
    } else {
      let url:string                = window.URL.createObjectURL(options.file);
      let anchor:HTMLAnchorElement  = document.createElement('a');
  
      document.body.appendChild(anchor);
      anchor.setAttribute('style', 'display:none');
      anchor.href = url;
      anchor.download = options.filename;
      anchor.click();
      window.URL.revokeObjectURL(url);
      anchor.remove();
    }

    return Promise.resolve(null);
  }
}
