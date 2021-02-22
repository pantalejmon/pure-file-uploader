import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {join} from "path";
import *  as handler from "serve-handler";

export let UPLOAD_TARGET = process.env.UPLOAD_TARGET || join(__dirname, '..', 'uploaded')

export async function bootstrap(target?: string, port?: number ) {
    if(target) UPLOAD_TARGET = target;
    const app = await NestFactory.create(AppModule, {logger: ['error', 'warn', 'debug', 'verbose', 'log']});
    app.use('/uploaded', (req, res) => handler(req, res, {public: UPLOAD_TARGET}))
    await app.listen(port || process.env.UPLOAD_PORT || 8080);
}

