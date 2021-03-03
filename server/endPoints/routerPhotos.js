import Router from 'express';
import fs from "fs";
import formidable from "formidable";
import path from "path";

const routerPhotos = new Router();

//API work with photos (formidable)
routerPhotos.get('/api/v1/get/photo/:name', async (req, res) => {
    res.sendFile(__dirname + '/client/uploaded/' + req.params.name);
});

routerPhotos.get('/api/v1/get/src/image', async (req, res) => { //to get all files from folder
    let dir = (__dirname + '/client/uploaded/')
    let filesURL = await fs.readdirSync(dir).map((file) => dir + file);
    res.send(filesURL)
});

routerPhotos.post('/api/v1/add/photo', async (req, res, next) => { //send file to folder in server
    const form = await formidable({multiples: true});

    form.parse(req, (err, fields, files) => {
        const oldPath = files.image.path;
        const newPath = path.join(__dirname, '/client/uploaded/') + files.image.name
        const rawData = fs.readFileSync(oldPath)

        fs.writeFile(newPath, rawData, function (err) {
            if (err) res.send(err)
            return res.send("Photo is uploaded")
        })
        // console.log('fields:', fields);
        // console.log('files:', files);
    });
});

export default routerPhotos;