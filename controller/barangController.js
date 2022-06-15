const barangModel = require('../model/barangModel')
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId
// input
exports.inputBarang = (data) =>
    new Promise(async (resolve, reject) => {
        await barangModel.create(data)
            .then(() => {
                resolve({
                    status: true,
                    msg: "Barang berhasil diInput"
                })
            }).catch((err) => {
                reject({
                    status: false,
                    msg: "Terjadi Kesalahan pada Server"
                })
            })
    })
// update
exports.updateBarang = (id, data) =>
    new Promise(async (resolve, reject) => {
        barangModel.updateOne({
            _id: objectId(id)
        }, data)
            .then(() => {
                resolve({
                    status: true,
                    msg: "Berhasil Update Data"
                })
            }).catch((err) => {
                reject({
                    status: false,
                    msg: "Terjadi Kesalahan Pada Server"
                })
            })
    })
// delete
exports.deleteBarang = (id) =>
    new Promise(async (resolve, reject) => {
        barangModel.deleteOne({
            _id: objectId(id)
        }).then((dataBarang) => {
            if (dataBarang) {
                resolve({
                    status: true,
                    msg: "Data Telah Dihapus"
                })
            } else {
                reject({
                    status: false,
                    msg: "ID Tidak Ditemukan"
                })
            }
        }).catch((err) => {
            reject({
                status: false,
                msg: "Terjadi Kesalahan Pada Server"
            })
        })
    })
// get All Data Barang
exports.getallBarang = () =>
    new Promise(async (resolve, reject) => {
        barangModel.aggregate([
            {
                $lookup:
                {
                    from: "kategoris",
                    localField: "kategori",
                    foreignField: "_id",
                    as: "kategoriBarang"
                }
            },
            { $unwind: "$kategoriBarang" }
        ])
            .then((dataBarang) => {
                if (dataBarang.length > 0) {
                    resolve({
                        status: true,
                        msg: "Berhasil Memuat Data",
                        data: dataBarang
                    })
                } else {
                    reject({
                        status: false,
                        msg: "Data tidak ada"
                    })
                }
            }).catch((err) => {
                reject({
                    status: false,
                    msg: "Terjadi Kesalahan Pada Server"
                })
            })
    })
// get by ID Barang
exports.getBarangbyID = (id) =>
    new Promise(async (resolve, reject) => {
        barangModel.aggregate([
            {
                $match: { _id: objectId(id) }
            },
            {
                $lookup:
                {
                    from: "kategoris",
                    localField: "kategori",
                    foreignField: "_id",
                    as: "kategoriBarang"
                }
            },
            { $unwind: "$kategoriBarang" }
        ]).then((dataBarang) => {
            if (dataBarang) {
                resolve({
                    status: true,
                    msg: "Berhasil Memuat Data",
                    data: dataBarang
                })
            } else {
                reject({
                    status: false,
                    msg: "ID Tidak Ditemukan"
                })
            }
        }).catch((err) => {
            reject({
                status: false,
                msg: "Terjadi Kesalahan Pada Server"
            })
        })
    })

//Update Gambar
exports.updateGambar = (id, gambar) =>
    new Promise(async (resolve, reject) => {
        barangModel.updateOne({ _id: objectId(id) }, { $set: { gambar: gambar } })
            .then(() => {
                resolve({
                    status: true,
                    msg: "Berhasil Update Data"
                })
            }).catch((err) => {
                reject({
                    status: false,
                    msg: "Terjadi Kesalahan Pada Server"
                })
            })
    })
