// Cegah tombol kembali di HP
history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});

// Cegah refresh atau keluar dari web
window.addEventListener("beforeunload", function (event) {
    event.preventDefault();
    event.returnValue = "Anda tidak bisa keluar tanpa memasukkan PIN.";
});

// Blokir semua shortcut yang bisa keluar
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey || event.altKey || event.metaKey || event.key === "F4") {
        event.preventDefault();
        alert("Navigasi dicegah! Masukkan PIN untuk keluar.");
    }
});

// Masuk ke mode full screen untuk menonaktifkan tombol navigasi
function masukFullScreen() {
    let doc = document.documentElement;
    if (doc.requestFullscreen) {
        doc.requestFullscreen();
    } else if (doc.mozRequestFullScreen) { // Firefox
        doc.mozRequestFullScreen();
    } else if (doc.webkitRequestFullscreen) { // Chrome, Safari
        doc.webkitRequestFullscreen();
    } else if (doc.msRequestFullscreen) { // IE/Edge
        doc.msRequestFullscreen();
    }
}

// Jalankan mode fullscreen saat halaman dimuat
document.addEventListener("DOMContentLoaded", masukFullScreen);

// Deteksi jika user keluar dari fullscreen, lalu paksa masuk lagi
document.addEventListener("fullscreenchange", function () {
    if (!document.fullscreenElement) masukFullScreen();
});
document.addEventListener("webkitfullscreenchange", function () {
    if (!document.webkitFullscreenElement) masukFullScreen();
});
document.addEventListener("mozfullscreenchange", function () {
    if (!document.mozFullScreenElement) masukFullScreen();
});
document.addEventListener("MSFullscreenChange", function () {
    if (!document.msFullscreenElement) masukFullScreen();
});

// Cek PIN sebelum keluar
function cekPin() {
    let pin = document.getElementById("pin").value;
    
    if (pin === "2010") {
        alert("PIN benar! Anda bisa keluar.");
        document.exitFullscreen(); // Keluar dari mode fullscreen
        window.removeEventListener("beforeunload", () => {});
        history.back();
    } else {
        alert("PIN salah! Coba lagi.");
        document.getElementById("pin").value = ""; // Hapus input
    }
}