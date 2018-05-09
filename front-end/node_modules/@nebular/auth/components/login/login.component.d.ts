import { Router } from '@angular/router';
import { NbAuthSocialLink } from '../../auth.options';
import { NbAuthService } from '../../services/auth.service';
export declare class NbLoginComponent {
    protected service: NbAuthService;
    protected config: {};
    protected router: Router;
    redirectDelay: number;
    showMessages: any;
    provider: string;
    errors: string[];
    messages: string[];
    user: any;
    submitted: boolean;
    socialLinks: NbAuthSocialLink[];
    constructor(service: NbAuthService, config: {}, router: Router);
    login(): void;
    getConfigValue(key: string): any;
}
