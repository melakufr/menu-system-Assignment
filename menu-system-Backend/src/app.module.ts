import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { MenusModule } from '@app/menus/menus.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRootAsync({
      imports: [ConfigModule], //importing ConfigModule to LoggerModule, to access(inject) ConfigService
      useFactory: (configService: ConfigService) => {
        const isProd = configService.get('NODE_ENV') === 'production';

        return {
          //only use 'pino-pretty' in dev mode.
          pinoHttp: {
            transport: isProd
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                  },
                },
            level: isProd ? 'info' : 'debug',
          },
        };
      },
      inject: [ConfigService],
    }),
    MenusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
