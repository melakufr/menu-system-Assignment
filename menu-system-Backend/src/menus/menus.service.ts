import { Injectable, Logger } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MenuItem, Prisma } from '@prisma/client';
import { MenuItemDto, NewMenuItemDto } from '@app/menus/dto/Menu-item.dto';

@Injectable()
export class MenusService {
  private readonly logger = new Logger(MenusService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async create(createMenuDto: CreateMenuDto): Promise<MenuItemDto> {
    const newItem: MenuItemDto = createMenuDto.newItem;

    const newEntity: NewMenuItemDto = {
      isExpanded: newItem.isExpanded,
      name: newItem.name,
      parentId: createMenuDto.selectedParentId,
    };

    try {
      await this.prismaService.menuItem.create({
        data: { ...newEntity },
      });
    } catch (error) {
      this.logger.error(`Failed to process create item.`, error.stack);
    }
    return await this.getMenuTree();
  }

  async getMenuTree(): Promise<MenuItemDto> {
    const menus = await this.prismaService.menuItem.findMany();

    // Convert flat array into a hierarchical tree
    const buildTree = (
      items: MenuItemDto[],
      parentId: string | null = null,
    ): MenuItemDto[] => {
      return items
        .filter((item) => item.parentId === parentId)
        .map((item) => ({
          id: item.id,
          name: item.name,
          isExpanded: item.isExpanded ?? false,
          children: buildTree(items, item.id), // Recursively build children
        }));
    };

    return {
      id: 'root',
      name: 'system management',
      isExpanded: true,
      children: buildTree(menus),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  // update(id: number, updateMenuDto: UpdateMenuDto) {
  //   return `This action updates a #${id} menu`;
  // }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
