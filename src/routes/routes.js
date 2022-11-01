import express from "express";

import { 
    createKTP, 
    deleteKTP, 
    getKTP, 
    getKTPById, 
    updateKTP 
} from "../controllers/ktp.js";

const router = express.Router()

router.get('/ktp', getKTP)
router.get('/ktp/:id', getKTPById)
router.post('/ktp/post', createKTP)
router.put('/ktp/update/:id', updateKTP)
router.delete('/ktp/delete/:id', deleteKTP)

export default router;