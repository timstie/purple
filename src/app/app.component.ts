import { Component, OnDestroy, Inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { MenuLink } from './shared/components/menu/menu-link.model';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { DOCUMENT } from '@angular/platform-browser';
import { TriggerScrollService } from './shared/services/trigger-scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy, OnInit {
  @ViewChild('logo') logo: ElementRef;
  @ViewChild('nav') nav: ElementRef;
  subscription: Subscription = new Subscription();
  isTop: boolean = true;
  pageHeight: number;
  public currentRoute: string = '/';
  public links: MenuLink[] = [
    new MenuLink('/', 'Home', []),
    new MenuLink('/about', 'About', []),
    new MenuLink('/contact', 'Contact', [])
  ];

  constructor(
    router: Router,
    translate: TranslateService,
    @Inject('WINDOW') private window: any,
    @Inject(DOCUMENT) private document: any,
    private triggerScrollService: TriggerScrollService,
    private _scrollToService: ScrollToService
  ) {

    if (router) {
      router.events.subscribe(s => {
        if (s instanceof NavigationEnd) {
          const tree = router.parseUrl(router.url);
          this.currentRoute = router.url;

          if (!tree.fragment && this.window)
            this.window.scrollTo(0, 0);
        }
      });
    }

    translate.setDefaultLang('ro');
    translate.use('ro');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscription = this.triggerScrollService.triggerScroll
      .subscribe((clickedLink) =>
        this.triggerScrollTo(clickedLink.toLowerCase())
      );
  }

  onScroll(): void {
    if (Math.max(this.document.body.scrollTop, this.document.documentElement.scrollTop) > 50) {
      // this.scrollToTop.nativeElement.classList.add('active');
      this.logo.nativeElement.classList.add('fixed');
      this.nav.nativeElement.classList.add('fixed');
      this.isTop = false;
    } else {
      // this.scrollToTop.nativeElement.classList.remove('active');
      this.logo.nativeElement.classList.remove('fixed');
      this.nav.nativeElement.classList.remove('fixed');
      this.isTop = true;
    }
  }

  public triggerScrollTo(target: string): void {
    const config: ScrollToConfigOptions = {
      target: target,
      duration: 650,
      easing: 'easeOutCubic'
    };

    this._scrollToService.scrollTo(config);
  }
}
