import { Component, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { AppTopbar } from './app.topbar';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, AppTopbar, RouterModule],
    template: `<div class="layout-wrapper">
        <app-topbar></app-topbar>
        <div class="layout-main-container">
            <div class="layout-main">
                <router-outlet></router-outlet>
            </div>
           <!-- <app-footer></app-footer> -->
        </div>
        <!-- <div class="layout-mask animate-fadein"></div> -->
    </div> `
})
export class AppLayout {

    menuOutsideClickListener: any;

    @ViewChild(AppTopbar) appTopBar!: AppTopbar;

    constructor(
        public renderer: Renderer2,
        public router: Router
    ) {
        // this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
        //     this.hideMenu();
        // });
    }

    isOutsideClicked(event: MouseEvent) {
        const sidebarEl = document.querySelector('.layout-sidebar');
        const topbarEl = document.querySelector('.layout-menu-button');
        const eventTarget = event.target as Node;

        return !(sidebarEl?.isSameNode(eventTarget) || sidebarEl?.contains(eventTarget) || topbarEl?.isSameNode(eventTarget) || topbarEl?.contains(eventTarget));
    }

    // hideMenu() {
    //     if (this.menuOutsideClickListener) {
    //         this.menuOutsideClickListener();
    //         this.menuOutsideClickListener = null;
    //     }
    //     this.unblockBodyScroll();
    // }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    // ngOnDestroy() {

    //     if (this.menuOutsideClickListener) {
    //         this.menuOutsideClickListener();
    //     }
    // }
}
