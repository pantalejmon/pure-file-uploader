import {Controller, Post, Res, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {FileService} from "./file.service";
import {FilesInterceptor} from "@nestjs/platform-express";
import {Response} from "express";

@Controller('api/upload')
export class FileController {

    constructor(private fileService: FileService) {
    }

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Res() res: Response) {
        this.fileService.saveCorrectFiles(files, res)
    }
}
