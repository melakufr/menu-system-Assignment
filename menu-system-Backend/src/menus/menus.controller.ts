import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { MenusService } from '@app/menus/menus.service';
import { CreateMenuDto } from '@app/menus/dto/create-menu.dto';
import { MenuItemDto } from '@app/menus/dto/menu-item.dto';

@Controller('menus')
export class MenusController {
   private readonly logger = new Logger(MenusController.name);
  constructor(private readonly menusService: MenusService) {}

  @Post('create')
  async create(@Body() createMenuDto: CreateMenuDto) : Promise<MenuItemDto> {
    // this.logger.log('Raw body:', JSON.stringify(createMenuDto, null, 2));
    try {
      return await this.menusService.create(createMenuDto);
    } catch (error) {
      this.logger.error('Error creating menu:', error);
      console.error('Error creating menu:', error);
      throw error; // Let NestJS handle it
    }
  }

  @Get()
  async getMenuTree() : Promise<MenuItemDto> {
    return this.menusService.getMenuTree();    
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.menusService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
  //   return this.menusService.update(+id, updateMenuDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.menusService.remove(+id);
  // }
}
