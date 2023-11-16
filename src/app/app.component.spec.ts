/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppTopBarComponent } from './demo/view/componenet/app.topbar.component';
import { AppProfileComponent } from './demo/view/componenet/app.profile.component';
// import { AppFooterComponent } from './app.footer.component';
import { AppMenuComponent } from './demo/view/componenet/app.menu.component';
import { AppFooterComponent } from './demo/view/componenet/app.footer.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ RouterTestingModule ],
        declarations: [ AppComponent,
                AppTopBarComponent,
                AppMenuComponent,
                AppFooterComponent,
                AppProfileComponent
            ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
