module.exports = (sequelize, Sequelize) => {

    const Pelicula = sequelize.define("pelicula", {
        nombre: {
            type: Sequelize.STRING
        },
        
        sinopis: {
            type: Sequelize.STRING
        },
        
        actores: {
            type: Sequelize.STRING
        },
        duracion: {
            type: Sequelize.STRING
        },
        tipo:{
            type: Sequelize.STRING 
        },
        categoria: {
            type: Sequelize.STRING
        },
        aniolanzamiento: {
            type: Sequelize.INTEGER
        },
       
    });
    return Pelicula;
};