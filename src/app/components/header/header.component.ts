import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showConfig: boolean;
  configForm: FormGroup;
  styleTypes = ['bold', 'italic', 'underline'];
  faInfoCircle = faInfoCircle;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.configForm = new FormGroup({
      titleSize: new FormControl(''),
      titleColor: new FormControl(''),
      titleStyle: new FormControl(''),
      infoSize: new FormControl(''),
      infoColor: new FormControl(''),
      infoStyle: new FormControl(''),
      bodySize: new FormControl(''),
      bodyColor: new FormControl(''),
      bodyStyle: new FormControl(''),
    })
  }

  toggleConfig(): void {
    this.showConfig = !this.showConfig;
  }

  changeTheme(): void {
    const configObject = this.configForm.value;
    configObject['titleSize'] = configObject.titleSize ? `${configObject.titleSize * 0.0625}rem` : configObject.titleSize;
    configObject['infoSize'] = configObject.infoSize ? `${configObject.infoSize * 0.0625}rem` : configObject.infoSize;
    configObject['bodySize'] = configObject.bodySize ? `${configObject.bodySize * 0.0625}rem` : configObject.bodySize;
    this.setProperty('--title-size', configObject.titleSize)
    this.setProperty('--info-size', configObject.infoSize);
    this.setProperty('--body-size', configObject.bodySize);
    this.setProperty('--title-color', configObject.titleColor);
    this.setProperty('--info-color', configObject.infoColor);
    this.setProperty('--body-color', configObject.bodyColor);
    this.checkStyleProperty('title', configObject.titleStyle);
    this.checkStyleProperty('info', configObject.infoStyle);
    this.checkStyleProperty('body', configObject.bodyStyle);
    console.log(configObject);
  }

  checkStyleProperty(name: string, propertyValue: string): void {
    if (propertyValue === this.styleTypes[0]) {
      this.setProperty(`--${name}-weight`, propertyValue);
    } else if (propertyValue === this.styleTypes[1]) {
      this.setProperty(`--${name}-style`, propertyValue);
    } else if (propertyValue === this.styleTypes[2]) {
      this.setProperty(`--${name}-decoration`, propertyValue);
    }
  }

  setProperty(propertyName: string, propertyValue: string): void {
    document.documentElement.style.setProperty(propertyName, propertyValue);
  }

  onCancel(): void {
    this.configForm.reset();
    this.showConfig = false;
  }

  useLanguage(event: any): void {
    const language = event.target.value;
    this.translate.use(language);
  }
}
