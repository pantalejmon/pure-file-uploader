import {Module} from '@nestjs/common';
import {join} from "path";
import {ServeStaticModule} from "@nestjs/serve-static";
import {FileController} from './file/file.controller';
import {FileService} from './file/file.service';
import {UPLOAD_TARGET} from "./main";

export const API = process.env.API_URL || `api`;

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', `static`),
            exclude: [`/${API}*`, `/uploaded`],
        }),
    ],
    controllers: [FileController],
    providers: [FileService],
})
export class AppModule {
}
