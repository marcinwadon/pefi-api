import { MiddlewareGlobalBefore, MiddlewareInterface } from 'routing-controllers';
import * as config from 'config';

interface SecurityConfig {
    role_hierarchy: {
        [key: string]: Array<string>
    },
    firewalls: {
        [key: string]: {
            pattern: string,
            security: boolean
        }
    },
    access_control: Array<{ path: string, roles: Array<string> }>
}

@MiddlewareGlobalBefore()
export class SecurityMiddleware implements MiddlewareInterface {
    private apiPrefix: string;
    private securityConfig: SecurityConfig;
    private url: string;

    use(request: any, response: any, next?: (err?: any) => any): any {
        this.apiPrefix = config.get<string>('api.prefix');
        this.securityConfig = config.get<SecurityConfig>('security');
        this.url = request.originalUrl;

        for (const key in this.securityConfig.firewalls) {
            const firewall = this.securityConfig.firewalls[key];

            if (this.matchRoute(firewall.pattern)) {
                if (!firewall.security) {
                    next();

                    return;
                }

                if (this.matchRole(request.query.role)) {
                    next();

                    return;
                }

                next('401!'); // error 401

                return;
            }
        }

        next();
    }

    private matchRoute(pattern: string): boolean {
        const patternRegExp: RegExp = new RegExp(pattern.replace('%api_prefix%', this.apiPrefix));

        return patternRegExp.test(this.url);
    }

    private matchRole(role: string): boolean {
        for (const accessControl of this.securityConfig.access_control) {
            if (this.matchRoute(accessControl.path)) {
                if (accessControl.roles.some((item: string) => item === role)) {
                    return true;
                }

                for (let roleName of accessControl.roles) {
                    if (this.verifyRole(role, roleName)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    private verifyRole(userRole: string, role: string): boolean {
        if (userRole === role) {
            return true;
        }

        const rolesHierarchy: Array<string> = this.getRoleHierarchy(userRole);

        for (let roleName of rolesHierarchy) {
            return this.verifyRole(roleName, role);
        }

        return false;
    }

    private getRoleHierarchy(role: string): Array<string> {
        for (const roleName in this.securityConfig.role_hierarchy) {
            if (role === roleName) {
                return this.securityConfig.role_hierarchy[roleName];
            }
        }

        return [];
    }
}
