import {Module} from '@nestjs/common';
import {join} from "path";
import {ServeStaticModule} from "@nestjs/serve-static";
import {FileController} from './file/file.controller';
import {FileService} from './file/file.service';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', `static`),
            exclude: [`/api*`, `/uploaded*`],
        }),
    ],
    controllers: [FileController],
    providers: [FileService],
})
export class AppModule {
}
