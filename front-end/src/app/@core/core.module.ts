import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NbAuthModule,
  NbDummyAuthProvider,
  NbEmailPassAuthProvider
} from '@nebular/auth';
import {NbSecurityModule, NbRoleProvider} from '@nebular/security';
import {of as observableOf} from 'rxjs/observable/of';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {DataModule} from './data/data.module';
import {AnalyticsService} from './utils/analytics.service';
import {environment} from '../../environments/environment';

const socialLinks = [
  {
    url: 'https://github.com/muriloe/Hauora',
    target: '_blank',
    icon: 'socicon-github'
  }
];

const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    providers: {
      email: {
        service: NbEmailPassAuthProvider,
        config: {
          baseEndpoint: environment.baseurl,
          login: {
            endpoint: '/api/nutricionista/login'
          },
          token: {
            key: 'token' // this parameter tells Nebular where to look for the token
          }
        }
      }
    },
    forms: {
      login: {
        socialLinks: socialLinks
      },
      register: {
        socialLinks: socialLinks
      }
    }
  }).providers,
  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*'
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*'
      }
    }
  }).providers,
  {
    provide: NbRoleProvider,
    useValue: {
      getRole: () => {
        return observableOf('guest'); // here you could provide any role based on any auth flow
      }
    }
  },
  AnalyticsService
];

@NgModule({
  imports: [CommonModule],
  exports: [NbAuthModule],
  declarations: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS]
    };
  }
}
