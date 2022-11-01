import ktp from "../models/ktp.js";

export const getKTP = async (req, res) => {
    try {
        const data = await ktp.findAll()

        res.json({
            "message": "clear",
            "data": data
        })
    } catch (err) {
        res.json({
            "message": "failed",
            "data": err.message
        })

        console.log(err.message)
    }
}

export const getKTPById = async (req, res) => {
    try {
        const data = await ktp.findAll({
            where: {
                NIK: req.params.id
            }
        })

        res.json({
            "message": "clear",
            "data": data
        })
    } catch (err) {
        res.json({
            "message": "failed",
            "data": err.message
        })

        console.log(err.message)
    }
}

export const createKTP = async (req, res) => {
    try {
        var data = req.body
        
        var check = await validation(data)

        if(check.message == 'blacklist'){
            res.json({
                "message": check.message,
                "data": "Blacklist on NIK " + check.NIK
            })
        }else if(check.message == 'clear'){
            await ktp.create(data)
            
            res.json({
                "message": check.message,
                "data": "NIK " + check.NIK + " has been created"
            })
        }
    } catch (err) {
        res.json({
            "message": "failed",
            "data": err.message
        })

        console.log(err.message)
    }
}

export const updateKTP = async (req, res) => {
    try {
        const check = await ktp.findAll({
            where: {
                "NIK": req.params.id
            }
        })

        if(check[0]){
            await ktp.update(req.body, {
                where: {
                    NIK: req.params.id
                }
            })
            
            res.json({
                "message": "clear",
                "data": "NIK " + req.params.id + " has been updated"
            })
        }else{
            res.json({
                "message": "failed",
                "data": "NIK " + req.params.id +" not found"
            })
        }
    } catch (err) {
        res.json({
            "message": "failed",
            "data": err.message
        })

        console.log(err.message)
    }
}

export const deleteKTP = async (req, res) => {
    try {
        const check = await ktp.findAll({
            where: {
                "NIK": req.params.id
            }
        })


        if(check[0]){
            await ktp.destroy({
                where: {
                    "NIK": req.params.id
                }
            })

            res.json({
                "message": "clear",
                "data": "NIK " + req.params.id + " has been deleted"
            })
        }else{
            res.json({
                "message": "failed",
                "data": "NIK " + req.params.id +" not found"
            })
        }
    } catch (err) {
        res.json({
            "message": "failed",
            "data": err.message
        })

        console.log(err.message)
    }
}

async function validation(data) {
    var NIK = data.NIK
    var NamaLengkap = data.NamaLengkap
    var Tempat = data.Tempat
    var TanggalLahir = data.TanggalLahir

    var result = []

    if(!NIK){
        NIK = ''
    }

    if(!NamaLengkap){
        NamaLengkap = ''
    }

    if(!Tempat){
        Tempat = ''
    }

    if(!TanggalLahir){
        TanggalLahir = ''
    }
    
    var Blacklist = {"Blacklist": "Y"}

    //#region check KTP by NIK
    const checkKtpByNIK = await ktp.findAll({
        where: {
            NIK: NIK
        }
    })

    if(checkKtpByNIK[0]){
        await ktp.update(Blacklist, {
            where: {
                NIK: NIK
            }
        })
        
        result = {
            "message": "blacklist",
            "NIK": checkKtpByNIK[0]['NIK']
        }
        return result
    }

    //#endregion

    //#region check KTP by NamaLengkap, Tempat & TanggalLahir
    const checkKtpByData = await ktp.findAll({
        where: {
            NamaLengkap: NamaLengkap,
            Tempat : Tempat,
            TanggalLahir: TanggalLahir
        }
    })

    if(checkKtpByData[0]){
        await ktp.update(Blacklist, {
            where: {
                NamaLengkap: NamaLengkap,
                Tempat : Tempat,
                TanggalLahir: TanggalLahir
            }
        })
        
        result = {
            "message": "blacklist",
            "NIK": checkKtpByData[0]['NIK']
        }

        return result
    }
    //#endregion

    result = {
        "message": "clear",
        "NIK": NIK
    }

    return result
}