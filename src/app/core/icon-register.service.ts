import { Injectable } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class IconRegisterService {

  constructor(private iconRegistry: MdIconRegistry,
              private sanitizer: DomSanitizer) {
  }

  registerExternalIcons() {
    this.iconRegistry.addSvgIcon(
      'facebook',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook-box.svg'));
    this.iconRegistry.addSvgIcon(
      'git',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/git.svg'));
    this.iconRegistry.addSvgIcon(
      'instagram',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/instagram.svg'));
    this.iconRegistry.addSvgIcon(
      'vk',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/vk-box.svg'));
    this.iconRegistry.addSvgIcon(
      'odnoklassniki',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/odnoklassniki.svg'));
  }

}
