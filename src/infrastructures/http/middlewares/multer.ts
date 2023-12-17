import * as multer from 'multer'

const memoryStorage = multer.memoryStorage()

const upload = multer.default({ storage: memoryStorage })

export default upload
