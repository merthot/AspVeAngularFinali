
import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ApiService } from "./api.service";
import { MyAlertService } from "./myAlert.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        public apiServis: ApiService,
        public alert: MyAlertService,
        public router: Router

    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var yetkiler = route.data["yetkiler"] as Array<string>;
        var gitUrl = route.data["gerigit"] as string;

        if (!this.apiServis.oturumKontrol() || !yetkiler || !yetkiler.length) {
            this.router.navigate([gitUrl]);
            return false;
        }

        var sonuc: boolean = false;

        sonuc = this.apiServis.yetkiKontrol(yetkiler);
        if (!sonuc) {
            this.router.navigate([gitUrl]);
        }
        return sonuc;
    }

}