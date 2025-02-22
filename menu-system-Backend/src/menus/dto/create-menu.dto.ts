import { IsString, ValidateNested } from 'class-validator';
import { MenuItemDto } from './Menu-item.dto';
import { Type } from 'class-transformer';

export class CreateMenuDto {
  @IsString()
  selectedParentId: string;

  @ValidateNested() // Ensures nested validation
  @Type(() => MenuItemDto) // Tells class-validator to use MenuItemDto
  newItem: MenuItemDto;
}

export class CreateMenuItemDto {
  @IsString()
  selectedParentId: string;
  newItem: MenuItemDto;
  newDataTree: MenuItemDto;
}
