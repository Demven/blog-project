import { Injectable } from '@angular/core';

@Injectable()
export class ImagesService  {
  public ASPECT_RATIO = {
    w16h9: 'ar_16:9',
    w3h2: 'ar_3:2',
  };

  isCloudinaryUrl(url:string):boolean {
    return url.includes('cloudinary');
  }

  getCroppedImageUrl(url:string, aspectRatio:string = this.ASPECT_RATIO.w16h9):string {
    if (!this.isCloudinaryUrl(url)) {
      return url;
    }

    const urlParts: Array<string> = url.split('/upload/');
    return `${urlParts[0]}/upload/${aspectRatio},c_crop/${urlParts[1]}`;
  }

  getImagePreviewUrl(url:string, aspectRatio:string = this.ASPECT_RATIO.w16h9):string {
    if (!this.isCloudinaryUrl(url)) {
      return url;
    }

    const urlParts: Array<string> = url.split('/upload/');
    return `${urlParts[0]}/upload/${aspectRatio},c_scale,e_blur:300,w_320/${urlParts[1]}`;
  }
}
