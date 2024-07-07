import 'reflect-metadata'
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
            const dbConfig: TypeOrmModuleOptions = {
                type: 'postgres',
                host: 'localhost',
                port: configService.get<number>('PG_PORT'),
                username: configService.get<string>('PG_USERNAME'),
                password: configService.get<string>('PG_PASSWORD'),
                database: 'JstBlackCatBotDB',
                entities: [__dirname + '/../../../models/entities/*.entity.{js,ts}'],
                synchronize: true,
                cache: true
            };
            return dbConfig
        },
        inject: [ConfigService]
    })]
})
export class DatabaseModule {}