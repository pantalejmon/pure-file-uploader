import {Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';

@Injectable()
export class FileMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.url === '/' || req.url.includes('uploaded/')) {
            next();
        } else {
            res.redirect(`/uploaded${req.url}`)
        }
    }
}

