const express = require("express");
const routerJam = express.Router();
const controllerJam = require("../controllers/jam");

// squential search

routerJam
  .route("/jam")
  .get(controllerJam.getJam)

  .post(controllerJam.insert);

routerJam
  .route("/jam")
  .get((req, res) => {
    res.send(jam);
  })

  .post((req, res) => {
    res.send("Data jam tangan Sukses Tersimpan");
  });

routerJam
  .route("/jam/:seri")
  .put(controllerJam.update)

  // session delete
  .delete(controllerJam.delete)
  .get(controllerJam.getJamBySeri);

routerJam.get("/jam/:nama/:alamat", (req, res) => {
  const nama = req.params.nama;
  const alamat = req.params.alamat;
  res.send("jam nama : " + nama + "alamat :" + alamat);
});

routerJam.route("/jam/nama/seri").get(controllerJam.getJamBySeri);

module.exports = routerJam;
