import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MySpacePageComponent } from './my-space-page/my-space-page.component';
import { SubscriptionPageComponent } from './subscription-page/subscription-page.component';
import { SupportPageComponent } from './support-page/support-page.component';
import { TermsPageComponent } from './terms-page/terms-page.component';
import { PolicyPageComponent } from './policy-page/policy-page.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { MovieDetailPageComponent } from './movie-detail-page/movie-detail-page.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterceptorService } from './services/interceptor.service';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { OtpSectionComponent } from './otp-section/otp-section.component';
import { ResetPasswordSectionComponent } from './reset-password-section/reset-password-section.component';
import { FilterPipe } from './explore-page/filter';
import { ComingSoonPageComponent } from './coming-soon-page/coming-soon-page.component';
import { ExplorePageComponent } from './explore-page/explore-page.component';

const appRoutes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'movie-detail-page', component: MovieDetailPageComponent },
  { path: 'signin-page', component: SignInPageComponent },
  { path: 'forgot-password-page', component: ForgotPasswordPageComponent },
  { path: 'signup-page', component: SignUpPageComponent },
  { path: 'my-space-page', component: MySpacePageComponent },
  { path: 'subscription-page', component: SubscriptionPageComponent },
  { path: 'support-page', component: SupportPageComponent },
  { path: 'terms-page', component: TermsPageComponent },
  { path: 'policy-page', component: PolicyPageComponent },
  { path: 'favourite-page', component: FavouriteComponent },
  { path: 'coming-soon-page', component: ComingSoonPageComponent },
  { path: 'explore-page', component: ExplorePageComponent },
  { path: '**', component: PageNotFoundComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    SignInPageComponent,
    SignUpPageComponent,
    HomePageComponent,
    PageNotFoundComponent,
    MySpacePageComponent,
    SubscriptionPageComponent,
    SupportPageComponent,
    TermsPageComponent,
    PolicyPageComponent,
    FavouriteComponent,
    MovieDetailPageComponent,
    ForgotPasswordPageComponent,
    OtpSectionComponent,
    ResetPasswordSectionComponent,
    FilterPipe,
    ComingSoonPageComponent,
    ExplorePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatMenuModule,
    NgxYoutubePlayerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }