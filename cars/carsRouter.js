const express = require("express");
const router = express.Router();

const Cars = require("./carsModel");

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const cars = await Cars.get(req.query);
    if (cars.length) {
      res.status(200).json(cars);
    } else {
      res.status(404).json({ message: "No cars were found." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The cars information could not be retrieved." });
  }
});

router.post("/", async (req, res) => {
  const { vin, make, model, mileage, transmission, title } = req.body;
  if (!vin || !make || !model || !mileage) {
    res.status(400).json({
      message:
        "The following fields are required in your request: vin, make, model, mileage"
    });
    return;
  } else if (isNaN(mileage)) {
    res.status(400).json({
      message: "The mileage field must be an integer"
    });
    return;
  }
  try {
    const cars = await Cars.insert({
      vin,
      make,
      model,
      mileage: Math.round(Number(mileage)),
      transmission,
      title
    });
    res.status(201).json(await Cars.getById(cars.id));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The car information could not be added." });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { vin, make, model, mileage, transmission, title } = req.body;
  if (!vin && !make && !model && !mileage) {
    res.status(400).json({
      message:
        "One of the following fields must be included in your request: vin, make, model, mileage"
    });
    return;
  } else if (mileage && isNaN(mileage)) {
    res.status(400).json({
      message: "The mileage field must be an integer"
    });
    return;
  }
  try {
    const car = await Cars.update(id, {
      vin,
      make,
      model,
      mileage,
      transmission,
      title
    });
    if (car) {
      res.status(200).json(await Cars.getById(id));
    } else {
      res.status(404).json({ message: "No car found with that id" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The car information could not be modified" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Cars.remove(id);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "No car matching that id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The car could not be removed" });
  }
});

module.exports = router;

//