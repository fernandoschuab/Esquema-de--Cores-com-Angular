import { Component, OnDestroy, OnInit, HostBinding, ViewChild } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';


import { MatSidenav } from '@angular/material/sidenav';
// import { UserService } from './services/user.service';
// import { ThemeService } from './services/theme.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('class') componentCssClass: any;
  @ViewChild('sidenav') sidenav: MatSidenav | any;
  isLogged: boolean = false;
  title = 'Color Code';
  menu: Array<any> = new Array<any>();
  // menu: Array<iMenu> = new Array<iMenu>();
  darkMode: Boolean = false;

  constructor(public overlayContainer: OverlayContainer,) {
    darkMode: Boolean;
    this.sidenav 
  }
  


  ngOnInit() {

    // this.themeService.initTheme();
    // this.darkMode = this.themeService.isDarkMode();
    this.darkMode = false;
    this.overlayContainer.getContainerElement().classList.add("light-theme");


   
    // this.isLogged = this.userSrv.isStaticLogged;
    // this.userSrv.isLogged.subscribe(logged => {
    //   this.isLogged = logged;
    // })
  }


  toggle() {
    // this. menu = [];
    // this. menu = this.menuSrv.loadMenu();

    this.sidenav.toggle();
  }
  ngAfterViewInit() {
    if (this.darkMode === true) {
      this.overlayContainer.getContainerElement().classList.add("dark-theme");
    } else {
      this.overlayContainer.getContainerElement().classList.add("light-theme");
    }
  }

  ngOnDestroy() {
    // this.subscrip.unsubscribe();
  }




  public toggleTheme(): void {
    if (this.overlayContainer.getContainerElement().classList.contains("dark-theme")) {
      this.overlayContainer.getContainerElement().classList.remove("dark-theme");
      this.overlayContainer.getContainerElement().classList.add("light-theme");
      this.darkMode = false;
    } else if (this.overlayContainer.getContainerElement().classList.contains("light-theme")) {
      this.overlayContainer.getContainerElement().classList.remove("light-theme");
      this.overlayContainer.getContainerElement().classList.add("dark-theme");
      this.darkMode = true;
    } else {
      this.overlayContainer.getContainerElement().classList.add("light-theme");
      this.darkMode = false;
    }
    if (document.body.classList.contains("dark-theme")) {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      this.darkMode = false;
    } else if (document.body.classList.contains("light-theme")) {
      document.body.classList.remove("light-theme");
      this.darkMode = false;
      document.body.classList.add("dark-theme");
      this.darkMode = true;
    } else {
      document.body.classList.add("dark-theme");
      this.darkMode = true;
    }
  }
  async logout() {
    // Swal.fire({
    //   title: 'Deseja realmente sair?',
    //   // showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: 'Sim, sair',
    //   cancelButtonText: `cancelar`,
    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
    //     Swal.fire('Até mais!', '', 'success')
    //     this.userSrv.configureLogOff();
    //   }
    // })
  }
}
