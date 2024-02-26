const apiUrl = "http://localhost:5117/api/Notlar";
const divNotlar = document.getElementById("notlar");
const frmNot = document.getElementById("frmNot");
const txtBaslik = document.getElementById("baslik");
const txtIcerik = document.getElementById("icerik");
const btnSil = document.getElementById("sil");
const btnYeni = document.getElementById("yeni");
let notlar = [];
let seciliNot = null;

function notlariGetir() {
    axios.get(apiUrl).then(res => {
        notlar = res.data;
        notlariListele();
    });
}

function notlariListele() {
    divNotlar.innerHTML = "";

    for (const not of notlar) {
        const a = document.createElement("a");
        a.not = not;
        a.href = "#";
        a.className = "list-group-item list-group-item-action";
        a.textContent = not.baslik;
        a.onclick = (e) => notuGoster(not);
        divNotlar.append(a);
    }
}

function notuGoster(not) {
    seciliNot = not;
    frmNot.style.display = "block";
    txtBaslik.value = not.baslik;
    txtIcerik.value = not.icerik;
    secimiGuncelle();
}

function secimiGuncelle() {
    divNotlar.childNodes.forEach(el => {
        if (el.not.id == seciliNot?.id) {
            el.classList.add("active");
        }
        else {
            el.classList.remove("active");
        }
    });
}

btnYeni.onclick = (e) => {
    axios.post(apiUrl, { baslik: "Yeni Not", icerik: "" }).then(res => {
        notlar.push(res.data);
        seciliNot = res.data;
        notlariListele();
        notuGoster(res.data);
    });
};

notlariGetir();