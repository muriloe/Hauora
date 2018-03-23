import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

@Component({
  selector: 'ngx-theme-switcher',
  styleUrls: ['./theme-switcher.component.scss'],
  template: `

  `,
})
export class ThemeSwitcherComponent implements OnInit {
  theme: NbJSThemeOptions;

  constructor(private themeService: NbThemeService, private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.themeService.getJsTheme()
      .subscribe((theme: NbJSThemeOptions) => this.theme = theme);
  }

  toggleTheme(theme: boolean) {
    const boolTheme = this.boolToTheme(theme);
    this.themeService.changeTheme(boolTheme);
    this.analyticsService.trackEvent('switchTheme');
  }

  currentBoolTheme() {
    return this.themeToBool(this.theme);
  }

  private themeToBool(theme: NbJSThemeOptions) {
    return theme.name === 'cosmic';
  }

  private boolToTheme(theme: boolean) {
    return theme ? 'cosmic' : 'default';
  }
}
