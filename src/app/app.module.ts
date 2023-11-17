import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {BadgeModule} from 'primeng/badge';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipModule} from 'primeng/chip';
import {ChipsModule} from 'primeng/chips';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {GalleriaModule} from 'primeng/galleria';
import {InplaceModule} from 'primeng/inplace';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {KnobModule} from 'primeng/knob';
import {LightboxModule} from 'primeng/lightbox';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import {OrderListModule} from 'primeng/orderlist';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {ProgressBarModule} from 'primeng/progressbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SidebarModule} from 'primeng/sidebar';
import {SkeletonModule} from 'primeng/skeleton';
import {SlideMenuModule} from 'primeng/slidemenu';
import {SliderModule} from 'primeng/slider';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SplitterModule} from 'primeng/splitter';
import {StepsModule} from 'primeng/steps';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {TagModule} from 'primeng/tag';
import {TerminalModule} from 'primeng/terminal';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TimelineModule} from 'primeng/timeline';
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {AppComponent} from './app.component';
import {AppConfigComponent} from './demo/view/componenet/app.config.component';
import {AppMenuComponent} from './demo/view/componenet/app.menu.component';
import {AppTopBarComponent} from './demo/view/componenet/app.topbar.component';
import {AppProfileComponent} from './demo/view/componenet/app.profile.component';
import { UserService } from './demo/service/user.service';
import { RoleService } from './demo/service/roleService';
import { AppNotfoundComponent } from './demo/view/notfound/app.notfound.component';
import { AppLoginComponent } from './demo/view/login/app.login.component';
import { AppAccessdeniedComponent } from './demo/view/accessdenied/app.accessdenied.component';
import { AppErrorComponent } from './demo/view/error/app.error.component';
import { authInterceptorProviders } from './demo/service/auth.interceptor';
import { AuthService } from './demo/service/AuthService';
import { TokenStorageService } from './demo/service/TokenStorageService';
import { AuthenticationGuard } from './guards/auth/authentication/authentication.guard';
import { AppFooterComponent } from './demo/view/componenet/app.footer.component';
import { AppMenuitemComponent } from './demo/view/componenet/app.menuitem.component';
import { MenuService } from './demo/view/componenet/app.menu.service';
import { AppMainComponent } from './demo/view/componenet/app.main.component';
import { MessageService } from 'primeng/api';
import { AppForgotPasswordComponent } from './demo/view/login/app.forgotpassword.component';

import { AppMenu1Component } from './demo/view/componenet/app.menu1.component ';
import { DashboardAdminComponent } from './demo/view/dashboard/admin/dashboard.admin.component';
import { DashboardEmpComponent } from './demo/view/dashboard/client/dashboard.emp.component';
import { AppAccountsComponent } from './demo/view/accounts/app.accounts.component';

import { AppAdminLoginComponent } from './demo/view/login/admin/app.admin.login.component';
import { AppEmployeeLoginComponent } from './demo/view/login/client/app.client.login.component';
import { ProfileSettingsComponent } from './demo/view/login/profile-settings/profile-settings.component';
import { AppClientsComponent } from './demo/view/clients/app.clients.component';
import { AppBonsClientsComponent } from './demo/view/bons-clients/app.bons.clients.component';
import { AppTransfertComponent } from './demo/view/transfert/app.transfert.component';
import { AppHistoriqueComponent } from './demo/view/transfer-historique/app.historique.component';
import { AppClientRegisterComponent } from './demo/view/register-client/app.client.register.component';


@NgModule({
    imports: [
    
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarModule,
        AvatarGroupModule,
        BadgeModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        CascadeSelectModule,
        ChartModule,
        ReactiveFormsModule,
        CheckboxModule,
        ChipModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        KnobModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollPanelModule,
        ScrollTopModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        SlideMenuModule,
        SliderModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TagModule,
        TerminalModule,
        TimelineModule,
        TieredMenuModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        FullCalendarModule,
        
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppMenuComponent,
        AppMenu1Component,
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppProfileComponent,
        AppConfigComponent,
        DashboardAdminComponent,
        DashboardEmpComponent,
        AppForgotPasswordComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        AppLoginComponent,
        AppClientsComponent,
        AppAccountsComponent,
        AppBonsClientsComponent,
       
    
        AppAdminLoginComponent,
        AppEmployeeLoginComponent,
        
        ProfileSettingsComponent,
        AppTransfertComponent,
        AppHistoriqueComponent,
        AppClientRegisterComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
         MenuService,
        MessageService,
        UserService,RoleService,
        authInterceptorProviders,AuthService,TokenStorageService,AuthenticationGuard,

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
