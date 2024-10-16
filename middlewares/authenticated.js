import multer from 'multer';
import { token } from "../utils/index.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/images');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});

function asureAuth(req, resp, next) {
    if (!req.headers.authorization) {
        return resp.status(400).send({ msg: "Error en la autenticación" });
    }

    const accessToken = req.headers.authorization.replace("Bearer ", "").trim();

    if (token.hasExpiredToken(accessToken)) {
        return resp.status(400).send({ msg: "Error en la autenticación" });
    }

    req.user = token.decode(accessToken);
    next();
}

export const mdAuth = {
    asureAuth,
    upload
};
