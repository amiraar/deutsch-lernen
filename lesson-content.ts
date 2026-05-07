/**
 * Structured lesson content untuk setiap lesson di seed.
 * Dipakai di seed.ts (update content field) dan di LessonContent component.
 *
 * Struktur tiap lesson:
 * - introduction: paragraf pembuka
 * - sections: array bagian materi, tiap bagian punya:
 *   - title
 *   - explanation: teks penjelasan (Bahasa Indonesia)
 *   - examples: array { german, indonesian, note? }
 *   - tip?: catatan penting / memory trick
 * - summary: poin-poin ringkasan
 */

export type LessonExample = {
  german: string;
  indonesian: string;
  note?: string;
};

export type LessonSection = {
  title: string;
  explanation: string;
  examples: LessonExample[];
  tip?: string;
};

export type LessonContent = {
  topic: string;
  introduction: string;
  sections: LessonSection[];
  summary: string[];
};

export const LESSON_CONTENT: Record<string, LessonContent> = {
  "salam-dasar": {
    topic: "greetings",
    introduction:
      "Salam adalah hal pertama yang kamu ucapkan saat bertemu orang. Dalam bahasa Jerman, salam bervariasi tergantung waktu dan situasi — formal atau informal. Di pelajaran ini kamu akan belajar salam paling dasar yang digunakan sehari-hari.",
    sections: [
      {
        title: "Salam Berdasarkan Waktu",
        explanation:
          "Bahasa Jerman memiliki salam yang berbeda untuk pagi, siang, dan malam. Semua diawali dengan kata 'Guten' yang berarti 'baik/selamat'.",
        examples: [
          { german: "Guten Morgen!", indonesian: "Selamat pagi!", note: "Digunakan sampai sekitar pukul 11.00" },
          { german: "Guten Tag!", indonesian: "Selamat siang / Halo!", note: "Salam formal untuk siang hari, paling umum" },
          { german: "Guten Abend!", indonesian: "Selamat malam!", note: "Digunakan setelah sekitar pukul 18.00" },
        ],
        tip: "Guten = baik/selamat. Morgen = pagi, Tag = hari/siang, Abend = malam. Mudah diingat!",
      },
      {
        title: "Salam Informal",
        explanation:
          "Untuk teman atau orang yang sudah dikenal, orang Jerman menggunakan salam yang lebih santai.",
        examples: [
          { german: "Hallo!", indonesian: "Halo!", note: "Universal, bisa kapan saja" },
          { german: "Hi!", indonesian: "Hai!", note: "Sangat informal, untuk teman dekat" },
          { german: "Hey!", indonesian: "Hey!", note: "Sama dengan bahasa Inggris" },
        ],
      },
      {
        title: "Menanyakan Kabar",
        explanation:
          "Setelah menyapa, biasanya dilanjutkan dengan menanyakan kabar. Pelajari ekspresi paling umum berikut.",
        examples: [
          { german: "Wie geht es Ihnen?", indonesian: "Bagaimana kabar Anda? (formal)" },
          { german: "Wie geht es dir?", indonesian: "Bagaimana kabarmu? (informal)" },
          { german: "Wie geht's?", indonesian: "Gimana kabar? (sangat kasual)" },
          { german: "Mir geht es gut.", indonesian: "Saya baik-baik saja." },
          { german: "Danke, gut. Und Ihnen?", indonesian: "Terima kasih, baik. Dan Anda?" },
        ],
        tip: "'Mir geht es gut' = 'Kepadaku perjalanannya baik' — langsung hafalkan frasa ini secara utuh.",
      },
      {
        title: "Perpisahan",
        explanation: "Ada beberapa cara untuk berpamitan dalam bahasa Jerman.",
        examples: [
          { german: "Auf Wiedersehen!", indonesian: "Sampai jumpa! (formal)" },
          { german: "Tschüss!", indonesian: "Dadah! (informal)" },
          { german: "Tschau!", indonesian: "Ciao! (sangat informal)" },
          { german: "Bis bald!", indonesian: "Sampai segera!" },
          { german: "Bis morgen!", indonesian: "Sampai besok!" },
        ],
      },
      {
        title: "Kata-kata Sopan Dasar",
        explanation: "Kata-kata ini wajib dihafal karena dipakai di hampir setiap percakapan.",
        examples: [
          { german: "Danke!", indonesian: "Terima kasih!" },
          { german: "Danke schön!", indonesian: "Terima kasih banyak!" },
          { german: "Bitte!", indonesian: "Tolong / Sama-sama / Silakan" },
          { german: "Entschuldigung!", indonesian: "Maaf / Permisi!" },
          { german: "Es tut mir leid.", indonesian: "Saya minta maaf." },
        ],
        tip: "'Bitte' adalah kata serbaguna: bisa berarti 'tolong' (permintaan), 'sama-sama' (balasan terima kasih), atau 'silakan' (mempersilakan).",
      },
    ],
    summary: [
      "Guten Morgen / Tag / Abend untuk salam formal berdasarkan waktu",
      "Hallo / Hi untuk salam informal",
      "Wie geht es dir? untuk menanyakan kabar",
      "Mir geht es gut = saya baik-baik saja",
      "Tschüss untuk pamitan informal, Auf Wiedersehen untuk formal",
      "Danke = terima kasih, Bitte = tolong/sama-sama/silakan",
    ],
  },

  "angka-1-20": {
    topic: "numbers",
    introduction:
      "Angka adalah fondasi penting dalam setiap bahasa. Dalam bahasa Jerman, angka 1-12 harus dihafal satu per satu, sedangkan 13-19 mengikuti pola yang konsisten. Pelajari pola ini dan kamu bisa membentuk semua angka!",
    sections: [
      {
        title: "Angka 1 sampai 12",
        explanation:
          "Dua belas angka pertama ini harus dihafal karena masing-masing punya bentuk unik.",
        examples: [
          { german: "eins (1)", indonesian: "satu", note: "Saat berdiri sendiri. Menjadi 'ein' di dalam kalimat" },
          { german: "zwei (2)", indonesian: "dua" },
          { german: "drei (3)", indonesian: "tiga" },
          { german: "vier (4)", indonesian: "empat" },
          { german: "fünf (5)", indonesian: "lima", note: "ü diucapkan seperti 'i' dengan bibir maju" },
          { german: "sechs (6)", indonesian: "enam", note: "Diucapkan 'zeks'" },
          { german: "sieben (7)", indonesian: "tujuh" },
          { german: "acht (8)", indonesian: "delapan", note: "ch diucapkan seperti 'kh'" },
          { german: "neun (9)", indonesian: "sembilan" },
          { german: "zehn (10)", indonesian: "sepuluh" },
          { german: "elf (11)", indonesian: "sebelas" },
          { german: "zwölf (12)", indonesian: "dua belas", note: "ö diucapkan seperti 'e' dengan bibir maju" },
        ],
        tip: "Hafalkan 1-12 dengan menghitung benda di sekitarmu dalam bahasa Jerman setiap hari.",
      },
      {
        title: "Angka 13 sampai 19 — Pola '-zehn'",
        explanation:
          "Angka 13-19 dibentuk dengan menambahkan '-zehn' (= sepuluh) di belakang angka dasar. Mirip dengan bahasa Inggris '-teen'.",
        examples: [
          { german: "dreizehn (13)", indonesian: "tiga belas", note: "drei + zehn" },
          { german: "vierzehn (14)", indonesian: "empat belas", note: "vier + zehn" },
          { german: "fünfzehn (15)", indonesian: "lima belas" },
          { german: "sechzehn (16)", indonesian: "enam belas", note: "sechs → sech (s dihilangkan)" },
          { german: "siebzehn (17)", indonesian: "tujuh belas", note: "sieben → sieb (en dihilangkan)" },
          { german: "achtzehn (18)", indonesian: "delapan belas" },
          { german: "neunzehn (19)", indonesian: "sembilan belas" },
        ],
        tip: "Pola: [angka dasar] + zehn. Pengecualian: sech-zehn (bukan sechs-zehn) dan sieb-zehn (bukan sieben-zehn).",
      },
      {
        title: "Angka 20",
        explanation: "Angka 20 punya bentuk tersendiri dan menjadi dasar untuk angka 21-29.",
        examples: [
          { german: "zwanzig (20)", indonesian: "dua puluh" },
          { german: "einundzwanzig (21)", indonesian: "dua puluh satu", note: "ein + und + zwanzig (satu dan dua puluh)" },
          { german: "zweiundzwanzig (22)", indonesian: "dua puluh dua" },
        ],
        tip: "Dalam bahasa Jerman, angka 21 dibaca 'satu-dan-dua puluh' — kebalikan dari Indonesia! Pola: [satuan] + und + [puluhan].",
      },
      {
        title: "Penggunaan Angka dalam Kalimat",
        explanation: "Latihan memakai angka dalam konteks nyata.",
        examples: [
          { german: "Ich bin zwölf Jahre alt.", indonesian: "Saya berumur dua belas tahun." },
          { german: "Das kostet fünf Euro.", indonesian: "Itu harganya lima Euro." },
          { german: "Ich habe drei Bücher.", indonesian: "Saya punya tiga buku." },
          { german: "Es ist acht Uhr.", indonesian: "Sekarang jam delapan." },
        ],
      },
    ],
    summary: [
      "Angka 1-12 harus dihafal satu per satu: eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf",
      "Angka 13-19: tambahkan -zehn (pengecualian: sechzehn, siebzehn)",
      "20 = zwanzig",
      "Angka 21+ dibaca terbalik: satuan + und + puluhan (einundzwanzig = 21)",
      "Huruf khusus: ü, ö perlu dilatih pelafalannya",
    ],
  },

  "kata-ganti-orang": {
    topic: "pronouns",
    introduction:
      "Kata ganti orang (Personalpronomen) adalah salah satu hal paling mendasar dalam bahasa Jerman. Berbeda dengan Indonesia, bahasa Jerman membedakan 'kamu' tunggal vs jamak, dan punya bentuk formal untuk 'Anda'. Memahami ini sangat penting karena mempengaruhi konjugasi kata kerja.",
    sections: [
      {
        title: "Kata Ganti Orang — Tabel Lengkap",
        explanation:
          "Bahasa Jerman memiliki 6 kata ganti utama yang perlu dikuasai. Perhatikan perbedaan 'Sie' (formal) vs 'sie' (dia/mereka).",
        examples: [
          { german: "ich", indonesian: "saya / aku", note: "Selalu ditulis huruf kecil kecuali di awal kalimat" },
          { german: "du", indonesian: "kamu (informal, satu orang)" },
          { german: "er", indonesian: "dia (laki-laki)" },
          { german: "sie", indonesian: "dia (perempuan) / mereka" },
          { german: "es", indonesian: "dia (benda/netral)" },
          { german: "wir", indonesian: "kami / kita" },
          { german: "ihr", indonesian: "kalian (informal, beberapa orang)" },
          { german: "sie", indonesian: "mereka" },
          { german: "Sie", indonesian: "Anda (formal, satu atau banyak)", note: "Selalu huruf kapital S" },
        ],
        tip: "Trik mengingat: ich=I, du=you, er=he, sie=she/they, wir=we, ihr=y'all, Sie=You(formal). Mirip Inggris!",
      },
      {
        title: "Perbedaan Formal vs Informal",
        explanation:
          "Ini salah satu hal yang sering membingungkan. Gunakan 'du' untuk teman/keluarga, 'Sie' untuk orang yang belum dikenal/atasan.",
        examples: [
          { german: "Wie heißt du?", indonesian: "Siapa namamu? (ke teman)" },
          { german: "Wie heißen Sie?", indonesian: "Siapa nama Anda? (ke orang asing/formal)" },
          { german: "Kommst du morgen?", indonesian: "Kamu datang besok?" },
          { german: "Kommen Sie morgen?", indonesian: "Apakah Anda datang besok?" },
        ],
        tip: "Di tempat kerja, tunggu sampai orang mengajak 'duzen' (pakai du) sebelum kamu beralih dari Sie.",
      },
      {
        title: "er / sie / es — Sesuai Gender Kata Benda",
        explanation:
          "Penting: 'er/sie/es' tidak hanya mengacu pada jenis kelamin orang, tapi juga gender gramatikal kata benda!",
        examples: [
          { german: "Der Tisch ist groß. Er ist groß.", indonesian: "Meja itu besar. Ia (meja) besar.", note: "der Tisch = maskulin → er" },
          { german: "Die Lampe ist neu. Sie ist neu.", indonesian: "Lampu itu baru. Ia (lampu) baru.", note: "die Lampe = feminin → sie" },
          { german: "Das Buch ist interessant. Es ist interessant.", indonesian: "Buku itu menarik. Ia (buku) menarik.", note: "das Buch = netral → es" },
        ],
        tip: "Hafalkan kata benda beserta artikelnya (der/die/das) dari awal, karena itu menentukan kata ganti yang dipakai.",
      },
      {
        title: "Contoh Penggunaan dalam Kalimat",
        explanation: "Latihan melihat kata ganti dalam konteks.",
        examples: [
          { german: "Ich lerne Deutsch.", indonesian: "Saya belajar bahasa Jerman." },
          { german: "Du bist nett.", indonesian: "Kamu baik." },
          { german: "Wir wohnen in Jakarta.", indonesian: "Kami tinggal di Jakarta." },
          { german: "Sie kommen aus Deutschland.", indonesian: "Mereka berasal dari Jerman." },
          { german: "Sprechen Sie Indonesisch?", indonesian: "Apakah Anda berbicara bahasa Indonesia?" },
        ],
      },
    ],
    summary: [
      "ich=saya, du=kamu(informal), er=dia(♂), sie=dia(♀)/mereka, es=dia(netral), wir=kami, ihr=kalian, Sie=Anda(formal)",
      "Sie (kapital) = bentuk formal dari 'kamu/Anda' — selalu pakai kata kerja bentuk mereka",
      "er/sie/es mengikuti gender gramatikal kata benda, bukan hanya jenis kelamin",
      "du untuk teman/keluarga, Sie untuk situasi formal",
    ],
  },

  "gender-kata-benda": {
    topic: "gender",
    introduction:
      "Salah satu hal paling unik sekaligus menantang dalam bahasa Jerman adalah setiap kata benda memiliki gender gramatikal: maskulin (der), feminin (die), atau netral (das). Tidak ada aturan mutlak, tapi ada banyak pola yang bisa membantu.",
    sections: [
      {
        title: "Tiga Artikel: der, die, das",
        explanation:
          "Dalam bahasa Jerman, artikel 'the' bukan satu kata tapi tiga: der (maskulin), die (feminin), das (netral). Artikel ini harus dihafal bersama kata bendanya.",
        examples: [
          { german: "der Mann", indonesian: "pria / suami", note: "maskulin" },
          { german: "der Tisch", indonesian: "meja", note: "maskulin" },
          { german: "der Hund", indonesian: "anjing", note: "maskulin" },
          { german: "die Frau", indonesian: "wanita / istri", note: "feminin" },
          { german: "die Lampe", indonesian: "lampu", note: "feminin" },
          { german: "die Schule", indonesian: "sekolah", note: "feminin" },
          { german: "das Kind", indonesian: "anak", note: "netral" },
          { german: "das Buch", indonesian: "buku", note: "netral" },
          { german: "das Auto", indonesian: "mobil", note: "netral" },
        ],
        tip: "WAJIB: Selalu hafalkan kata benda dengan artikelnya. Bukan 'Tisch', tapi 'der Tisch'. Bukan 'Lampe', tapi 'die Lampe'.",
      },
      {
        title: "Pola untuk Maskulin (der)",
        explanation:
          "Beberapa pola akhiran kata yang biasanya maskulin. Ini bukan aturan mutlak, tapi berlaku untuk mayoritas kata.",
        examples: [
          { german: "der Lehrer", indonesian: "guru (laki-laki)", note: "akhiran -er biasanya maskulin" },
          { german: "der Frühling", indonesian: "musim semi", note: "akhiran -ling biasanya maskulin" },
          { german: "derIsmus", indonesian: "(kata berakhiran -ismus)", note: "akhiran -ismus selalu maskulin" },
          { german: "der Tag", indonesian: "hari", note: "hari/waktu biasanya maskulin" },
          { german: "der Monat", indonesian: "bulan", note: "bulan-bulan juga maskulin" },
        ],
        tip: "Hari (Montag, Dienstag...), bulan (Januar, Februar...), dan musim (Frühling, Sommer...) selalu maskulin.",
      },
      {
        title: "Pola untuk Feminin (die)",
        explanation: "Akhiran-akhiran yang hampir selalu feminin.",
        examples: [
          { german: "die Lehrerin", indonesian: "guru (perempuan)", note: "akhiran -in (versi perempuan dari kata maskulin)" },
          { german: "die Freiheit", indonesian: "kebebasan", note: "akhiran -heit selalu feminin" },
          { german: "die Schönheit", indonesian: "keindahan", note: "akhiran -heit" },
          { german: "die Freundschaft", indonesian: "persahabatan", note: "akhiran -schaft selalu feminin" },
          { german: "die Zeitung", indonesian: "koran", note: "akhiran -ung selalu feminin" },
          { german: "die Wohnung", indonesian: "apartemen", note: "akhiran -ung" },
        ],
        tip: "Akhiran -heit, -keit, -schaft, -ung, -ion, -tät = SELALU feminin (die). Hafal pola ini!",
      },
      {
        title: "Pola untuk Netral (das)",
        explanation: "Akhiran-akhiran yang biasanya netral.",
        examples: [
          { german: "das Mädchen", indonesian: "gadis / perempuan muda", note: "akhiran -chen selalu netral, meski orangnya perempuan!" },
          { german: "das Häuschen", indonesian: "rumah kecil", note: "akhiran -chen" },
          { german: "das Studium", indonesian: "studi / kuliah", note: "akhiran -um biasanya netral" },
          { german: "das Museum", indonesian: "museum", note: "akhiran -um" },
          { german: "das Wasser", indonesian: "air", note: "kata dasar benda alam sering netral" },
        ],
        tip: "Kata dengan akhiran -chen dan -lein (bentuk kecil) SELALU netral, tidak peduli makna aslinya.",
      },
      {
        title: "Artikel untuk Jamak",
        explanation:
          "Kabar baiknya: semua kata benda dalam bentuk jamak menggunakan 'die', tidak peduli gender aslinya.",
        examples: [
          { german: "der Mann → die Männer", indonesian: "pria → para pria" },
          { german: "die Frau → die Frauen", indonesian: "wanita → para wanita" },
          { german: "das Kind → die Kinder", indonesian: "anak → anak-anak" },
          { german: "das Buch → die Bücher", indonesian: "buku → buku-buku" },
        ],
        tip: "Jamak = selalu 'die'. Tapi bentuk jamak tiap kata beda-beda dan harus dihafal juga.",
      },
    ],
    summary: [
      "Tiga gender: maskulin (der), feminin (die), netral (das)",
      "Selalu hafalkan kata benda bersama artikelnya: 'der Tisch', bukan hanya 'Tisch'",
      "Akhiran -heit, -keit, -schaft, -ung → selalu die (feminin)",
      "Akhiran -chen, -lein → selalu das (netral)",
      "Hari, bulan, musim → selalu der (maskulin)",
      "Semua bentuk jamak → die",
    ],
  },

  "kata-kerja-dasar": {
    topic: "verbs",
    introduction:
      "Kata kerja (Verben) adalah inti dari kalimat bahasa Jerman. Yang paling penting adalah 'sein' (menjadi/berada) dan 'haben' (punya) — keduanya irregular dan menjadi dasar untuk banyak struktur kalimat. Pelajari juga beberapa kata kerja regular yang paling sering digunakan.",
    sections: [
      {
        title: "Kata Kerja 'sein' (menjadi / berada / adalah)",
        explanation:
          "'Sein' adalah kata kerja paling penting dalam bahasa Jerman. Setara dengan 'to be' dalam bahasa Inggris. Bentuknya tidak beraturan (irregular) dan harus dihafal.",
        examples: [
          { german: "ich bin", indonesian: "saya adalah/berada" },
          { german: "du bist", indonesian: "kamu adalah/berada" },
          { german: "er/sie/es ist", indonesian: "dia adalah/berada" },
          { german: "wir sind", indonesian: "kami adalah/berada" },
          { german: "ihr seid", indonesian: "kalian adalah/berada" },
          { german: "sie/Sie sind", indonesian: "mereka/Anda adalah/berada" },
        ],
        tip: "Hafalkan: bin, bist, ist, sind, seid, sind. Kata-kata ini muncul di SETIAP percakapan.",
      },
      {
        title: "Contoh Kalimat dengan 'sein'",
        explanation: "Lihat bagaimana 'sein' digunakan dalam situasi nyata.",
        examples: [
          { german: "Ich bin Student.", indonesian: "Saya (adalah) mahasiswa." },
          { german: "Du bist müde.", indonesian: "Kamu lelah." },
          { german: "Er ist Arzt.", indonesian: "Dia (laki-laki) adalah dokter." },
          { german: "Wir sind hier.", indonesian: "Kami ada di sini." },
          { german: "Das ist gut.", indonesian: "Itu bagus." },
          { german: "Wo ist die Toilette?", indonesian: "Di mana toiletnya?" },
        ],
      },
      {
        title: "Kata Kerja 'haben' (memiliki / punya)",
        explanation:
          "'Haben' juga irregular dan sangat penting. Digunakan untuk menyatakan kepemilikan dan sebagai kata kerja bantu.",
        examples: [
          { german: "ich habe", indonesian: "saya punya" },
          { german: "du hast", indonesian: "kamu punya" },
          { german: "er/sie/es hat", indonesian: "dia punya" },
          { german: "wir haben", indonesian: "kami punya" },
          { german: "ihr habt", indonesian: "kalian punya" },
          { german: "sie/Sie haben", indonesian: "mereka/Anda punya" },
        ],
        tip: "habe, hast, hat, haben, habt, haben. Perhatikan pola: wir haben = sie haben (sama).",
      },
      {
        title: "Kata Kerja Regular — Pola Konjugasi",
        explanation:
          "Kata kerja regular mengikuti pola yang konsisten. Ambil bentuk dasar (infinitif), hilangkan '-en', lalu tambahkan akhiran sesuai kata ganti.",
        examples: [
          { german: "lernen → ich lerne, du lernst, er lernt", indonesian: "belajar → saya belajar, kamu belajar, dia belajar" },
          { german: "wohnen → ich wohne, du wohnst, er wohnt", indonesian: "tinggal → saya tinggal, kamu tinggal, dia tinggal" },
          { german: "spielen → ich spiele, du spielst, er spielt", indonesian: "bermain → saya bermain, kamu bermain, dia bermain" },
          { german: "arbeiten → ich arbeite, du arbeitest, er arbeitet", indonesian: "bekerja", note: "Akhiran -ten: tambahkan -e- sebelum akhiran" },
        ],
        tip: "Pola akhiran regular: -e, -st, -t, -en, -t, -en. Ini berlaku untuk ribuan kata kerja!",
      },
      {
        title: "Kata Kerja Penting Lainnya",
        explanation: "Beberapa kata kerja paling sering digunakan dalam percakapan sehari-hari.",
        examples: [
          { german: "gehen — ich gehe", indonesian: "pergi" },
          { german: "kommen — ich komme", indonesian: "datang" },
          { german: "machen — ich mache", indonesian: "membuat / melakukan" },
          { german: "sehen — ich sehe", indonesian: "melihat" },
          { german: "sprechen — ich spreche", indonesian: "berbicara", note: "Irregular: du sprichst, er spricht" },
          { german: "essen — ich esse", indonesian: "makan", note: "Irregular: du isst, er isst" },
          { german: "trinken — ich trinke", indonesian: "minum" },
          { german: "lesen — ich lese", indonesian: "membaca", note: "Irregular: du liest, er liest" },
        ],
      },
    ],
    summary: [
      "sein (menjadi): bin, bist, ist, sind, seid, sind — harus dihafal",
      "haben (punya): habe, hast, hat, haben, habt, haben — harus dihafal",
      "Kata kerja regular: hilangkan -en, tambahkan -e/-st/-t/-en/-t/-en",
      "Kata kerja irregular (sprechen, essen, lesen) berubah vokal di du dan er/sie/es",
      "Urutan kata dalam kalimat deklaratif: Subjek + Kata Kerja + Objek",
    ],
  },

  "waktu-dan-hari": {
    topic: "time",
    introduction:
      "Mengetahui cara menyebut waktu dan hari dalam bahasa Jerman sangat penting untuk kehidupan sehari-hari. Dari membuat janji sampai menjelaskan rutinitas, bagian ini akan membekalimu dengan kosakata yang sering dipakai.",
    sections: [
      {
        title: "Hari dalam Seminggu",
        explanation:
          "Semua nama hari dalam bahasa Jerman adalah maskulin (der). Perhatikan bahwa minggu dalam bahasa Jerman dimulai dari Senin (Montag), bukan Minggu.",
        examples: [
          { german: "der Montag", indonesian: "Senin", note: "Mond = bulan (Moon day)" },
          { german: "der Dienstag", indonesian: "Selasa" },
          { german: "der Mittwoch", indonesian: "Rabu", note: "Mitt = tengah, Woche = minggu. Hari tengah minggu!" },
          { german: "der Donnerstag", indonesian: "Kamis", note: "Donner = guntur (Thunder day)" },
          { german: "der Freitag", indonesian: "Jumat" },
          { german: "der Samstag", indonesian: "Sabtu" },
          { german: "der Sonntag", indonesian: "Minggu", note: "Sonne = matahari (Sun day)" },
        ],
        tip: "Mittwoch (Rabu) = hari tengah minggu. Montag dan Sonntag mudah diingat karena mirip Moon day dan Sunday.",
      },
      {
        title: "Menyebut Hari dalam Kalimat",
        explanation: "Cara menggunakan nama hari dalam kalimat.",
        examples: [
          { german: "Heute ist Montag.", indonesian: "Hari ini hari Senin." },
          { german: "Am Freitag gehe ich ins Kino.", indonesian: "Pada hari Jumat saya pergi ke bioskop.", note: "'am' = pada hari" },
          { german: "Jeden Dienstag habe ich Deutschkurs.", indonesian: "Setiap Selasa saya ada kursus bahasa Jerman." },
        ],
        tip: "'am Montag' = pada hari Senin. 'am' + nama hari (semuanya pakai am, bukan an atau in).",
      },
      {
        title: "Jam dan Waktu",
        explanation: "Cara menyatakan jam dalam bahasa Jerman — ada dua sistem: formal (24 jam) dan informal.",
        examples: [
          { german: "Es ist acht Uhr.", indonesian: "Sekarang jam delapan. (08.00)", note: "Uhr = jam/pukul" },
          { german: "Es ist halb neun.", indonesian: "Setengah sembilan. (08.30)", note: "HATI-HATI: halb neun = 8.30, bukan 9.30!" },
          { german: "Es ist Viertel nach zehn.", indonesian: "Seperempat lewat sepuluh. (10.15)" },
          { german: "Es ist Viertel vor zwölf.", indonesian: "Seperempat sebelum dua belas. (11.45)" },
          { german: "Es ist zwölf Uhr mittags.", indonesian: "Sekarang tepat tengah hari." },
        ],
        tip: "JEBAKAN: 'halb neun' = 8.30 (setengah menuju 9), BUKAN 9.30! Berpikir maju: setengah perjalanan menuju jam 9.",
      },
      {
        title: "Periode Waktu dalam Sehari",
        explanation: "Kosakata untuk bagian-bagian hari.",
        examples: [
          { german: "der Morgen", indonesian: "pagi (hingga sekitar 10.00)" },
          { german: "der Vormittag", indonesian: "pagi menjelang siang (10.00-12.00)" },
          { german: "der Mittag", indonesian: "siang / tengah hari" },
          { german: "der Nachmittag", indonesian: "sore (12.00-18.00)" },
          { german: "der Abend", indonesian: "malam (setelah 18.00)" },
          { german: "die Nacht", indonesian: "malam (saat tidur / larut malam)" },
        ],
      },
      {
        title: "Kata Keterangan Waktu",
        explanation: "Kata-kata yang sering dipakai untuk menyatakan waktu.",
        examples: [
          { german: "heute", indonesian: "hari ini" },
          { german: "morgen", indonesian: "besok", note: "morgen juga berarti 'pagi' — konteks menentukan arti!" },
          { german: "gestern", indonesian: "kemarin" },
          { german: "übermorgen", indonesian: "lusa" },
          { german: "vorgestern", indonesian: "kemarin lusa" },
          { german: "jetzt", indonesian: "sekarang" },
          { german: "bald", indonesian: "segera" },
        ],
        tip: "'morgen' bisa berarti 'besok' ATAU 'pagi'. 'morgen Morgen' = 'besok pagi'!",
      },
    ],
    summary: [
      "Hari: Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag, Sonntag",
      "Semua nama hari = maskulin (der), minggu dimulai Senin",
      "'am Montag' = pada hari Senin",
      "halb neun = 08.30 (bukan 9.30!) — hitung maju menuju jam berikutnya",
      "heute=hari ini, morgen=besok, gestern=kemarin",
    ],
  },

  "arah-dan-tempat": {
    topic: "direction",
    introduction:
      "Kemampuan menanyakan dan memberikan arah adalah keahlian praktis yang langsung bisa kamu gunakan. Di pelajaran ini kamu akan belajar kosakata arah, preposisi tempat, dan frasa yang dibutuhkan saat tersesat di kota berbahasa Jerman.",
    sections: [
      {
        title: "Kata-kata Arah Dasar",
        explanation: "Kosakata arah yang paling sering digunakan.",
        examples: [
          { german: "links", indonesian: "kiri" },
          { german: "rechts", indonesian: "kanan" },
          { german: "geradeaus", indonesian: "lurus" },
          { german: "zurück", indonesian: "kembali / balik" },
          { german: "die Kreuzung", indonesian: "persimpangan" },
          { german: "die Ecke", indonesian: "sudut / pojok" },
          { german: "die Ampel", indonesian: "lampu merah / traffic light" },
        ],
        tip: "Links = kiri, Rechts = kanan. Ingat: 'R' di Rechts = Right (kanan).",
      },
      {
        title: "Menanyakan Arah",
        explanation: "Frasa-frasa standar untuk meminta petunjuk arah.",
        examples: [
          { german: "Entschuldigung, wo ist der Bahnhof?", indonesian: "Permisi, di mana stasiun kereta?" },
          { german: "Wie komme ich zum Marktplatz?", indonesian: "Bagaimana cara saya ke alun-alun?" },
          { german: "Ist es weit von hier?", indonesian: "Apakah jauh dari sini?" },
          { german: "Können Sie mir helfen?", indonesian: "Bisakah Anda membantu saya?" },
        ],
      },
      {
        title: "Memberikan Petunjuk Arah",
        explanation: "Kalimat-kalimat yang dipakai saat menjelaskan arah.",
        examples: [
          { german: "Gehen Sie geradeaus.", indonesian: "Jalan lurus." },
          { german: "Biegen Sie links ab.", indonesian: "Belok kiri." },
          { german: "Biegen Sie rechts ab.", indonesian: "Belok kanan." },
          { german: "Nehmen Sie die erste Straße links.", indonesian: "Ambil jalan pertama di kiri." },
          { german: "Es ist auf der linken Seite.", indonesian: "Ada di sebelah kiri." },
          { german: "Es ist gegenüber der Kirche.", indonesian: "Ada di seberang gereja." },
        ],
      },
      {
        title: "Preposisi Tempat",
        explanation:
          "Preposisi penting yang menjelaskan lokasi. Preposisi ini mempengaruhi kasus (Dativ atau Akkusativ).",
        examples: [
          { german: "in der Nähe von", indonesian: "dekat dengan" },
          { german: "neben", indonesian: "di samping" },
          { german: "gegenüber", indonesian: "di seberang / berhadapan" },
          { german: "zwischen", indonesian: "di antara" },
          { german: "hinter", indonesian: "di belakang" },
          { german: "vor", indonesian: "di depan" },
          { german: "über", indonesian: "di atas" },
          { german: "unter", indonesian: "di bawah" },
        ],
        tip: "Preposisi dua arah (neben, zwischen, hinter, vor, über, unter, auf, an, in) pakai Dativ untuk posisi dan Akkusativ untuk gerakan.",
      },
      {
        title: "Tempat-tempat Penting",
        explanation: "Kosakata tempat yang paling sering dicari.",
        examples: [
          { german: "der Bahnhof", indonesian: "stasiun kereta" },
          { german: "die Haltestelle", indonesian: "halte bus/tram" },
          { german: "das Krankenhaus", indonesian: "rumah sakit" },
          { german: "die Apotheke", indonesian: "apotek" },
          { german: "das Rathaus", indonesian: "balai kota" },
          { german: "die Bank", indonesian: "bank" },
          { german: "der Supermarkt", indonesian: "supermarket" },
          { german: "die Toilette / das WC", indonesian: "toilet" },
        ],
      },
    ],
    summary: [
      "links=kiri, rechts=kanan, geradeaus=lurus",
      "Biegen Sie links/rechts ab = belok kiri/kanan",
      "Frasa tanya: Wo ist...? / Wie komme ich zu...?",
      "Preposisi: neben(samping), gegenüber(seberang), zwischen(antara), vor(depan), hinter(belakang)",
      "Tempat penting: Bahnhof, Apotheke, Krankenhaus, Rathaus",
    ],
  },

  "makanan-favorit": {
    topic: "food",
    introduction:
      "Makanan adalah jendela budaya! Bahasa Jerman memiliki kosakata kuliner yang kaya. Di pelajaran ini kamu akan belajar nama-nama makanan dan minuman, cara memesan di restoran, dan ungkapan yang dipakai saat makan.",
    sections: [
      {
        title: "Buah-buahan (Obst)",
        explanation: "Nama buah-buahan umum dalam bahasa Jerman.",
        examples: [
          { german: "der Apfel", indonesian: "apel", note: "maskulin" },
          { german: "die Banane", indonesian: "pisang", note: "feminin" },
          { german: "die Orange / die Apfelsine", indonesian: "jeruk", note: "dua nama untuk jeruk" },
          { german: "die Traube", indonesian: "anggur", note: "feminin — biasanya jamak: die Trauben" },
          { german: "die Erdbeere", indonesian: "stroberi" },
          { german: "die Mango", indonesian: "mangga" },
        ],
      },
      {
        title: "Makanan Pokok dan Umum",
        explanation: "Makanan yang sering muncul di meja makan Jerman.",
        examples: [
          { german: "das Brot", indonesian: "roti", note: "Jerman terkenal dengan ratusan jenis Brot!" },
          { german: "das Brötchen", indonesian: "roti kecil / roll", note: "versi kecil dari Brot" },
          { german: "die Wurst", indonesian: "sosis", note: "Jerman sangat terkenal dengan Wurst" },
          { german: "der Käse", indonesian: "keju" },
          { german: "das Ei / die Eier", indonesian: "telur / telur-telur" },
          { german: "die Suppe", indonesian: "sup" },
          { german: "der Salat", indonesian: "salad", note: "juga bisa berarti 'selada'" },
          { german: "die Nudeln", indonesian: "mie / pasta" },
        ],
        tip: "Brot dalam bahasa Jerman bukan hanya satu jenis — ada Vollkornbrot, Roggenbrot, Weißbrot, dan ratusan lainnya!",
      },
      {
        title: "Minuman (Getränke)",
        explanation: "Minuman umum yang perlu kamu ketahui.",
        examples: [
          { german: "das Wasser", indonesian: "air", note: "Stilles Wasser=air biasa, Mineralwasser=air mineral" },
          { german: "der Kaffee", indonesian: "kopi" },
          { german: "der Tee", indonesian: "teh" },
          { german: "die Milch", indonesian: "susu" },
          { german: "der Saft", indonesian: "jus", note: "Apfelsaft=jus apel, Orangensaft=jus jeruk" },
          { german: "das Bier", indonesian: "bir", note: "Minuman nasional Jerman" },
        ],
      },
      {
        title: "Di Restoran",
        explanation: "Frasa-frasa penting saat makan di restoran.",
        examples: [
          { german: "Ich möchte bestellen.", indonesian: "Saya ingin memesan." },
          { german: "Was empfehlen Sie?", indonesian: "Apa yang Anda rekomendasikan?" },
          { german: "Ich nehme das Schnitzel.", indonesian: "Saya ambil/pesan schnitzel-nya." },
          { german: "Ohne Fleisch, bitte.", indonesian: "Tanpa daging, tolong." },
          { german: "Die Rechnung, bitte.", indonesian: "Tolong bon/tagihannya." },
          { german: "Es hat gut geschmeckt!", indonesian: "Rasanya enak!", note: "Ucapkan ini ke pelayan!" },
        ],
        tip: "'Guten Appetit!' adalah ucapan sebelum makan yang setara dengan 'Selamat makan'. Selalu ucapkan ini!",
      },
      {
        title: "Ungkapan Suka dan Tidak Suka",
        explanation: "Cara mengekspresikan preferensi makanan.",
        examples: [
          { german: "Ich esse gern Pizza.", indonesian: "Saya suka makan pizza.", note: "'gern' = dengan senang hati" },
          { german: "Ich mag Schokolade.", indonesian: "Saya suka cokelat." },
          { german: "Ich esse nicht gern Fisch.", indonesian: "Saya tidak suka makan ikan." },
          { german: "Ich bin Vegetarier/Vegetarierin.", indonesian: "Saya vegetarian." },
          { german: "Ich bin allergisch gegen Nüsse.", indonesian: "Saya alergi kacang." },
        ],
        tip: "'gern' + kata kerja = suka melakukan sesuatu. 'nicht gern' = tidak suka. Ini lebih alami dari 'Ich liebe' untuk aktivitas.",
      },
    ],
    summary: [
      "Buah: der Apfel, die Banane, die Orange, die Erdbeere",
      "Makanan: das Brot, die Wurst, der Käse, das Ei",
      "Minuman: das Wasser, der Kaffee, die Milch, der Saft",
      "Gern + kata kerja = suka melakukan sesuatu",
      "Di restoran: Ich möchte bestellen / Die Rechnung bitte",
      "Guten Appetit! = Selamat makan",
    ],
  },

  "kegiatan-harian": {
    topic: "daily",
    introduction:
      "Mendeskripsikan rutinitas harian adalah cara terbaik untuk berlatih kata kerja dan struktur kalimat. Di pelajaran ini kamu akan belajar kosakata untuk kegiatan sehari-hari dan cara menyusunnya dalam kalimat yang benar.",
    sections: [
      {
        title: "Kata Kerja Pemisah (Trennbare Verben)",
        explanation:
          "Banyak kata kerja dalam bahasa Jerman memiliki prefiks yang terpisah saat digunakan dalam kalimat. Prefiks ini berpindah ke akhir kalimat.",
        examples: [
          { german: "aufstehen → Ich stehe auf.", indonesian: "bangun → Saya bangun.", note: "auf- terpisah ke akhir" },
          { german: "aufwachen → Ich wache auf.", indonesian: "terjaga dari tidur → Saya bangun tidur." },
          { german: "anziehen → Ich ziehe mich an.", indonesian: "memakai pakaian → Saya berpakaian." },
          { german: "einkaufen → Ich kaufe ein.", indonesian: "berbelanja → Saya berbelanja." },
          { german: "fernsehen → Ich sehe fern.", indonesian: "menonton TV → Saya nonton TV." },
        ],
        tip: "Kata kerja pemisah: prefiks (auf-, an-, ein-) loncat ke AKHIR kalimat. Ini salah satu ciri khas bahasa Jerman!",
      },
      {
        title: "Rutinitas Pagi",
        explanation: "Kosakata untuk kegiatan di pagi hari.",
        examples: [
          { german: "aufwachen", indonesian: "bangun tidur" },
          { german: "aufstehen", indonesian: "berdiri dari tempat tidur" },
          { german: "sich duschen", indonesian: "mandi (shower)", note: "'sich' = refleksif" },
          { german: "sich waschen", indonesian: "mencuci diri" },
          { german: "sich anziehen", indonesian: "berpakaian" },
          { german: "frühstücken", indonesian: "sarapan", note: "Frühstück = sarapan (kata bendanya)" },
          { german: "Zähne putzen", indonesian: "sikat gigi" },
        ],
      },
      {
        title: "Kegiatan Siang dan Sore",
        explanation: "Aktivitas umum di siang dan sore hari.",
        examples: [
          { german: "arbeiten", indonesian: "bekerja" },
          { german: "lernen / studieren", indonesian: "belajar / kuliah" },
          { german: "Mittagessen", indonesian: "makan siang" },
          { german: "einkaufen gehen", indonesian: "pergi berbelanja" },
          { german: "Sport treiben", indonesian: "berolahraga" },
          { german: "spazieren gehen", indonesian: "jalan-jalan" },
        ],
      },
      {
        title: "Kegiatan Malam",
        explanation: "Rutinitas di malam hari.",
        examples: [
          { german: "Abendessen kochen", indonesian: "memasak makan malam" },
          { german: "fernsehen", indonesian: "menonton TV" },
          { german: "lesen", indonesian: "membaca" },
          { german: "sich entspannen", indonesian: "bersantai / relaksasi" },
          { german: "schlafen gehen", indonesian: "pergi tidur" },
          { german: "ins Bett gehen", indonesian: "pergi ke tempat tidur" },
        ],
      },
      {
        title: "Menyatakan Frekuensi",
        explanation: "Kata keterangan untuk menjelaskan seberapa sering suatu kegiatan dilakukan.",
        examples: [
          { german: "immer", indonesian: "selalu" },
          { german: "oft / häufig", indonesian: "sering" },
          { german: "manchmal", indonesian: "kadang-kadang" },
          { german: "selten", indonesian: "jarang" },
          { german: "nie", indonesian: "tidak pernah" },
          { german: "jeden Tag", indonesian: "setiap hari" },
          { german: "einmal pro Woche", indonesian: "sekali seminggu" },
        ],
        tip: "Posisi kata frekuensi dalam kalimat: Ich lerne JEDEN TAG Deutsch. (Setelah kata kerja atau di tengah kalimat.)",
      },
    ],
    summary: [
      "Kata kerja pemisah: prefiks loncat ke akhir kalimat (Ich stehe auf, Ich kaufe ein)",
      "Rutinitas pagi: aufwachen → duschen → anziehen → frühstücken",
      "Frekuensi: immer, oft, manchmal, selten, nie",
      "Setiap Tag / einmal pro Woche = setiap hari / sekali seminggu",
      "Kata kerja refleksif (sich duschen, sich anziehen) perlu 'sich'",
    ],
  },

  "waktu-senggang": {
    topic: "hobbies",
    introduction:
      "Hobi dan waktu senggang adalah topik percakapan yang sangat umum. Orang Jerman sangat menghargai Freizeit (waktu luang) dan sering bertanya tentang hobi saat berkenalan. Pelajari cara mendeskripsikan dan mendiskusikan hobi dalam bahasa Jerman.",
    sections: [
      {
        title: "Olahraga (Sport)",
        explanation: "Kosakata olahraga yang umum. Banyak yang mirip dengan bahasa Inggris!",
        examples: [
          { german: "Fußball spielen", indonesian: "bermain sepak bola" },
          { german: "Tennis spielen", indonesian: "bermain tenis" },
          { german: "schwimmen", indonesian: "berenang" },
          { german: "laufen / joggen", indonesian: "berlari / jogging" },
          { german: "radfahren", indonesian: "bersepeda" },
          { german: "ins Fitnessstudio gehen", indonesian: "pergi ke gym" },
          { german: "wandern", indonesian: "mendaki / hiking" },
        ],
        tip: "Olahraga yang menggunakan bola: pakai 'spielen'. Aktivitas fisik lain biasanya kata kerja tersendiri.",
      },
      {
        title: "Seni dan Kreativitas",
        explanation: "Hobi yang berhubungan dengan seni dan ekspresi kreatif.",
        examples: [
          { german: "Musik hören", indonesian: "mendengarkan musik" },
          { german: "ein Instrument spielen", indonesian: "memainkan alat musik", note: "spielen = bermain (juga untuk alat musik)" },
          { german: "singen", indonesian: "bernyanyi" },
          { german: "tanzen", indonesian: "menari" },
          { german: "malen / zeichnen", indonesian: "melukis / menggambar" },
          { german: "fotografieren", indonesian: "memotret / fotografi" },
        ],
      },
      {
        title: "Kegiatan Santai",
        explanation: "Hobi yang lebih santai dan indoor.",
        examples: [
          { german: "lesen", indonesian: "membaca" },
          { german: "fernsehen", indonesian: "menonton TV" },
          { german: "ins Kino gehen", indonesian: "pergi ke bioskop" },
          { german: "kochen", indonesian: "memasak" },
          { german: "backen", indonesian: "memanggang / baking" },
          { german: "Videospiele spielen", indonesian: "bermain video game" },
          { german: "reisen", indonesian: "bepergian / travelling" },
        ],
      },
      {
        title: "Cara Berbicara tentang Hobi",
        explanation:
          "Struktur kalimat untuk mengekspresikan hobi dan minat. Perhatikan perbedaan penggunaan 'spielen', 'machen', dan 'gern'.",
        examples: [
          { german: "Mein Hobby ist Lesen.", indonesian: "Hobi saya membaca." },
          { german: "Ich lese gern.", indonesian: "Saya suka membaca." },
          { german: "In meiner Freizeit spiele ich Gitarre.", indonesian: "Di waktu luang saya bermain gitar." },
          { german: "Ich interessiere mich für Fotografie.", indonesian: "Saya tertarik dengan fotografi." },
          { german: "Was machst du in deiner Freizeit?", indonesian: "Apa yang kamu lakukan di waktu luang?" },
          { german: "Ich treibe gern Sport.", indonesian: "Saya suka berolahraga.", note: "Sport treiben = berolahraga (bukan 'Sport machen'!)" },
        ],
        tip: "'Sport treiben' (bukan 'Sport machen') adalah ungkapan baku untuk berolahraga secara umum.",
      },
      {
        title: "Mengajak dan Merespons",
        explanation: "Cara mengajak seseorang melakukan aktivitas dan cara merespons.",
        examples: [
          { german: "Hast du Lust, ins Kino zu gehen?", indonesian: "Apakah kamu mau pergi ke bioskop?" },
          { german: "Ja, gerne!", indonesian: "Ya, dengan senang hati!" },
          { german: "Leider nicht.", indonesian: "Sayangnya tidak." },
          { german: "Vielleicht ein anderes Mal.", indonesian: "Mungkin lain kali." },
          { german: "Das klingt gut!", indonesian: "Kedengarannya bagus!" },
        ],
      },
    ],
    summary: [
      "Olahraga dengan bola: ... spielen (Fußball spielen, Tennis spielen)",
      "Olahraga umum: Sport treiben (bukan Sport machen)",
      "Musik: Musik hören, ein Instrument spielen, singen",
      "Ekspresi hobi: Ich ... gern / Mein Hobby ist ... / Ich interessiere mich für ...",
      "Mengajak: Hast du Lust, ...? → Ja, gerne! / Leider nicht.",
    ],
  },
};