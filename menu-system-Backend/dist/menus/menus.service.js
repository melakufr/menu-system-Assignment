"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MenusService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MenusService = MenusService_1 = class MenusService {
    constructor(prismaService) {
        this.prismaService = prismaService;
        this.logger = new common_1.Logger(MenusService_1.name);
    }
    async create(createMenuDto) {
        const newItem = createMenuDto.newItem;
        const newEntity = {
            isExpanded: newItem.isExpanded,
            name: newItem.name,
            parentId: createMenuDto.selectedParentId,
        };
        try {
            await this.prismaService.menuItem.create({
                data: { ...newEntity },
            });
        }
        catch (error) {
            this.logger.error(`Failed to process create item.`, error.stack);
        }
        finally {
            this.prismaService.$disconnect();
        }
        return await this.getMenuTree();
    }
    async getMenuTree() {
        try {
            const menus = await this.prismaService.menuItem.findMany();
            const buildTree = (items, parentId = null) => {
                return items
                    .filter((item) => item.parentId === parentId)
                    .map((item) => ({
                    id: item.id,
                    name: item.name,
                    isExpanded: item.isExpanded ?? false,
                    children: buildTree(items, item.id),
                }));
            };
            return {
                id: 'root',
                name: 'system management',
                isExpanded: true,
                children: buildTree(menus),
            };
        }
        catch (error) {
            this.logger.error(`Failed to process create item.`, error.stack);
        }
        finally {
            this.prismaService.$disconnect();
        }
    }
    findOne(id) {
        return `This action returns a #${id} menu`;
    }
    remove(id) {
        return `This action removes a #${id} menu`;
    }
};
exports.MenusService = MenusService;
exports.MenusService = MenusService = MenusService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MenusService);
//# sourceMappingURL=menus.service.js.map