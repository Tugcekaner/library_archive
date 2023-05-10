document.querySelector(".ekle").addEventListener("click", function VeriAl() {
    kitap = {
        KitapAdi : document.getElementById("KitapAdi").value,
        KitapYazar : document.getElementById("KitapYazar").value,
        KitapYil : document.getElementById("KitapYil").value,
        KitapYayin : document.getElementById("KitapYayin").value,
        KitapKategori : document.getElementById("KitapKategori").value,
        KitapNotu : document.getElementById("KitapNotu").value,    
    };
    
    Kitaplar = JSON.parse(localStorage.getItem("Kitaplar")) || [];
    Kitaplar.push(kitap);
    localStorage.setItem("Kitaplar", JSON.stringify(Kitaplar));
    location.reload();
});

Kitaplar = JSON.parse(localStorage.getItem("Kitaplar"));

document.querySelector(".ara").addEventListener("click", function kitapArama() {
    try{
        Kitaplar = JSON.parse(localStorage.getItem("Kitaplar"));
    KitapAdiSearch = document.getElementById("KitapAdiSearch").value;
    KitapYazarSearch = document.getElementById("KitapYazarSearch").value;
    KitapKategoriSearch = document.getElementById("KitapKategoriSearch").value;

    sonuclar = [];
    sonuclar = Kitaplar.filter(function(kitap) {
        kitapAdiMatch = kitap["KitapAdi"]?.toLowerCase().includes(KitapAdiSearch?.toLowerCase());
        yazarMatch = kitap["KitapYazar"]?.toLowerCase().includes(KitapYazarSearch?.toLowerCase());
        kategoriMatch = kitap["KitapKategori"]?.toLowerCase().includes(KitapKategoriSearch?.toLowerCase());

        return kitapAdiMatch && yazarMatch && kategoriMatch;
    });

    aramaSonuc = document.querySelector(".bulunanKitap");
    aramaSonuclar = [];
    
    if (sonuclar.length === 0) {
        aramaSonuc.innerHTML="Aradığınız kriterlere uygun kitap bulunamadı.";
    } 
    else if(KitapAdiSearch=="" && KitapYazarSearch=="" && KitapKategoriSearch==""){
        aramaSonuc.innerHTML="Bir arama yapmadınız.";
    }
    else {
        sonuclar.forEach(function(kitap, index) {
            sonuc=(`${index + 1}. Kitap Adı: ${kitap["KitapAdi"]}\n
            Yazar: ${kitap["KitapYazar"]}\n
            Kitap Yılı: ${kitap["KitapYil"]}\n
            Yayın Evi: ${kitap["KitapYayin"]}\n
            Kategori: ${kitap["KitapKategori"]}\n
            Kitap Notu: ${kitap["KitapNotu"]}\n`);
        aramaSonuclar.push(sonuc);
        
// ! sonuçları ul li liste olarak çıkartıyor.
        list = "<ul>";
        aramaSonuclar.forEach(function(sonuc) {
            list += `<li>${sonuc}</li>`;
        });
        list += "</ul>";
        aramaSonuc.innerHTML = `Aradığınız kriterlere uygun kitaplar aşağıda listelenmiştir:\n${list}`;
        
        });
    }
    return(aramaSonuc);
    }
    catch{
        aramaSonuc.innerHTML = `Aradığınız kriterlere uygun kitaplar aşağıda listelenmiştir:\n${list}`;
    }
    
})

function arama() {
    document.querySelector(".kitapArama").style.display="block";
    document.querySelector(".kitapEkleme").style.display="none";
}
function ekleme() {
    document.querySelector(".kitapArama").style.display="none";
    document.querySelector(".kitapEkleme").style.display="block";
}

function randomKitap() {
    i = Math.floor(Math.random()*Kitaplar.length);
    random = Kitaplar[i];
    aramaSonuc = document.querySelector(".bulunanKitap");
    aramaSonuc.innerHTML = `Seçilen Kitap Adı : ${random.KitapAdi}`
}
