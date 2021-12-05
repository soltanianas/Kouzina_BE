const News = require('../Models/platModel');


//create
exports.createNews = (req, res, next) => {
    delete req.body._id;
    const news = new News({
      ...req.body
    });
    news.save()
      .then(() => res.status(201).json({ message: 'plat saved !'}))
      .catch(error => res.status(400).json({ message: 'plat not saved !' }));
  }

  //get news by id
  exports.getNewsbyid = (req, res, next) => {
    News.findOne({ _id: req.params.id})
      .then(news => res.status(200).json(news))
      .catch(error => res.status(404).json({ message: "plat not found Check id " }));
  }

  //get all news
  exports.getAllNews = (req, res, next) => {
    News.find()
      .then(news => res.status(200).json(news))
      .catch(error => res.status(400).json({ error }));
  }

  //update news
  exports.updateNews = (req, res, next) => {
    News.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'plat modified !'}))
      .catch(error => res.status(400).json({ message: "Check id" }));
  }

  //delete news
  exports.deleteNews = (req, res, next) => {
    News.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'plat deleted !'}))
      .catch(error => res.status(400).json({ message: "Check id" }));
  }





