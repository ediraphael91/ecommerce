import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from '../../../interfaces/menu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];

  constructor(private _menuService: MenuService){ }

  ngOnInit(): void {
  this.cargarMenu();
  }

  cargarMenu(){
    this._menuService.getMenu().subscribe(data =>{
      console.log(data);
      this.menu = data;
    })
  }

}
