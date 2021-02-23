import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {join} from "path";
import {ServeStaticModule} from "@nestjs/serve-static";
import {FileController} from './file/file.controller';
import {FileService} from './file/file.service';
import {FileMiddleware} from './file/file.middleware';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', `static`),
            exclude: [`/*`],
        }),
    ],
    controllers: [FileController],
    providers: [FileService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(FileMiddleware)
            .forRoutes({ path: '**', method: RequestMethod.GET });
    }
}
