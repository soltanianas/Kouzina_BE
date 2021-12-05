const Articles = require('../Models/commandeModels');


//create
exports.createArticles = (req, res, next) => {
    delete req.body._id;
    const articles = new Articles({
      ...req.body
    });
    articles.save()
      .then(() => res.status(201).json({ message: 'commande saved !'}))
      .catch(error => res.status(400).json({ message: 'commande not saved !' }));
  }

  //get articles by id
  exports.getArticlesbyid = (req, res, next) => {
    Articles.findOne({ _id: req.params.id})
      .then(articles => res.status(200).json(articles))
      .catch(error => res.status(404).json({ message: "commande not found " }));
  }

  //get all articles
  exports.getAllArticles = (req, res, next) => {
    Articles.find()
      .then(articles => res.status(200).json(articles))
      .catch(error => res.status(400).json({ error }));
  }

  //update articles
  exports.updateArticles = (req, res, next) => {
    Articles.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'commande modified !'}))
      .catch(error => res.status(400).json({ error }));
  }

  //delete articles
  exports.deleteArticles = (req, res, next) => {
    Articles.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'commande deleted !'}))
      .catch(error => res.status(400).json({ error }));
  }





