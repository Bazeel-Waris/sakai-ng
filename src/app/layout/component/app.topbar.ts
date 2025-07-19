import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule],
    template: `<div class="layout-topbar">
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
                <div class="layout-topbar-menu-content">
                   <!-- Add Login and Register buttons here -->
                    <button class="layout-topbar-action" routerLink="/login">
                        <i class="pi pi-sign-in"></i>
                        <span>Login</span>
                    </button>
                    <button class="layout-topbar-action" routerLink="/register">
                        <i class="pi pi-user-plus"></i>
                        <span>Register</span>
                    </button>
                    <!-- End Login/Register buttons -->
                </div>
            </div>
        </div>
    </div>`
})
export class AppTopbar {

    constructor() { }
}
