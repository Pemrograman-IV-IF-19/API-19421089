const modelKategori = require('../model/kategori')
const mongoose = require('mongoose')
const { reject } = require('bcrypt/promises')
const objectId = mongoose.Types.ObjectId

exports.inputKategori = (data) =>
    new Promise(async (resolve, reject) => {
        await modelKategori.create(data)
            .then(() => {
                resolve({
                    status: true,
                    msg: 'Berhasil mmembuat kategori'
                })
            }).catch((err) => {
                reject({
                    status: false,
                    msg: 'Terjadi kesalahan'
                })
            })
    })

exports.getAllKategori = () =>
new Promise(async(resolve, reject) => {
    modelKategori.find({})
        .then(dataKategori => {
            if(dataKategori.length > 0) {
                resolve({
                    status: true,
                    msg: 'Berhasil membuat data',
                    data: dataKategori
                })
            } else {
                reject({
                    status: false,
                    msg: 'Tidak ada kategori'
                })
            }
        }).catch(err => {
            reject({
                status: false,
                msg: 'Terjadi kesalahan pada server'
            })
        })
})

exports.getKategoriByName = (name) =>
new Promise(async(resolve, reject) => {
    modelKategori.findOne({ namaKategori: name})
        .then(dataKategori => {
            if(dataKategori) {
                resolve({
                    status: true,
                    msg: 'Berhasil membuat data',
                    data: dataKategori
                })
            } else {
                reject({
                    status: false,
                    msg: 'Tidak ada data kategori ' + name
                })
            }
        }).catch(err => {
            reject({
                status: false,
                msg: 'Terjadi kesalahan pada server'
            })
        })
})

exports.updateKategori = (id, data) =>
    new Promise(async(resolve, reject) => {
        modelKategori.updateOne({_id: objectId(id)}, data)
            .then(() => {
                resolve({
                    status: true,
                    msg: 'Berhasil merubah data'
                })
            }).catch(err => {
                reject({
                    status: false,
                    msg: 'Terjadi kesalahan pada server'
                })
            })
    })

    exports.deleteKategori = (id) =>
    new Promise(async(resolve, reject) => {
        modelKategori.deleteOne({_id: objectId(id)})
            .then(() => {
                resolve({
                    status: true,
                    msg: 'Berhasil menghapus data'
                })
            }).catch(err => {
                reject({
                    status: false,
                    msg: 'Terjadi kesalahan pada server'
                })
            })
    })