import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';

export class MenuItemDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  isExpanded?: boolean;

  @IsOptional()
  @IsString()
  parentId?: string;

  @IsOptional()
  @ValidateNested({ each: true }) // ✅ Validate array of children
  @Type(() => MenuItemDto) // ✅ Ensures transformation
  children?: MenuItemDto[];
}

export class NewMenuItemDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  isExpanded?: boolean;

  @IsOptional()
  @IsString()
  parentId?: string;

}
