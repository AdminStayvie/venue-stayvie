// app.js
document.addEventListener('DOMContentLoaded', () => {
    // !!! PENTING: Ganti dengan URL Web App dari Google Apps Script Anda !!!
    const SCRIPT_URL = 'URL_APPS_SCRIPT_ANDA_DI_SINI';

    const portfolioGrid = document.getElementById('portfolio-grid');
    const loader = document.getElementById('loader');

    // Fungsi untuk mengambil data dari Google Sheet
    async function fetchData() {
        try {
            const response = await fetch(SCRIPT_URL);
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            const data = await response.json();
            displayData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            if (portfolioGrid) {
                 portfolioGrid.innerHTML = `<p style="color: red; text-align: center;">Gagal memuat proyek. Silakan periksa URL Apps Script dan pastikan sheet dibagikan dengan benar.</p>`;
            }
        } finally {
            // Sembunyikan loader setelah selesai
            if (loader) loader.style.display = 'none';
        }
    }

    // Fungsi untuk menampilkan data ke dalam HTML
    function displayData(items) {
        if (!portfolioGrid) return;
        
        // Kosongkan grid sebelum mengisi
        portfolioGrid.innerHTML = ''; 

        if (!items || items.length === 0) {
            portfolioGrid.innerHTML = '<p>Tidak ada proyek yang ditemukan.</p>';
            return;
        }

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';

            // Pastikan nama properti (item.Judul, dll) SAMA PERSIS dengan header di Google Sheet Anda
            // Nama properti sensitif terhadap huruf besar/kecil.
            const title = item.Judul || 'Tanpa Judul';
            const description = item.Deskripsi || 'Tidak ada deskripsi.';
            const imageUrl = item.URLGambar || 'https://placehold.co/600x400/EEE/31343C?text=Gambar+Tidak+Tersedia';

            card.innerHTML = `
                <img src="${imageUrl}" alt="${title}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/EEE/31343C?text=Gagal+Muat';">
                <div class="card-content">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            `;
            portfolioGrid.appendChild(card);
        });
    }

    // Panggil fungsi untuk memulai proses
    fetchData();
});
