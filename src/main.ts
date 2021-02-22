import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {join} from "path";
import *  as handler from "serve-handler";

export const UPLOAD_TARGET = process.env.UPLOAD_TARGET || join(__dirname, '..', 'uploaded')

export async function bootstrap(port?: number, options?) {
    const app = await NestFactory.create(AppModule, {logger: ['error', 'warn', 'debug', 'verbose', 'log']});
    app.use('/uploaded', (req, res) => handler(req, res, {public: UPLOAD_TARGET}))
    await app.listen(port || process.env.UPLOAD_PORT || 8080);
}

