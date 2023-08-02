const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

const bsOffcanvas = new bootstrap.Offcanvas("#offcanvasExample");
let notlar = [
    {
        baslik: "Alışveriş Listesi",
        icerik: "Süt, ekmek, yumurta, meyve almayı unutma!"
    },
    {
        baslik: "Ödev Hatırlatıcısı",
        icerik: "Matematik ödevini yarına kadar bitirmen gerekiyor."
    },
    {
        baslik: "Randevu Saati",
        icerik: "Doktor randevun 14:30'da. Geç kalmamaya özen göster."
    },
    {
        baslik: "Doğum Güne Hediyesi",
        icerik: "Annene doğum günü hediyesi almayı unutma."
    }

];

verileriYule();
let seciliNot = null;
$("#btnYeni").click(yeniTiklandi);
$("#btnSil").click(silTiklandi);
$("#frmNot").submit(formKabul);
$("#offcanvasExample").on("show.bs.offcanvas", canvasAciliyor);
$("#offcanvasExample").on("hide.bs.offcanvas", canvasKapaniyor);


function listele(secilecekNot) {
    $("#lstNotlar").html(""); // temizleme
    for (const not of notlar) {
        const aOge = $("<a/>")
            .prop("not", not)
            .click(baslikTiklandi)
            .attr("href", "#")
            .text(not.baslik)
            .addClass("list-group-item list-group-item-action") // appendTo("#lstNotlar")
            .addClass(not == secilecekNot ? "active" : ""); // not eğer seçili notsa active yap. Active class oldugu için ifle yapmadık.
        $("#lstNotlar").append(aOge);
    }
}

function baslikTiklandi(e) {
    e.preventDefault();  // a oldugu için linkle bi linke gitmesini önledik.
    let not = $(this).prop("not");
    seciliNot = not;
    $("#lstNotlar>a").removeClass("active");
    $(this).addClass("active");
    $("#txtBaslik").val(not.baslik);
    $("#txtİcerik").val(not.icerik);
    bsOffcanvas.hide();
}

function yeniTiklandi(e) {
    sifirla();
    bsOffcanvas.hide();
}

function sifirla() {
    seciliNot = null;
    $("#lstNotlar>a").removeClass("active");
    $("#txtBaslik").val(" ").focus();
    $("#txtİcerik").val(" ");
}

function silTiklandi(e) {

    if (seciliNot) {
        let index = notlar.indexOf(seciliNot);
        notlar.splice(index, 1);
        $("#lstNotlar>a.active").remove();
        verileriSakla();
    }

    sifirla();
}

function formKabul(e) {
    e.preventDefault();  // formun submit olmaması için
    if (seciliNot) {  // secili olanı güncelleme
        seciliNot.baslik = $("#txtBaslik").val();
        seciliNot.icerik = $("#txtİcerik").val();
        $("#lstNotlar>a.active").text(seciliNot.baslik);
    }
    else {
        let yeniNot = {
            baslik: $("#txtBaslik").val(),
            icerik: $("#txtİcerik").val()
        };

        notlar.unshift(yeniNot);
        listele(yeniNot);
        seciliNot = yeniNot;
    }

    verileriSakla();
}

function verileriSakla() {
    let json = JSON.stringify(notlar);
    localStorage["veri"] = json;

}

function verileriYule() {

    let json = localStorage["veri"]; // localdeki json stringini nesneye dönüştürür.
    if (json) {
        notlar = JSON.parse(json);
    }
}

function canvasAciliyor(e) {
    $("#offcanvasBody").html($("#solTaraf"));
}

function canvasKapaniyor(e) {
    $("#solSutun").html($("#solTaraf"));
}

listele();