import express from 'express';
import AWS from '@aws-sdk/client-s3';
import multer from 'multer'; // for files inoformation retreival 
import { values, connect_database } from '../config.js';
import crypto from 'crypto';
import File from '../models/file.js'
import fs from 'fs' 
import path from 'path' 
const router = express.Router();

// setting up multer 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});


const upload = multer({
    storage
});


function hash(value) {
    const hash_value = crypto.createHash('sha256');
    hash_value.update(value);
    return hash_value.digest('hex').substring(0, 32);
}

function createFile(file) {
    const { originalname, mimetype, size, encoding } = file; 
    const names = originalname.split('.'), type = mimetype; 
    const ext = names[names.length - 1], time = Date.now().toString(), pad = hash(time); 
    return {
    	name:{
    		pad, original : originalname, 
    	}, 
    	size, type, ext, encoding
    }
}

// configuring AWS 

router.post('/docs', upload.array('files'), async (req, res) => {
    connect_database();

    const files = []
    for (let i = 0; i < req.files.length; i++) {
    	const {name:{pad, original} , size, type, ext, encoding} = createFile(req.files[i]);
    	const newFile = new File({
    		name:{pad, original}, 
    		size, type, ext, encoding
    	}); 
    	// saving the file to database 
    	const savedFile = newFile.save(); 
    	if (!savedFile) return res.status(500).send({
    		success:false, 
    		msg:'There was an error saving the file, please try again later.'
    	})
    	files.push(newFile); // adding the files which we can send to frontend
    	// working on the name by which it is saved in uploads folder 
    	const filename = 'uploads/' + pad + original; 
    	console.log({filename, path : req.files[i].path})
    	fs.renameSync(req.files[i].path, filename); 
    }

    console.log({files})
    return res.json({
        success: true,
        msg: 'Successful', 
        files
    });
});




export default router;