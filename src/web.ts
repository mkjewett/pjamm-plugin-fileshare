import { WebPlugin } from '@capacitor/core';

import type { DownloadOptions, PJAMMFileSharePlugin } from './definitions';

export class PJAMMFileShareWeb extends WebPlugin implements PJAMMFileSharePlugin {
  downloadFile(options:DownloadOptions):Promise<any> {
    if(!options.data){
      throw "File data not provided";
    }
    
    if (!options.filename) {
      throw "Filename not provided";
    }

    let blob:Blob = new Blob([options.data], {type: 'text/plain'})

    if(window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, options.filename);
    } else {
      let url:string                = window.URL.createObjectURL(blob);
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
