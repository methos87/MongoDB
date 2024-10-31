const mongoose = require("mongoose");
const _ = require("lodash");
const db = mongoose.connect("mongodb://127.0.0.1:27017/robotkar", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});


const KarPozicioSchema = new mongoose.Schema({
    pozicio_nev: String,
    izuleti_szogek: [
        {
            izulet: String,
            szog: Number,
        },
    ],
});


const KarPozicio = mongoose.model("KarPozicio", KarPozicioSchema)

module.exports = KarPozicio;

// renderer.disconnectDB =function(){
//     mongoose.connection.close();
// };