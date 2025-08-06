const db = require("../models");
const Pelicula = db.peliculas; 
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body.nombre) {
        return res.status(400).send({
            message: "El nombre no puede estar vacío"
        });
    }

    const pelicula = {
        nombre: req.body.nombre,
        sinopis: req.body.sinopis,
        actores: req.body.actores,
        duracion: req.body.duracion,
        tipo: req.body.tipo,
        categoria: req.body.categoria,
        aniolanzamiento: req.body.aniolanzamiento
        
    };

    Pelicula.create(pelicula)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear la pelicula."
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    const condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Pelicula.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al obtener las peliculas."
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Pelicula.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({ message: `No se encontró la pelicula con id=${id}` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener la pelicula con id=" + id
            });
        });
};



exports.update = (req, res) => {
    const id = req.params.id;

    Pelicula.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Pelicula actualizado correctamente." });
            } else {
                res.send({
                    message: `No se pudo actualizar la pelicula con id=${id}. Tal vez no fue encontrado o el cuerpo está vacío.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar la peliculacon id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Pelicula.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Pelicula eliminada correctamente." });
            } else {
                res.send({
                    message: `No se pudo eliminar la pelicula id=${id}. Tal vez no fue encontrado.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la pelicula con id=" + id
            });
        });
};


exports.deleteAll = (req, res) => {
    Pelicula.destroy({ where: {}, truncate: false })
        .then(nums => {
            res.send({ message: `${nums} peliculas fueron eliminados correctamente.` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al eliminar todos las peliculas."
            });
        });
};



