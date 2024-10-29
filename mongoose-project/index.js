const mongoose = require("mongoose");
const prompt = require("prompt-sync")();


async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/robot_projekt", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Csatlakozás sikeres a MongoDB-hez!");
    } catch (error) {
        console.error("Hiba a csatlakozás során: ", error);
        process.exit(1)
    }
}

const FeladatSchema = new mongoose.Schema({
    feladat_nev: String,
    prioritas: Number,
    celpont: {
        helynev: String,
        targy: String
    }
}, {collection: "Feladatok"});


const Feladat = mongoose.model("Feladatok", FeladatSchema);


async function main() {

    await connectDB();

    try {
        // Adatok vevitele
        const feladat_nev = prompt("Add meg a feladat nevét: ");
        const prioritas = parseInt(prompt("Add meg a prioritást (szám): "), 10);
        const helynev = prompt("Add meg a hely nevét: ");
        const targy = prompt("Add meg a tárgy nevét: ");

        const ujFeladat = new Feladat({
            feladat_nev,
            prioritas,
            celpont: {
                helynev,
                targy
            }
        });
        
        // Mentés és hibaüzenet hozzáadása
        await ujFeladat.save();
        console.log("Új feladat hozzáadva az adatbázishoz", ujFeladat);

        // find
        const feladatok = await Feladat.find({});
        console.log("Feladatok a gyűjteményben: ", feladatok);

        // updateOne
        await Feladat.updateOne({feladat_nev}, {$set: {prioritas: prioritas +1 }});
        console.log("Frissitve a feladat prioritasa.");

        // deleteOne
        await Feladat.deleteOne({ feladat_nev});
        console.log("Feladat törölve: ", feladat_nev);

    } catch (error) {
        console.error("Hiba a művelet során: ", error);
    } finally {
        await mongoose.disconnect();
        console.log("Adatbázis kapcsolat lezárva.");
    }

}

main();