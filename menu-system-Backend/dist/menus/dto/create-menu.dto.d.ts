import { MenuItemDto } from '@app/menus/dto/menu-item.dto';
export declare class CreateMenuDto {
    selectedParentId: string;
    newItem: MenuItemDto;
}
export declare class CreateMenuItemDto {
    selectedParentId: string;
    newItem: MenuItemDto;
    newDataTree: MenuItemDto;
}
