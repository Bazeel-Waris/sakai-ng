import { Component, computed, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AuthService } from '../../shared/services/auth.service';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, TooltipModule, CommonModule, StyleClassModule, AvatarModule, MenuModule],
    template: `
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <a class="layout-topbar-logo" routerLink="/">
                <span>Blogify App</span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content flex items-center gap-2">
                    <ng-container *ngIf="!isAuthenticated(); else loggedIn">
                        <button pTooltip="Login to your account" tooltipPosition="bottom" class="layout-topbar-action px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition" routerLink="/login">
                            <i class="pi pi-sign-in mr-1"></i>
                            <span>Login</span>
                        </button>
                        <button pTooltip="Register a new account" tooltipPosition="bottom" class="layout-topbar-action px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition" routerLink="/register">
                            <i class="pi pi-user-plus mr-1"></i>
                            <span>Register</span>
                        </button>
                    </ng-container>
                    <ng-template #loggedIn>
                        <p-avatar
                            [image]="getUserAvatar()"
                            [label]="getUserInitials()"
                            shape="circle"
                            class="mr-2 cursor-pointer border-2 border-blue-400"
                            [ngStyle]="{ background: '#e0e7ff', color: '#1e293b' }"
                            (click)="profileMenu.toggle($event)"
                        ></p-avatar>
                        <span class="font-semibold text-gray-800 mr-2">{{ getUserName() }}</span>
                        <p-menu #profileMenu [popup]="true" [model]="profileMenuItems"></p-menu>
                    </ng-template>
                </div>
            </div>
        </div>
    </div>`
})
export class AppTopbar {
    profileMenuItems: MenuItem[] = [
        {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => this.goToProfile()
        },
        {
            separator: true
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => this.logout()
        }
    ];

    constructor(private authService: AuthService, private router: Router) { }

    isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }

    getUserName(): string {
        const user = this.authService.getUser();
        return user?.name || 'User';
    }

    getUserAvatar(): string | undefined {
        const user = this.authService.getUser();
        return user?.avatarUrl || undefined;
    }

    getUserInitials(): string {
        const user = this.authService.getUser();
        if (user?.name) {
            return user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
        }
        return 'U';
    }

    goToProfile() {
        this.router.navigate(['/profile']);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
