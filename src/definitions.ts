export interface PJAMMFileSharePlugin {
  downloadFile(options:DownloadOptions):Promise<any>
}

export interface DownloadOptions {
  fileData_base64?: string;
  file?: File|Blob;
  filename: string;
}
