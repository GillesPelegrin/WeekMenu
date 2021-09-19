import {Component, OnInit} from '@angular/core';
import {faCog, faRedoAlt} from '@fortawesome/free-solid-svg-icons';
import {ModalService} from "../../modal/modal.service";
import {WeekDay} from "../../model/week-day.model";
import {MenuFactory} from "../../service/menu.factory";

@Component({
  selector: 'app-root',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  weekMenu: WeekDay[];

  faCog = faCog;
  faRedoAlt = faRedoAlt;

  constructor(private modalService: ModalService,
              private menuFactory: MenuFactory,
  ) {
  }

  ngOnInit() {
    this.generateWeekMenu();
  }

  public generateWeekMenu() {
    this.menuFactory.createMenu().subscribe(weekMenu => this.weekMenu = weekMenu);
  }

  public getClassForMenu(weekDay: WeekDay): string {
    if (weekDay.disabled) {
      return 'gray-background'
    } else if (weekDay.lock) {
      return 'green-background'
    } else {
      return '';
    }
  }

  public clickOnMenuItem(weekDay: WeekDay): void {
    if (!weekDay.disabled) {
      weekDay.lock = !weekDay.lock;
    }
  }
}
