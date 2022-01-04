const Order = require("../Models/Order")

exports.getAll = async (req, res) => {
  res.send({ orders: await Order.find().populate("plat") })
}

exports.add = async (req, res) => {
  const { type, emplacement, plat } = req.body;

  const nouveauOrder = new Order({
    type: req.body.type,
    emplacement: req.body.emplacement,
    plat: req.body.plat,
    isFavourite: false


  });
 
  // nouveauOrder.type = type
  // nouveauOrder.emplacement = emplacement
  // nouveauOrder.plat = plat
  // nouveauOrder.isFavourite = false

  // nouveauOrder.save();


 // res.status(201).send({ message: "success", order: nouveauOrder })
 nouveauOrder.save()
 .then(data => {
     res.json(data);
 })
 .catch(err => {
     res.json({ message: err});
 });
}



exports.delete = async (req, res) => {
  const order = await Order.findById(req.body._id).remove()
  res.status(201).send({ message: "success", order: order })
}

exports.getfavourite = async (req, res) => {
  const order = await Order.find({isFavourite :true}).populate("plat")
  res.json({  order: order })
}


exports.makeFavourite = async(req, res) => {
  try{
  const order = await Order.findById(req.params.id)
  order.isFavourite = true
     


  await order.save()
  .then(data => {
    res.status(201).json(data);
   
})
}catch (err){
  res.json({message:err});
}
}

exports.deleteAll = async (req, res) => {
  Order.remove({}, function (err, order) {
    if (err) { return handleError(res, err) }
    return res.status(204).send({ message: "Aucun element" })
  })
}