import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Huora ♥ by <b>
        <a href="https://github.com/muriloe/Hauora" target="_blank">Murilo, Daniel</a></b> 2018 (Release 0.4)
    </span>
    <div class="socials">
      <a href="https://github.com/muriloe/Hauora" target="_blank" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}
