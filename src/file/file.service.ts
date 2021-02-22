import {Injectable, Logger} from '@nestjs/common';
import {existsSync, promises} from "fs";
import {resolve} from "path";
import {REGEX, UPLOAD_TARGET} from "../main";
import {Response} from "express";


@Injectable()
export class FileService {

    regexArray = REGEX;

    constructor() {
        if (!existsSync(UPLOAD_TARGET)) {
            promises.mkdir(UPLOAD_TARGET);
        }
    }

    async saveCorrectFiles(files: Array<Express.Multer.File>, res: Response) {
        files = files.filter(file => !!file)
        let filesToAdd = [];

        files.forEach(file => {
            this.regexArray.forEach(reg => {
                if (this.regexFromString(reg.regex).test(file.originalname)) {
                    if (reg.status) {

                        Logger.error(`Doubled file type.
                        regex: ${reg.regex}
                        filename: ${file.originalname}`)

                        let resJSON = {
                            status: "failed",
                            message: "Powtórzony typ pliku",
                        }
                        return res.status(406).send(resJSON)
                    }
                    reg.status = true
                    filesToAdd.push(file);
                }
            })
        })


        if (!filesToAdd.length) {
            let resJSON = {
                status: "failed",
                message: "Brak sensownych plików",
            }

            Logger.warn(`No correct files in request`)

            return res.status(406).send(resJSON)
        }

        filesToAdd.forEach(file => this.saveFile(file))
        return res.send({
            status: 'success',
            message: `poprawnie dodano pliki: ${filesToAdd.map(file => file.originalname).join(', ')}`
        })

    }

    private async saveFile(file: Express.Multer.File) {
        const fileData = file.buffer;
        const files: string [] = await promises.readdir(UPLOAD_TARGET);
        const fileToDelete: string = files.find(value => value.split('.')[0] === file.originalname);

        if (fileToDelete) {
            await promises.unlink(resolve(UPLOAD_TARGET, fileToDelete));
        }

        await promises.writeFile(
            `${UPLOAD_TARGET}/${file.originalname}`,
            new Uint8Array(fileData),
            'binary');
        Logger.log(`File ${file.originalname} is saved.`)
    }

    private regexFromString(regex: string) {
        const match = /^\/(.*)\/([a-z]*)$/.exec(regex)
        return new RegExp(match[1], match[2])
    }
}
