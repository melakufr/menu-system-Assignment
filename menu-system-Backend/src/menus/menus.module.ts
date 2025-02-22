import { Module } from '@nestjs/common';
import { MenusService } from '@app/menus/menus.service';
import { MenusController } from '@app/menus/menus.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
