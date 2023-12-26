const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/order", (req, res) => {
  res.render("order");
});

// route read
router.get("/cart", async (req, res, next) => {
  try {
    const reservations = await Reservation.find();
    res.render("cart", { reservations });
  } catch (err) {
    console.log("Tidak bisa mengambil data:", err);
    res.status(500).send("Terjadi kesalahan saat mengambil data dari database");
  }
});

// route for read
// router.get("/cart", (req, res) => {
//   Reservation.find((err, docs) => {
//     res.render("cart", {});
//   });
// });

// route for create
router.post("/add", async (req, res, next) => {
  try {
    const {
      name,
      destination,
      date,
      price,
      passengers,
      member,
      discount,
      total,
    } = req.body;

    console.log(
      name,
      destination,
      date,
      price,
      passengers,
      member,
      discount,
      total
    );

    const uclReservation = new Reservation({
      name,
      destination,
      date,
      price,
      passengers,
      member,
      discount,
      total,
    });
    await uclReservation.save();
    console.log("Data berhasil disimpan ke database");
    // alert("Pesanan Anda Berhasil! Selamat Bersenang-senang!");
    res.redirect("/cart");
  } catch (err) {
    console.error("Tidak dapat menyimpan data ke database:", err);
    res.status(500).send("Terjadi kesalahan saat menyimpan data ke database");
  }
});

router.get("/edit/:id", async (req, res, next) => {
  try {
    const id = req.params.id.replace(/[^\da-fA-F]/g, ""); // Remove non-hex characters
    console.log(id);
    const docs = await Reservation.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!docs) {
      console.log("Tidak bisa edit data");
      res.status(404).send("Data not found");
    } else {
      res.render("edit", { Reservation: docs });
    }
  } catch (err) {
    console.error("Error editing data:", err);
    res.status(500).send("Error editing data");
  }
});

router.post("/edit/:id", async (req, res, next) => {
  try {
    const id = req.params.id.replace(/[^\da-fA-F]/g, ""); // Remove non-hex characters
    const updatedData = req.body;

    const docs = await Reservation.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!docs) {
      console.log("Data not found");
      res.status(404).send("Data not found");
    } else {
      console.log("Data berhasil diupdate");
      res.redirect("/cart");
    }
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(500).send("Error updating data");
  }
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id.replace(/[^\da-fA-F]/g, ""); // Remove non-hex characters

    const deletedReservation = await Reservation.findByIdAndDelete(id);

    if (!deletedReservation) {
      console.log("Data not found");
      res.status(404).send("Data not found");
    } else {
      console.log("Berhasil Menghapus");
      res.redirect("/cart");
    }
  } catch (err) {
    console.error("Error deleting data:", err);
    res.status(500).send("Error deleting data");
  }
});

module.exports = router;
