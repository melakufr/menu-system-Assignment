import { MenusService } from '@app/menus/menus.service';
import { CreateMenuDto } from '@app/menus/dto/create-menu.dto';
import { MenuItemDto } from '@app/menus/dto/menu-item.dto';
export declare class MenusController {
    private readonly menusService;
    private readonly logger;
    constructor(menusService: MenusService);
    create(createMenuDto: CreateMenuDto): Promise<MenuItemDto>;
    getMenuTree(): Promise<MenuItemDto>;
}
