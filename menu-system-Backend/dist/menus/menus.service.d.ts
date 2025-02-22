import { CreateMenuDto } from '@app/menus/dto/create-menu.dto';
import { PrismaService } from '@app/prisma/prisma.service';
import { MenuItemDto } from '@app/menus/dto/menu-item.dto';
export declare class MenusService {
    private readonly prismaService;
    private readonly logger;
    constructor(prismaService: PrismaService);
    create(createMenuDto: CreateMenuDto): Promise<MenuItemDto>;
    getMenuTree(): Promise<MenuItemDto>;
    findOne(id: number): string;
    remove(id: number): string;
}
