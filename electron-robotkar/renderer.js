const { ipcRenderer } = require("electron");
const KarPozicio = require("./database");


function mentPozicio() {

    const pozicioNev = document.getElementById("pozicioNev").value;

    const izuletiSzogek = [
        {
            izulet: document.getElementById("izuletNev1").value,
            szog: parseFloat(document.getElementById("izuletSzog1").value),
        },
        {
            izulet: document.getElementById("izuletNev2").value,
            szog: parseFloat(document.getElementById("izuletSzog2").value),
        },
        {
            izulet: document.getElementById("izuletNev3").value,
            szog: parseFloat(document.getElementById("izuletSzog3").value),
        },
    ];

    const ujPozicio = new KarPozicio({
        pozicio_nev: pozicioNev,
        izuleti_szogek: izuletiSzogek,
    });


    ujPozicio.save().then(() => {

        document.getElementById("pozicioNev").value = "";
        document.getElementById("izuletNev1").value = "";
        document.getElementById("izuletSzog1").value = "";
        document.getElementById("izuletNev2").value = "";
        document.getElementById("izuletSzog2").value = "";
        document.getElementById("izuletNev3").value = "";
        document.getElementById("izuletSzog3").value = "";

        alert("Pozició mentve!");

    }).catch(err => console.error(err));
}

function betoltPoziciok() {
    KarPozicio.find().then(poziciok => {

        const poziciokListaja = document.getElementById("poziciokListaja");
        poziciokListaja.innerHTML = "";

        poziciok.forEach(pozicio => {
            const pozDiv = document.createElement("div");
            pozDiv.innerHTML = `<h3>${pozicio.pozicio_nev}</h3>`
        
            const szogLista = document.createElement("ul");
            pozicio.izuleti_szogek.forEach(szog => {
                const szogElem = document.createElement("li");
                szogElem.innerText = `${szog.izulet}: ${szog.szog} fok`;
                szogLista.appendChild(szogElem);
            });
            pozDiv.appendChild(szogLista);
            poziciokListaja.appendChild(pozDiv);
        });
    }).catch(err => console.error(err));
}