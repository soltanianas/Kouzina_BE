const chef = require("../Models/Chef")

exports.getAll = async (req, res) => {
    res.send({ chefs: await chef.find() })
}

exports.add = async (req, res) => {
    const { nom } = req.body;

    const nouveauchef = new chef()

    nouveauchef.nom = nom;
    nouveauchef.image = req.file.filename

    nouveauchef.save();

    res.status(201).send({ message: "success", chef: nouveauchef })
}

exports.edit = async (req, res) => {
    const { _id, nom } = req.body

    let chef = await chef.findOneAndUpdate(
        { _id: _id },
        {
            $set: {
                nom: nom
            }
        }
    )
    res.status(201).send({ message: "success", chef: chef })
}

exports.delete = async (req, res) => {
    const chef = await chef.findById(req.body._id).remove()
    res.status(201).send({ message: "success", chef: chef })
}

exports.deleteAll = async (req, res) => {
    chef.remove({}, function (err, chef) {
        if (err) { return handleError(res, err) }
        return res.status(204).send({ message: "Aucun element" })
    })
}
