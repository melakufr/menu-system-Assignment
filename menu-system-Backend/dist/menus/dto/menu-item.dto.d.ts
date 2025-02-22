export declare class MenuItemDto {
    id: string;
    name: string;
    isExpanded?: boolean;
    parentId?: string;
    children?: MenuItemDto[];
}
export declare class NewMenuItemDto {
    name: string;
    isExpanded?: boolean;
    parentId?: string;
}
