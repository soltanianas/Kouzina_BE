const plat = require("../Models/Plat")

exports.getAll = async (req, res) => {
  res.send({ plats: await plat.find() })
}

exports.add = async (req, res) => {
  const { description, prix, composition } = req.body;

  const nouveauplat = new plat()

  nouveauplat.description = description
  nouveauplat.prix = prix
  nouveauplat.composition = composition
  nouveauplat.image = req.file.filename

  nouveauplat.save();

  res.status(201).send({ message: "success", plat: nouveauplat })
}

exports.edit = async (req, res) => {
  const { _id, description, prix, composition } = req.body

  let plat = await plat.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        nom: description,
        nom: prix,
        nom: composition
      }
    }
  )
  res.status(201).send({ message: "success", plat: plat })
}

exports.delete = async (req, res) => {
  const plat = await plat.findById(req.body._id).remove()
  res.status(201).send({ message: "success", plat: plat })
}

exports.deleteAll = async (req, res) => {
  plat.remove({}, function (err, plat) {
    if (err) { return handleError(res, err) }
    return res.status(204).send({ message: "Aucun element" })
  })
}