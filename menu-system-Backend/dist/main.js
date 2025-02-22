"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (!process.env.IS_TS_NODE) {
    require('module-alias/register');
}
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const nestjs_pino_1 = require("nestjs-pino");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useLogger(app.get(nestjs_pino_1.Logger));
    await app.listen(app.get(config_1.ConfigService).getOrThrow('PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map