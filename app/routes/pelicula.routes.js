module.exports = app => {
    const peliculas = require("../controllers/pelicula.controller.js");
    var router = require("express").Router();

    router.post("/create", peliculas.create);
   
    router.get("/", peliculas.findAll);

    
  router.get("/id/:id", peliculas.findOneById);
    router.get("/titulo/:titulo", peliculas.findOneByTitulo);

   
    router.put("/update/:id", peliculas.update);

    router.delete("/delete/:id", peliculas.delete);

    router.delete("/delete/", peliculas.deleteAll);
    
    app.use("/api/peli", router);
};