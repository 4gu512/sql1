const jam = require("../models/jam");
const modelJam = require("../models/jam");

module.exports = {
  getJam: (req, res) => {
    jam.getJam((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || " terjadi error",
        });
      } else res.send(data);
    });
  },
  insert: (req, res) => {
    // ambildata request dari frontend
    if (!req.body) {
      res.status(400).send({
        message: "data tidak boleh kosong",
      });
    }
    modelJam.insert(req.body, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "terjadi error",
        });
      } else {
        res.send(data);
      }
    });
  },
  getJamBySeri: (req, res) => {
    // MENAMPILKAN DATA
    jam.getJamBySeri(req.params.seri, (err, data) => {
      if (err) {
        if (err.kind === "tidak ditemukan") {
          res.status(404).send({
            message: `jam tangan dengan seri: ${req.params.seri}tidak ditemukan`,
          });
        } else {
          res.status(500).send({
            message: "error" + req.params.seri,
          });
        }
      } else res.send(data);
    });
  },

  update: (req, res) => {
    // UPDATE
    if (!req.body) {
      res.status(400).send({
        message: "data tidak boleh kosng",
      });
    }
    jam.update(req.params.seri, req.body, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `not found jam tangan with seri ${req.params.seri}`,
          });
        } else {
          res.status(500).send({
            message: "error updating tutorial with seri " + req.params.seri,
          });
        }
      } else res.send(data);
    });
  },

  delete: (req, res) => {
    seri.delete(req.params.seri, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `not found jam tangan with seri ${req.params.seri}`,
          });
        } else {
          res.status(500).send({
            message: "could not delete jam tangan with seri " + req.params.seri,
          });
        }
      } else res.send({ message: `berhasil dihapus` });
    });
  },
};
