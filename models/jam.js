const SqlString = require("mysql/lib/protocol/SqlString");
const db = require("./db");

let jam = [
  { seri: "01", nama: "Fossil", warna: "Coklat", harga: "Rp8.000.000", create: new Date() },
  { seri: "02", nama: "G-Shock", warna: "Perak", harga: "Rp4.000.000", create: new Date() },
  { seri: "03", nama: "Casio", warna: "Hitam", harga: "Rp1.000.000", create: new Date() },
];
const cari = (arrData, seri) => {
  ketemu = -1;
  indeks = 0;
  while (ketemu == -1 && indeks < arrData.length) {
    if (arrData[indeks].seri == seri) {
      ketemu = indeks;
      return indeks;
    }
    indeks++;
  }
  return -1;
};

module.exports = {
  insert: (jamBaru, result) => {
    db.query("INSERT INTO jam SET ?", jamBaru, (err, res) => {
      if (err) {
        console.log("error:", err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...jamBaru });
    });
  },
  getJam(result) {
    let query = "SELECT * FROM jam";
    db.query(query, (err, res) => {
      if (err) {
        console.log("error:", err);
        return;
      }
      result(null, res);
    });
  },
  getJamBySeri: (nim, result) => {
    db.query(`SELECT * FROM jam WHERE seri = ${seri}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("jam tangan ditemukan:", res[0]); //opsi
        result(null, res[0]);
        return;
      }
      result({ kind: "tidak ditemukan" }, null);
    });
  },

  update: (seri, jam, result) => {
    db.query("UPDATE jam SET nama= ?, warna=?, harga=? WHERE seri=?", [jam.nama, jam.warna, jam.harga, seri], (err, res) => {
      if (err) {
        console.log("error:", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("update jam tangan: ", { seri: seri, ...jam });
      result(null, { seri: seri, ...jam });
    });
  },

  delete: (seri, result) => {
    db.query("DELETE FROM jam WHERE seri = ?", seri, (err, res) => {
      if (err) {
        console.log("error:", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted jam with seri : ", seri);
      result(null, res);
    });
  },
};
