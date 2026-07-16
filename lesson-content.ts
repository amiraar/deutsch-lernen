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
  culturalNote?: {
    title: string;
    content: string;
  };
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
        culturalNote: {
          title: "Formal vs Informal di Jerman",
          content:
            "Di Jerman, menggunakan 'du' kepada orang asing dianggap tidak sopan. Tunggu sampai orang lain mengajak 'duzen' (beralih ke du) sebelum kamu menggunakannya. Di tempat kerja, bahkan rekan kerja yang sudah lama pun mungkin tetap pakai 'Sie'.",
        },
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

  "perfekt-tense": {
    topic: "past_tense",
    introduction:
      "Perfekt adalah bentuk lampau yang paling sering dipakai dalam percakapan sehari-hari. Kamu akan belajar pola dasar Perfekt, pemilihan haben/sein, serta Partizip II regular dan irregular.",
    sections: [
      {
        title: "Konsep Dasar Perfekt",
        explanation:
          "Perfekt dibentuk dengan kata kerja bantu (haben/sein) + Partizip II di akhir kalimat. Biasanya dipakai untuk kejadian masa lalu dalam percakapan.",
        examples: [
          { german: "Ich habe gegessen.", indonesian: "Saya sudah makan." },
          { german: "Wir haben Deutsch gelernt.", indonesian: "Kami sudah belajar bahasa Jerman." },
          { german: "Er hat gearbeitet.", indonesian: "Dia sudah bekerja." },
          { german: "Sie hat eine E-Mail geschrieben.", indonesian: "Dia sudah menulis email." },
          { german: "Habt ihr heute gekocht?", indonesian: "Apakah kalian memasak hari ini?" },
        ],
        tip: "Ingat: kata kerja bantu di posisi ke-2, Partizip II di akhir kalimat.",
      },
      {
        title: "Partizip II Regular (ge- + -t)",
        explanation:
          "Kata kerja regular membentuk Partizip II dengan ge- + akar + -t. Contoh: machen → gemacht.",
        examples: [
          { german: "machen → gemacht", indonesian: "melakukan → dilakukan" },
          { german: "spielen → gespielt", indonesian: "bermain → dimainkan" },
          { german: "lernen → gelernt", indonesian: "belajar → belajar (lampau)" },
          { german: "arbeiten → gearbeitet", indonesian: "bekerja → bekerja (lampau)" },
          { german: "fragen → gefragt", indonesian: "bertanya → bertanya (lampau)" },
        ],
        tip: "Kata kerja berakhiran -ieren tidak pakai ge-: studieren → studiert.",
      },
      {
        title: "Partizip II Irregular (ge- + -en)",
        explanation:
          "Kata kerja tidak beraturan punya bentuk Partizip II khusus, sering berakhiran -en dan berubah vokal.",
        examples: [
          { german: "gehen → gegangen", indonesian: "pergi → pergi (lampau)" },
          { german: "sehen → gesehen", indonesian: "melihat → melihat (lampau)" },
          { german: "finden → gefunden", indonesian: "menemukan → ditemukan" },
          { german: "lesen → gelesen", indonesian: "membaca → membaca (lampau)" },
          { german: "trinken → getrunken", indonesian: "minum → minum (lampau)" },
        ],
        tip: "Bentuk irregular harus dihafal satu per satu.",
      },
      {
        title: "Haben vs Sein",
        explanation:
          "Sebagian besar kata kerja memakai haben. Sein dipakai untuk gerak/perubahan keadaan (gehen, kommen, werden, bleiben).",
        examples: [
          { german: "Ich bin nach Hause gegangen.", indonesian: "Saya pulang ke rumah." },
          { german: "Wir sind um 8 Uhr gekommen.", indonesian: "Kami datang jam 8." },
          { german: "Er ist krank geworden.", indonesian: "Dia menjadi sakit." },
          { german: "Sie ist in Berlin geblieben.", indonesian: "Dia tetap tinggal di Berlin." },
          { german: "Ich habe gestern angerufen.", indonesian: "Saya menelepon kemarin." },
        ],
        tip: "Kalau ada perpindahan tempat atau perubahan kondisi, biasanya pakai sein.",
      },
    ],
    summary: [
      "Perfekt = haben/sein + Partizip II di akhir kalimat",
      "Regular: ge- + akar + -t (machen → gemacht)",
      "Irregular: bentuk khusus, sering -en (gehen → gegangen)",
      "sein dipakai untuk gerak/perubahan keadaan",
      "haben dipakai untuk mayoritas kata kerja lain",
    ],
  },

  "modalverben": {
    topic: "modal_verbs",
    introduction:
      "Modalverben menambah nuansa kemampuan, keharusan, izin, keinginan, dan saran. Dalam kalimat, modal berada di posisi ke-2 dan kata kerja utama kembali ke bentuk infinitif di akhir.",
    sections: [
      {
        title: "können (bisa/mampu)",
        explanation:
          "Konjugasi: ich kann, du kannst, er/sie/es kann, wir können, ihr könnt, sie/Sie können.",
        examples: [
          { german: "Ich kann Deutsch sprechen.", indonesian: "Saya bisa berbicara bahasa Jerman." },
          { german: "Kannst du heute kommen?", indonesian: "Apakah kamu bisa datang hari ini?" },
          { german: "Er kann gut schwimmen.", indonesian: "Dia bisa berenang dengan baik." },
          { german: "Wir können dir helfen.", indonesian: "Kami bisa membantumu." },
          { german: "Sie können hier warten.", indonesian: "Anda bisa menunggu di sini." },
        ],
      },
      {
        title: "müssen (harus)",
        explanation:
          "Konjugasi: ich muss, du musst, er/sie/es muss, wir müssen, ihr müsst, sie/Sie müssen.",
        examples: [
          { german: "Ich muss arbeiten.", indonesian: "Saya harus bekerja." },
          { german: "Du musst früh aufstehen.", indonesian: "Kamu harus bangun pagi." },
          { german: "Er muss lernen.", indonesian: "Dia harus belajar." },
          { german: "Wir müssen los.", indonesian: "Kami harus berangkat." },
          { german: "Müssen Sie das heute erledigen?", indonesian: "Apakah Anda harus menyelesaikan ini hari ini?" },
        ],
      },
      {
        title: "dürfen (boleh)",
        explanation:
          "Konjugasi: ich darf, du darfst, er/sie/es darf, wir dürfen, ihr dürft, sie/Sie dürfen.",
        examples: [
          { german: "Darf ich hier sitzen?", indonesian: "Boleh saya duduk di sini?" },
          { german: "Du darfst heute früh gehen.", indonesian: "Kamu boleh pulang lebih awal hari ini." },
          { german: "Er darf nicht rauchen.", indonesian: "Dia tidak boleh merokok." },
          { german: "Wir dürfen Fotos machen.", indonesian: "Kami boleh mengambil foto." },
          { german: "Dürfen Sie das Fenster öffnen?", indonesian: "Apakah Anda boleh membuka jendela?" },
        ],
      },
      {
        title: "wollen (ingin/berniat)",
        explanation:
          "Konjugasi: ich will, du willst, er/sie/es will, wir wollen, ihr wollt, sie/Sie wollen.",
        examples: [
          { german: "Ich will mehr lernen.", indonesian: "Saya ingin belajar lebih banyak." },
          { german: "Willst du Kaffee trinken?", indonesian: "Apakah kamu ingin minum kopi?" },
          { german: "Er will Arzt werden.", indonesian: "Dia ingin menjadi dokter." },
          { german: "Wir wollen nach Berlin fahren.", indonesian: "Kami ingin pergi ke Berlin." },
          { german: "Sie wollen ein Ticket kaufen.", indonesian: "Mereka ingin membeli tiket." },
        ],
      },
      {
        title: "sollen (sebaiknya/harus menurut orang lain)",
        explanation:
          "Konjugasi: ich soll, du sollst, er/sie/es soll, wir sollen, ihr sollt, sie/Sie sollen.",
        examples: [
          { german: "Ich soll mehr schlafen.", indonesian: "Saya seharusnya tidur lebih banyak." },
          { german: "Du sollst zum Arzt gehen.", indonesian: "Kamu sebaiknya pergi ke dokter." },
          { german: "Er soll pünktlich sein.", indonesian: "Dia harus tepat waktu (menurut aturan)." },
          { german: "Wir sollen warten.", indonesian: "Kami diminta menunggu." },
          { german: "Sollen wir anfangen?", indonesian: "Haruskah kita mulai?" },
        ],
      },
      {
        title: "möchten (ingin dengan sopan)",
        explanation:
          "Konjugasi: ich möchte, du möchtest, er/sie/es möchte, wir möchten, ihr möchtet, sie/Sie möchten.",
        examples: [
          { german: "Ich möchte ein Wasser.", indonesian: "Saya ingin air (sopan)." },
          { german: "Möchtest du etwas essen?", indonesian: "Apakah kamu mau makan sesuatu?" },
          { german: "Er möchte später kommen.", indonesian: "Dia ingin datang nanti." },
          { german: "Wir möchten reservieren.", indonesian: "Kami ingin reservasi." },
          { german: "Möchten Sie bezahlen?", indonesian: "Apakah Anda ingin membayar?" },
        ],
      },
    ],
    summary: [
      "Modal berada di posisi ke-2, kata kerja utama infinitif di akhir",
      "können = bisa, müssen = harus, dürfen = boleh",
      "wollen = ingin, sollen = sebaiknya/harus (menurut aturan)",
      "möchten = ingin (lebih sopan)",
      "Konjugasi modal berubah bentuk pada ich/du/er",
    ],
  },

  "konjunktionen": {
    topic: "conjunctions",
    introduction:
      "Konjungsi menyambungkan ide dalam kalimat. Ada dua jenis utama: koordinating (tidak mengubah urutan kata) dan subordinating (mendorong kata kerja ke akhir).",
    sections: [
      {
        title: "Koordinating Conjunctions",
        explanation:
          "Konjungsi koordinasi menghubungkan dua kalimat setara. Urutan kata tetap seperti kalimat biasa.",
        examples: [
          { german: "Ich lerne Deutsch und ich arbeite.", indonesian: "Saya belajar Jerman dan saya bekerja." },
          { german: "Er ist müde, aber er kommt.", indonesian: "Dia lelah, tetapi dia datang." },
          { german: "Möchtest du Tee oder Kaffee?", indonesian: "Kamu mau teh atau kopi?" },
          { german: "Wir bleiben zu Hause, denn es regnet.", indonesian: "Kami di rumah, karena hujan." },
          { german: "Sie mag Musik und er mag Sport.", indonesian: "Dia suka musik dan dia suka olahraga." },
        ],
      },
      {
        title: "Subordinating Conjunctions",
        explanation:
          "Konjungsi subordinasi membuat anak kalimat dan menaruh kata kerja di akhir.",
        examples: [
          { german: "Ich bleibe zu Hause, weil ich krank bin.", indonesian: "Saya tetap di rumah karena saya sakit." },
          { german: "Er sagt, dass er keine Zeit hat.", indonesian: "Dia berkata bahwa dia tidak punya waktu." },
          { german: "Obwohl es kalt ist, gehen wir spazieren.", indonesian: "Walaupun dingin, kami tetap jalan-jalan." },
          { german: "Wenn ich Zeit habe, rufe ich dich an.", indonesian: "Kalau saya punya waktu, saya akan meneleponmu." },
          { german: "Sie bleibt, weil sie lernen muss.", indonesian: "Dia tinggal karena harus belajar." },
        ],
        tip: "Di anak kalimat, kata kerja selalu di akhir.",
      },
      {
        title: "Perubahan Word Order",
        explanation:
          "Jika anak kalimat (subordinating) berada di awal, kalimat utama mengalami inversi (kata kerja di posisi ke-2).",
        examples: [
          { german: "Weil ich krank bin, bleibe ich zu Hause.", indonesian: "Karena saya sakit, saya tetap di rumah." },
          { german: "Wenn er Zeit hat, kommt er vorbei.", indonesian: "Jika dia punya waktu, dia mampir." },
          { german: "Obwohl es spät ist, arbeiten wir weiter.", indonesian: "Walaupun sudah larut, kami terus bekerja." },
          { german: "Dass er hilft, ist klar.", indonesian: "Bahwa dia membantu itu jelas." },
          { german: "Weil sie müde ist, geht sie früh schlafen.", indonesian: "Karena dia lelah, dia tidur lebih awal." },
        ],
      },
      {
        title: "Menggabungkan Ide",
        explanation:
          "Gunakan konjungsi yang tepat untuk menunjukkan alasan, pilihan, atau kontras.",
        examples: [
          { german: "Ich trinke Tee, weil Kaffee zu stark ist.", indonesian: "Saya minum teh karena kopi terlalu kuat." },
          { german: "Willst du kommen oder zu Hause bleiben?", indonesian: "Kamu mau datang atau tetap di rumah?" },
          { german: "Er ist müde, aber er lernt weiter.", indonesian: "Dia lelah, tetapi tetap belajar." },
          { german: "Sie arbeitet viel, denn sie braucht Geld.", indonesian: "Dia bekerja banyak karena butuh uang." },
          { german: "Wenn wir fertig sind, gehen wir essen.", indonesian: "Kalau sudah selesai, kita pergi makan." },
        ],
      },
    ],
    summary: [
      "Koordinating: und, aber, oder, denn (word order tetap)",
      "Subordinating: weil, dass, obwohl, wenn (kata kerja di akhir)",
      "Anak kalimat di depan → inversi di kalimat utama",
      "denn mirip karena, tapi tidak mengubah word order",
      "weil selalu mendorong kata kerja ke akhir",
    ],
  },

  "komparativ-superlativ": {
    topic: "comparison",
    introduction:
      "Untuk membandingkan sesuatu, bahasa Jerman memakai Komparativ (-er) dan Superlativ (am ...-sten / -sten). Ada beberapa bentuk tidak beraturan yang wajib dihafal.",
    sections: [
      {
        title: "Komparativ Regular",
        explanation: "Komparativ dibentuk dengan menambah -er pada kata sifat.",
        examples: [
          { german: "groß → größer", indonesian: "besar → lebih besar" },
          { german: "schnell → schneller", indonesian: "cepat → lebih cepat" },
          { german: "langsam → langsamer", indonesian: "lambat → lebih lambat" },
          { german: "teuer → teurer", indonesian: "mahal → lebih mahal" },
          { german: "billig → billiger", indonesian: "murah → lebih murah" },
        ],
      },
      {
        title: "Superlativ Regular",
        explanation: "Superlativ biasanya memakai pola am + adjektiv + -sten.",
        examples: [
          { german: "am größten", indonesian: "paling besar" },
          { german: "am schnellsten", indonesian: "paling cepat" },
          { german: "am langsamsten", indonesian: "paling lambat" },
          { german: "am teuersten", indonesian: "paling mahal" },
          { german: "am billigsten", indonesian: "paling murah" },
        ],
        tip: "Jika adjektif berakhir -d/-t/-s/-ß, sering butuh -esten.",
      },
      {
        title: "Irregular Comparisons",
        explanation: "Beberapa kata sifat berubah bentuk secara tidak beraturan.",
        examples: [
          { german: "gut → besser → am besten", indonesian: "baik → lebih baik → paling baik" },
          { german: "viel → mehr → am meisten", indonesian: "banyak → lebih banyak → paling banyak" },
          { german: "gern → lieber → am liebsten", indonesian: "suka → lebih suka → paling suka" },
          { german: "hoch → höher → am höchsten", indonesian: "tinggi → lebih tinggi → paling tinggi" },
          { german: "nah → näher → am nächsten", indonesian: "dekat → lebih dekat → paling dekat" },
        ],
      },
      {
        title: "Perbandingan dalam Kalimat",
        explanation: "Gunakan als (daripada) untuk komparatif.",
        examples: [
          { german: "Berlin ist größer als Hamburg.", indonesian: "Berlin lebih besar daripada Hamburg." },
          { german: "Dieses Auto ist schneller als das alte.", indonesian: "Mobil ini lebih cepat daripada yang lama." },
          { german: "Das ist am besten.", indonesian: "Itu yang paling baik." },
          { german: "Heute ist es wärmer als gestern.", indonesian: "Hari ini lebih hangat daripada kemarin." },
          { german: "Sie singt am schönsten.", indonesian: "Dia bernyanyi paling indah." },
        ],
      },
    ],
    summary: [
      "Komparativ: adjektiv + -er",
      "Superlativ: am + adjektiv + -sten",
      "Als dipakai untuk membandingkan dua hal",
      "Bentuk irregular harus dihafal (gut → besser → am besten)",
      "Perhatikan tambahan -esten untuk kata berakhiran tertentu",
    ],
  },

  "dativ-akkusativ": {
    topic: "cases",
    introduction:
      "Bahasa Jerman memiliki kasus (Nominativ, Akkusativ, Dativ) yang memengaruhi artikel dan fungsi kata dalam kalimat. Di pelajaran ini kamu fokus pada perbedaan Akkusativ dan Dativ.",
    sections: [
      {
        title: "Fungsi Nominativ, Akkusativ, Dativ",
        explanation:
          "Nominativ untuk subjek, Akkusativ untuk objek langsung, Dativ untuk objek tidak langsung.",
        examples: [
          { german: "Der Mann sieht den Hund.", indonesian: "Pria itu melihat anjing itu.", note: "den Hund = Akkusativ" },
          { german: "Die Frau gibt dem Kind ein Buch.", indonesian: "Wanita itu memberi anak sebuah buku.", note: "dem Kind = Dativ" },
          { german: "Ich helfe dem Freund.", indonesian: "Saya membantu teman (Dativ)." },
          { german: "Wir haben einen Tisch.", indonesian: "Kami punya sebuah meja (Akkusativ)." },
          { german: "Das Kind ist müde.", indonesian: "Anak itu lelah (Nominativ)." },
        ],
      },
      {
        title: "Perubahan Artikel",
        explanation:
          "Artikel berubah sesuai kasus: der → den (Akk), der → dem (Dat).",
        examples: [
          { german: "der Mann → den Mann → dem Mann", indonesian: "maskulin: Nominativ → Akkusativ → Dativ" },
          { german: "die Frau → die Frau → der Frau", indonesian: "feminin: der Frau (Dativ)" },
          { german: "das Kind → das Kind → dem Kind", indonesian: "netral: dem Kind (Dativ)" },
          { german: "ein Mann → einen Mann → einem Mann", indonesian: "artikel tidak tentu: einen/einem" },
          { german: "Ich sehe den Lehrer.", indonesian: "Saya melihat guru itu (Akkusativ)." },
        ],
        tip: "Maskulin berubah paling jelas: der → den → dem.",
      },
      {
        title: "Preposisi Selalu Akkusativ",
        explanation:
          "Beberapa preposisi selalu diikuti Akkusativ.",
        examples: [
          { german: "durch die Stadt", indonesian: "melalui kota" },
          { german: "für meinen Bruder", indonesian: "untuk kakak laki-laki saya" },
          { german: "ohne dich", indonesian: "tanpamu" },
          { german: "gegen den Wind", indonesian: "melawan angin" },
          { german: "um den Tisch", indonesian: "mengelilingi meja" },
        ],
      },
      {
        title: "Preposisi Selalu Dativ",
        explanation:
          "Preposisi berikut selalu memakai Dativ.",
        examples: [
          { german: "mit dem Zug", indonesian: "dengan kereta" },
          { german: "nach der Arbeit", indonesian: "setelah kerja" },
          { german: "aus dem Haus", indonesian: "dari rumah" },
          { german: "bei der Freundin", indonesian: "di tempat teman perempuan" },
          { german: "zu dem Arzt", indonesian: "ke dokter" },
        ],
      },
    ],
    summary: [
      "Nominativ = subjek, Akkusativ = objek langsung, Dativ = objek tidak langsung",
      "Maskulin berubah: der → den → dem",
      "Artikel tidak tentu: ein → einen → einem",
      "Preposisi Akkusativ: durch, für, ohne, gegen, um",
      "Preposisi Dativ: mit, nach, aus, bei, von, zu, seit",
    ],
  },

  "konjunktiv-ii": {
    topic: "subjunctive",
    introduction:
      "Konjunktiv II dipakai untuk menyatakan kondisi tidak nyata, keinginan, dan permintaan sopan. Bentuk yang paling umum adalah würde + Infinitiv.",
    sections: [
      {
        title: "würde + Infinitiv",
        explanation:
          "Pola paling praktis: würde (konjugasi) + kata kerja infinitif di akhir.",
        examples: [
          { german: "Ich würde gern reisen.", indonesian: "Saya ingin sekali bepergian." },
          { german: "Er würde mehr lernen.", indonesian: "Dia akan belajar lebih banyak (andaikan)." },
          { german: "Wir würden helfen.", indonesian: "Kami akan membantu (jika bisa)." },
          { german: "Würdest du kommen?", indonesian: "Apakah kamu mau datang?" },
          { german: "Sie würden es kaufen.", indonesian: "Mereka akan membelinya." },
        ],
      },
      {
        title: "Irreale Bedingungen",
        explanation:
          "Kalimat pengandaian yang tidak nyata sering memakai wenn + Konjunktiv II.",
        examples: [
          { german: "Wenn ich Zeit hätte, würde ich kommen.", indonesian: "Jika saya punya waktu, saya akan datang." },
          { german: "Wenn er mehr Geld hätte, würde er reisen.", indonesian: "Jika dia punya lebih banyak uang, dia akan bepergian." },
          { german: "Wenn wir in Berlin wären, würden wir dich besuchen.", indonesian: "Jika kami di Berlin, kami akan mengunjungimu." },
          { german: "Wenn ich du wäre, würde ich das nicht tun.", indonesian: "Kalau saya jadi kamu, saya tidak akan melakukan itu." },
          { german: "Wenn sie Zeit hätte, würde sie helfen.", indonesian: "Jika dia punya waktu, dia akan membantu." },
        ],
      },
      {
        title: "Höfliche Anfragen",
        explanation: "Konjunktiv II membuat permintaan terdengar lebih sopan.",
        examples: [
          { german: "Könnten Sie mir helfen?", indonesian: "Bisakah Anda membantu saya?" },
          { german: "Würden Sie bitte hier warten?", indonesian: "Bisakah Anda menunggu di sini?" },
          { german: "Hätten Sie einen Moment?", indonesian: "Apakah Anda punya waktu sebentar?" },
          { german: "Ich würde gern bezahlen.", indonesian: "Saya ingin membayar (sopan)." },
          { german: "Dürfte ich fragen?", indonesian: "Bolehkah saya bertanya?" },
        ],
      },
      {
        title: "Bentuk Khusus (wäre, hätte, könnte)",
        explanation:
          "Beberapa kata kerja punya bentuk khusus yang sering dipakai tanpa würde.",
        examples: [
          { german: "Ich wäre jetzt lieber zu Hause.", indonesian: "Saya lebih ingin di rumah sekarang." },
          { german: "Er hätte Zeit.", indonesian: "Dia akan punya waktu (andaikan)." },
          { german: "Wir könnten später gehen.", indonesian: "Kami bisa pergi nanti (andaikan)." },
          { german: "Sie müsste mehr schlafen.", indonesian: "Dia seharusnya tidur lebih banyak." },
          { german: "Ich möchte das versuchen.", indonesian: "Saya ingin mencoba itu (sopan)." },
        ],
      },
    ],
    summary: [
      "Konjunktiv II = kondisi tidak nyata dan permintaan sopan",
      "Pola praktis: würde + infinitif",
      "Kalimat pengandaian: wenn + Konjunktiv II",
      "Bentuk khusus yang sering dipakai: wäre, hätte, könnte",
      "Gunakan bentuk ini untuk membuat permintaan lebih halus",
    ],
  },

  "passiv": {
    topic: "passive_voice",
    introduction:
      "Pasif digunakan ketika fokus pada proses atau hasil, bukan pelaku. Ada dua jenis: Vorgangspassiv (proses) dan Zustandspassiv (keadaan).",
    sections: [
      {
        title: "Vorgangspassiv (werden + Partizip II)",
        explanation:
          "Menekankan proses atau tindakan yang sedang terjadi.",
        examples: [
          { german: "Das Haus wird gebaut.", indonesian: "Rumah itu sedang dibangun." },
          { german: "Der Brief wird geschrieben.", indonesian: "Surat itu sedang ditulis." },
          { german: "Die Tür wird geschlossen.", indonesian: "Pintunya sedang ditutup." },
          { german: "Die Aufgaben werden erklärt.", indonesian: "Tugas-tugas dijelaskan." },
          { german: "Das Problem wird gelöst.", indonesian: "Masalah diselesaikan." },
        ],
      },
      {
        title: "Zustandspassiv (sein + Partizip II)",
        explanation:
          "Menekankan keadaan hasil setelah proses selesai.",
        examples: [
          { german: "Das Haus ist gebaut.", indonesian: "Rumah itu sudah dibangun (hasilnya)." },
          { german: "Die Tür ist geschlossen.", indonesian: "Pintunya sudah tertutup." },
          { german: "Die Aufgabe ist erledigt.", indonesian: "Tugasnya sudah selesai." },
          { german: "Der Brief ist geschrieben.", indonesian: "Suratnya sudah ditulis." },
          { german: "Das Fenster ist geöffnet.", indonesian: "Jendelanya terbuka (hasil)." },
        ],
      },
      {
        title: "Kapan Aktif vs Pasif",
        explanation:
          "Aktif menonjolkan pelaku, pasif menonjolkan tindakan atau hasil.",
        examples: [
          { german: "Der Koch kocht das Essen.", indonesian: "Koki memasak makanan (aktif)." },
          { german: "Das Essen wird gekocht.", indonesian: "Makanan sedang dimasak (pasif proses)." },
          { german: "Das Essen ist gekocht.", indonesian: "Makanan sudah dimasak (pasif keadaan)." },
          { german: "Die Firma baut die Brücke.", indonesian: "Perusahaan membangun jembatan (aktif)." },
          { german: "Die Brücke wird gebaut.", indonesian: "Jembatan sedang dibangun (pasif)." },
        ],
      },
    ],
    summary: [
      "Vorgangspassiv: werden + Partizip II (fokus proses)",
      "Zustandspassiv: sein + Partizip II (fokus hasil)",
      "Aktif menonjolkan pelaku, pasif menonjolkan tindakan",
      "Pasif sering dipakai di laporan, berita, dan instruksi",
      "Pelaku bisa ditambahkan dengan von + Dativ",
    ],
  },

  "nebensatze": {
    topic: "subordinate_clauses",
    introduction:
      "Nebensatz (anak kalimat) memperkaya informasi. Di level ini kamu belajar Relativsatz, pertanyaan tidak langsung, dan konstruksi infinitif.",
    sections: [
      {
        title: "Relativsatz",
        explanation:
          "Relativsatz menggunakan der/die/das sebagai relativpronomen dan menaruh kata kerja di akhir.",
        examples: [
          { german: "Das ist der Mann, der hier wohnt.", indonesian: "Itu pria yang tinggal di sini." },
          { german: "Ich kenne die Frau, die Deutsch spricht.", indonesian: "Saya kenal wanita yang berbicara Jerman." },
          { german: "Das Buch, das du liest, ist interessant.", indonesian: "Buku yang kamu baca itu menarik." },
          { german: "Die Stadt, in der ich wohne, ist groß.", indonesian: "Kota tempat saya tinggal besar." },
          { german: "Der Freund, mit dem ich lerne, ist nett.", indonesian: "Teman yang belajar dengan saya itu baik." },
        ],
      },
      {
        title: "Indirekte Fragen",
        explanation:
          "Pertanyaan tidak langsung memakai ob atau kata tanya, dan kata kerja di akhir.",
        examples: [
          { german: "Ich weiß nicht, wo er wohnt.", indonesian: "Saya tidak tahu di mana dia tinggal." },
          { german: "Können Sie mir sagen, wie spät es ist?", indonesian: "Bisakah Anda bilang jam berapa?" },
          { german: "Er fragt, ob du kommst.", indonesian: "Dia bertanya apakah kamu datang." },
          { german: "Ich weiß nicht, wann der Zug fährt.", indonesian: "Saya tidak tahu kapan kereta berangkat." },
          { german: "Sie fragt, warum du traurig bist.", indonesian: "Dia bertanya kenapa kamu sedih." },
        ],
      },
      {
        title: "Infinitivkonstruktionen",
        explanation:
          "Konstruksi infinitif memakai um...zu, ohne...zu, statt...zu.",
        examples: [
          { german: "Ich lerne, um die Prüfung zu bestehen.", indonesian: "Saya belajar untuk lulus ujian." },
          { german: "Er geht, ohne etwas zu sagen.", indonesian: "Dia pergi tanpa mengatakan apa-apa." },
          { german: "Sie kam, statt anzurufen.", indonesian: "Dia datang alih-alih menelepon." },
          { german: "Wir sparen, um ein Auto zu kaufen.", indonesian: "Kami menabung untuk membeli mobil." },
          { german: "Er arbeitet, ohne sich zu beschweren.", indonesian: "Dia bekerja tanpa mengeluh." },
        ],
      },
    ],
    summary: [
      "Relativsatz memakai der/die/das dan kata kerja di akhir",
      "Pertanyaan tidak langsung: ob / kata tanya + kata kerja di akhir",
      "Infinitifkonstruktion: um...zu, ohne...zu, statt...zu",
      "Anak kalimat memperjelas informasi tambahan",
      "Gunakan preposisi untuk relativsatz kompleks (mit dem, in der)",
    ],
  },

  "wortbildung": {
    topic: "word_formation",
    introduction:
      "Wortbildung membantumu menebak arti kata baru. Kamu akan belajar prefiks, sufiks, komposita, dan derivasi.",
    sections: [
      {
        title: "Präfixe (un-, miss-, ver-, zer-)",
        explanation:
          "Prefiks mengubah arti kata dasar.",
        examples: [
          { german: "glücklich → unglücklich", indonesian: "bahagia → tidak bahagia" },
          { german: "verstehen → missverstehen", indonesian: "mengerti → salah paham" },
          { german: "kaufen → verkaufen", indonesian: "membeli → menjual" },
          { german: "teilen → zerteilen", indonesian: "membagi → memecah" },
          { german: "arbeiten → verarbeiten", indonesian: "bekerja → mengolah" },
        ],
      },
      {
        title: "Suffixe (-heit, -keit, -ung)",
        explanation:
          "Sufiks mengubah kelas kata, biasanya menjadi kata benda abstrak.",
        examples: [
          { german: "frei → Freiheit", indonesian: "bebas → kebebasan" },
          { german: "möglich → Möglichkeit", indonesian: "mungkin → kemungkinan" },
          { german: "schön → Schönheit", indonesian: "indah → keindahan" },
          { german: "entwickeln → Entwicklung", indonesian: "mengembangkan → perkembangan" },
          { german: "erklären → Erklärung", indonesian: "menjelaskan → penjelasan" },
        ],
      },
      {
        title: "Komposita (Zusammensetzung)",
        explanation:
          "Kata majemuk digabung dari beberapa kata dasar.",
        examples: [
          { german: "die Hausaufgabe", indonesian: "pekerjaan rumah" },
          { german: "der Sprachkurs", indonesian: "kursus bahasa" },
          { german: "das Stadtzentrum", indonesian: "pusat kota" },
          { german: "die Zugfahrt", indonesian: "perjalanan kereta" },
          { german: "die Krankenversicherung", indonesian: "asuransi kesehatan" },
        ],
        tip: "Kata terakhir menentukan gender dan arti utama.",
      },
      {
        title: "Derivation (Kelas Kata)",
        explanation:
          "Derivasi mengubah kelas kata: adjektif → noun, verb → noun, dll.",
        examples: [
          { german: "lernen → der Lerner", indonesian: "belajar → pembelajar" },
          { german: "fahren → der Fahrer", indonesian: "mengemudi → pengemudi" },
          { german: "kreativ → Kreativität", indonesian: "kreatif → kreativitas" },
          { german: "schnell → Schnelligkeit", indonesian: "cepat → kecepatan" },
          { german: "freundlich → Freundlichkeit", indonesian: "ramah → keramahan" },
        ],
      },
    ],
    summary: [
      "Prefiks un-/miss-/ver-/zer- mengubah arti kata",
      "Sufiks -heit/-keit/-ung membuat kata benda abstrak",
      "Komposita menggabungkan kata dasar, gender ikut kata terakhir",
      "Derivasi mengubah kelas kata",
      "Wortbildung membantu menebak arti kata baru",
    ],
  },

  "formelle-sprache": {
    topic: "formal_language",
    introduction:
      "Bahasa formal dipakai untuk surat resmi, email kerja, dan situasi profesional. Di sini kamu belajar gaya bahasa yang sopan dan terstruktur.",
    sections: [
      {
        title: "Formell vs Informell",
        explanation:
          "Pakai Sie, ungkapan sopan, dan struktur kalimat yang lengkap.",
        examples: [
          { german: "Können Sie mir bitte helfen?", indonesian: "Bisakah Anda membantu saya? (formal)" },
          { german: "Ich möchte einen Termin vereinbaren.", indonesian: "Saya ingin membuat janji." },
          { german: "Vielen Dank im Voraus.", indonesian: "Terima kasih sebelumnya." },
          { german: "Ich schreibe Ihnen wegen...", indonesian: "Saya menulis kepada Anda terkait..." },
          { german: "Mit freundlichen Grüßen", indonesian: "Salam hormat" },
        ],
      },
      {
        title: "Bewerbungsschreiben Basics",
        explanation:
          "Surat lamaran kerja memiliki struktur formal: pembuka, isi singkat, penutup.",
        examples: [
          { german: "Sehr geehrte Damen und Herren,", indonesian: "Yang terhormat Bapak/Ibu," },
          { german: "hiermit bewerbe ich mich um die Stelle als...", indonesian: "dengan ini saya melamar posisi sebagai..." },
          { german: "Ich habe Erfahrung in...", indonesian: "Saya memiliki pengalaman dalam..." },
          { german: "Gern stehe ich für ein Gespräch zur Verfügung.", indonesian: "Saya siap untuk wawancara." },
          { german: "Ich freue mich auf Ihre Rückmeldung.", indonesian: "Saya menantikan kabar Anda." },
        ],
      },
      {
        title: "Höfliche Zustimmung",
        explanation: "Cara menyetujui dengan bahasa sopan.",
        examples: [
          { german: "Ich stimme Ihnen zu.", indonesian: "Saya setuju dengan Anda." },
          { german: "Das klingt sehr vernünftig.", indonesian: "Itu terdengar sangat masuk akal." },
          { german: "Gern nehme ich das Angebot an.", indonesian: "Dengan senang hati saya menerima tawaran itu." },
          { german: "Ich bin damit einverstanden.", indonesian: "Saya setuju dengan itu." },
          { german: "Vielen Dank für das Angebot.", indonesian: "Terima kasih atas tawarannya." },
        ],
      },
      {
        title: "Höfliche Ablehnung",
        explanation: "Cara menolak dengan sopan dan profesional.",
        examples: [
          { german: "Leider kann ich das nicht annehmen.", indonesian: "Sayangnya saya tidak bisa menerimanya." },
          { german: "Ich muss Ihr Angebot ablehnen.", indonesian: "Saya harus menolak tawaran Anda." },
          { german: "Vielen Dank, aber ich habe mich anders entschieden.", indonesian: "Terima kasih, tetapi saya memutuskan yang lain." },
          { german: "Ich bitte um Verständnis.", indonesian: "Mohon pengertiannya." },
          { german: "Vielleicht ein anderes Mal.", indonesian: "Mungkin lain kali." },
        ],
      },
    ],
    summary: [
      "Bahasa formal memakai Sie dan ungkapan sopan",
      "Surat lamaran: pembuka formal → isi singkat → penutup",
      "Gunakan kalimat lengkap dan nada profesional",
      "Setuju: Ich stimme Ihnen zu / Ich bin einverstanden",
      "Menolak: Leider kann ich... / Ich bitte um Verständnis",
    ],
  },
  "farben-und-adjektive": {
    topic: "colors",
    introduction:
      "Warna termasuk kosakata pertama yang paling sering kamu pakai — mendeskripsikan baju, benda, dan makanan. Di pelajaran ini kamu belajar warna dasar sekaligus cara memakainya sebagai kata sifat dalam kalimat sederhana.",
    sections: [
      {
        title: "Warna Dasar",
        explanation:
          "Sebelas warna ini mencakup hampir semua kebutuhan sehari-hari. Warna dalam bahasa Jerman ditulis dengan huruf kecil karena termasuk kata sifat.",
        examples: [
          { german: "rot", indonesian: "merah" },
          { german: "blau", indonesian: "biru" },
          { german: "gelb", indonesian: "kuning" },
          { german: "grün", indonesian: "hijau" },
          { german: "schwarz", indonesian: "hitam" },
          { german: "weiß", indonesian: "putih", note: "ß dibaca seperti 'ss'" },
          { german: "braun", indonesian: "cokelat" },
          { german: "grau", indonesian: "abu-abu" },
        ],
        tip: "Untuk warna muda/tua, tambahkan hell- atau dunkel- di depan: hellblau (biru muda), dunkelgrün (hijau tua).",
      },
      {
        title: "Warna Setelah Kata Kerja 'sein'",
        explanation:
          "Cara paling mudah memakai warna: letakkan setelah kata kerja sein (ist/sind). Dalam posisi ini warna TIDAK berubah bentuk.",
        examples: [
          { german: "Der Apfel ist rot.", indonesian: "Apel itu merah." },
          { german: "Die Blume ist gelb.", indonesian: "Bunga itu kuning." },
          { german: "Das Auto ist schwarz.", indonesian: "Mobil itu hitam." },
          { german: "Die Häuser sind grau.", indonesian: "Rumah-rumah itu abu-abu." },
        ],
        tip: "Pola aman untuk pemula: [benda] + ist/sind + [warna]. Tidak perlu memikirkan akhiran.",
      },
      {
        title: "Warna di Depan Kata Benda",
        explanation:
          "Jika warna diletakkan di depan kata benda, ia mendapat akhiran sesuai gender dan kasus. Untuk sekarang, cukup kenali polanya di kasus Nominativ dengan artikel tentu: semua gender memakai akhiran -e.",
        examples: [
          { german: "der rote Apfel", indonesian: "apel merah itu" },
          { german: "die gelbe Blume", indonesian: "bunga kuning itu" },
          { german: "das schwarze Auto", indonesian: "mobil hitam itu" },
          { german: "Ich mag den roten Apfel.", indonesian: "Saya suka apel merah itu.", note: "Akkusativ maskulin: -en" },
        ],
        culturalNote: {
          title: "Warna dan budaya Jerman",
          content:
            "'Blau sein' secara harfiah berarti 'sedang biru' — tapi artinya 'sedang mabuk'! Dan 'alles im grünen Bereich' (semua di area hijau) berarti 'semuanya beres'. Warna sering muncul dalam idiom Jerman.",
        },
      },
    ],
    summary: [
      "Warna ditulis huruf kecil: rot, blau, gelb, grün...",
      "Setelah sein, warna tidak berubah: Das Auto ist rot.",
      "Di depan kata benda, warna mendapat akhiran: der rote Apfel",
      "hell-/dunkel- = muda/tua: hellblau, dunkelgrün",
    ],
  },
  "wetter-und-jahreszeiten": {
    topic: "weather",
    introduction:
      "Cuaca adalah topik basa-basi nomor satu di Jerman — hampir setiap percakapan ringan dimulai dari sini. Kamu akan belajar mendeskripsikan cuaca, empat musim, dan pola kalimat dengan 'es' yang khas Jerman.",
    sections: [
      {
        title: "Kalimat Cuaca dengan 'es'",
        explanation:
          "Bahasa Jerman memakai subjek semu 'es' (seperti 'it' dalam bahasa Inggris) untuk berbicara tentang cuaca. Pola ini wajib — kalimatnya tidak bisa berdiri tanpa 'es'.",
        examples: [
          { german: "Es regnet.", indonesian: "Sedang hujan." },
          { german: "Es schneit.", indonesian: "Sedang turun salju." },
          { german: "Es ist sonnig.", indonesian: "Cerah." },
          { german: "Es ist bewölkt.", indonesian: "Berawan." },
          { german: "Es ist windig.", indonesian: "Berangin." },
        ],
        tip: "Wie ist das Wetter? = Bagaimana cuacanya? Jawab selalu dengan 'Es ist...' atau 'Es + kata kerja'.",
      },
      {
        title: "Suhu dan Perasaan",
        explanation:
          "Untuk suhu, gunakan es ist + kata sifat. Hati-hati: 'Saya kedinginan' TIDAK memakai ich bin, melainkan mir ist.",
        examples: [
          { german: "Es ist heiß.", indonesian: "Panas (cuaca)." },
          { german: "Es ist warm.", indonesian: "Hangat." },
          { german: "Es ist kühl.", indonesian: "Sejuk." },
          { german: "Es ist kalt.", indonesian: "Dingin." },
          { german: "Mir ist kalt.", indonesian: "Saya kedinginan.", note: "BUKAN 'Ich bin kalt'!" },
        ],
        tip: "'Ich bin kalt' berarti 'saya orang yang dingin (tidak ramah)'. Untuk merasa dingin/panas: Mir ist kalt / Mir ist heiß.",
      },
      {
        title: "Empat Musim",
        explanation:
          "Jerman punya empat musim yang jelas. Semua nama musim bergender maskulin (der), dan memakai preposisi 'im' untuk mengatakan 'pada musim...'.",
        examples: [
          { german: "der Frühling", indonesian: "musim semi", note: "Maret–Mei" },
          { german: "der Sommer", indonesian: "musim panas", note: "Juni–Agustus" },
          { german: "der Herbst", indonesian: "musim gugur", note: "September–November" },
          { german: "der Winter", indonesian: "musim dingin", note: "Desember–Februari" },
          { german: "Im Winter schneit es oft.", indonesian: "Pada musim dingin sering turun salju." },
        ],
        culturalNote: {
          title: "Obsesi orang Jerman dengan cuaca",
          content:
            "Jangan heran kalau orang Jerman membicarakan cuaca berkali-kali sehari. Saat matahari muncul setelah berminggu-minggu mendung, taman dan kafe langsung penuh — fenomena ini dijuluki 'Biergartenwetter' (cuaca kebun bir).",
        },
      },
    ],
    summary: [
      "Cuaca selalu memakai subjek semu 'es': Es regnet, Es ist kalt",
      "Merasa dingin/panas: Mir ist kalt (bukan Ich bin kalt)",
      "Empat musim semuanya maskulin: der Frühling, der Sommer, der Herbst, der Winter",
      "'Pada musim...' = im: im Sommer, im Winter",
    ],
  },
  "praeteritum": {
    topic: "past_tense",
    introduction:
      "Selain Perfekt, bahasa Jerman punya bentuk lampau kedua: Präteritum. Bentuk ini dipakai dalam tulisan (berita, novel, dongeng) dan untuk kata kerja sein, haben, serta modal — bahkan dalam percakapan. Menguasainya membuat kamu bisa membaca teks Jerman sungguhan.",
    sections: [
      {
        title: "Kapan Präteritum Dipakai?",
        explanation:
          "Aturan praktis: percakapan memakai Perfekt, tulisan memakai Präteritum. Pengecualian penting: sein, haben, dan kata kerja modal hampir selalu memakai Präteritum, bahkan saat berbicara.",
        examples: [
          { german: "Ich war gestern krank.", indonesian: "Saya sakit kemarin.", note: "war = Präteritum dari sein" },
          { german: "Wir hatten keine Zeit.", indonesian: "Kami tidak punya waktu.", note: "hatten = Präteritum dari haben" },
          { german: "Ich konnte nicht kommen.", indonesian: "Saya tidak bisa datang.", note: "konnte = Präteritum dari können" },
          { german: "Er musste arbeiten.", indonesian: "Dia harus bekerja." },
        ],
        tip: "Tidak ada orang Jerman yang bilang 'Ich bin krank gewesen' dalam obrolan santai — semua bilang 'Ich war krank'. Hafalkan war dan hatte lebih dulu!",
      },
      {
        title: "Kata Kerja Beraturan: Akhiran -te",
        explanation:
          "Kata kerja beraturan membentuk Präteritum dengan menambahkan -te ke akar kata: lernen → lernte. Perhatikan bentuk ich dan er/sie/es sama persis.",
        examples: [
          { german: "ich lernte / er lernte", indonesian: "saya belajar / dia belajar (dulu)" },
          { german: "du lerntest", indonesian: "kamu belajar (dulu)" },
          { german: "wir lernten / sie lernten", indonesian: "kami / mereka belajar (dulu)" },
          { german: "Sie wohnte in Berlin.", indonesian: "Dia (dulu) tinggal di Berlin." },
        ],
      },
      {
        title: "Kata Kerja Tak Beraturan: Ganti Vokal",
        explanation:
          "Kata kerja kuat mengubah vokalnya — sama seperti bahasa Inggris (go → went). Bentuk-bentuk ini harus dihafal, tapi kabar baiknya: kamu akan bertemu mereka terus-menerus saat membaca.",
        examples: [
          { german: "gehen → ging", indonesian: "pergi", note: "Ich ging nach Hause." },
          { german: "kommen → kam", indonesian: "datang", note: "Sie kam zu spät." },
          { german: "sehen → sah", indonesian: "melihat", note: "Er sah einen Film." },
          { german: "geben → gab", indonesian: "memberi", note: "Es gab ein Problem. (Ada masalah.)" },
          { german: "finden → fand", indonesian: "menemukan", note: "Ich fand den Schlüssel." },
        ],
        culturalNote: {
          title: "Es war einmal...",
          content:
            "Semua dongeng Jerman dimulai dengan 'Es war einmal...' (pada suatu ketika...) — Präteritum dari 'es ist'. Membaca dongeng Grimm dalam bahasa aslinya adalah cara klasik melatih Präteritum.",
        },
      },
    ],
    summary: [
      "Percakapan → Perfekt; tulisan → Präteritum",
      "sein/haben/modal selalu Präteritum: war, hatte, konnte, musste",
      "Beraturan: akar + -te (lernte, wohnte)",
      "Tak beraturan: ganti vokal (ging, kam, sah, gab)",
      "ich dan er/sie/es selalu sama bentuknya di Präteritum",
    ],
  },
  "redewendungen": {
    topic: "idioms",
    introduction:
      "Idiom membuat bahasamu terdengar hidup dan alami. Orang Jerman memakai ungkapan-ungkapan ini setiap hari — dan banyak di antaranya lucu kalau diterjemahkan mentah-mentah. Di level B2, memahami idiom adalah kunci memahami percakapan asli, film, dan humor Jerman.",
    sections: [
      {
        title: "Idiom Sehari-hari",
        explanation:
          "Ungkapan-ungkapan ini sangat sering muncul dalam percakapan santai. Pelajari arti kiasannya, bukan terjemahan harfiahnya.",
        examples: [
          { german: "Ich verstehe nur Bahnhof.", indonesian: "Saya tidak mengerti sama sekali.", note: "harfiah: 'Saya cuma paham stasiun'" },
          { german: "Das ist mir Wurst.", indonesian: "Saya tidak peduli / terserah.", note: "harfiah: 'Itu sosis bagi saya'" },
          { german: "Ich drücke dir die Daumen.", indonesian: "Semoga berhasil!", note: "harfiah: 'Kutekan jempolku untukmu'" },
          { german: "Du hast Schwein gehabt!", indonesian: "Kamu beruntung sekali!", note: "harfiah: 'Kamu dapat babi'" },
          { german: "Es ist nicht mein Bier.", indonesian: "Itu bukan urusan saya.", note: "harfiah: 'Itu bukan bir saya'" },
        ],
        tip: "Alih-alih 'Viel Glück', orang Jerman lebih sering bilang 'Ich drücke dir die Daumen' — sambil benar-benar mengepalkan jempol!",
      },
      {
        title: "Idiom di Dunia Kerja",
        explanation:
          "Di kantor dan rapat, idiom-idiom ini muncul terus. Memahaminya membantumu mengikuti diskusi dengan penutur asli.",
        examples: [
          { german: "etwas auf die lange Bank schieben", indonesian: "menunda-nunda sesuatu", note: "harfiah: 'menggeser ke bangku panjang'" },
          { german: "den Nagel auf den Kopf treffen", indonesian: "tepat sasaran", note: "harfiah: 'memukul paku tepat di kepalanya'" },
          { german: "zwei Fliegen mit einer Klappe schlagen", indonesian: "sekali dayung dua pulau terlampaui", note: "harfiah: 'memukul dua lalat dengan satu tepukan'" },
          { german: "die Daumen drehen", indonesian: "duduk menganggur", note: "harfiah: 'memutar-mutar jempol'" },
        ],
      },
      {
        title: "Ungkapan dengan Bagian Tubuh",
        explanation:
          "Banyak idiom Jerman memakai bagian tubuh — persis seperti bahasa Indonesia ('ringan tangan', 'besar kepala').",
        examples: [
          { german: "Hals- und Beinbruch!", indonesian: "Semoga sukses!", note: "harfiah: 'patah leher dan kaki' — seperti 'break a leg'" },
          { german: "die Nase voll haben", indonesian: "sudah muak", note: "harfiah: 'hidungnya penuh'" },
          { german: "auf großem Fuß leben", indonesian: "hidup mewah", note: "harfiah: 'hidup dengan kaki besar'" },
          { german: "Ohren spitzen", indonesian: "pasang telinga baik-baik" },
        ],
        culturalNote: {
          title: "Kenapa 'paham stasiun'?",
          content:
            "'Ich verstehe nur Bahnhof' konon berasal dari Perang Dunia I: tentara yang lelah hanya ingin mendengar kata 'Bahnhof' — stasiun kereta yang membawa mereka pulang. Kata lain tak masuk ke telinga mereka.",
        },
      },
    ],
    summary: [
      "Idiom dipahami dari makna kiasan, bukan harfiah",
      "Ich verstehe nur Bahnhof = tidak mengerti sama sekali",
      "Ich drücke dir die Daumen = semoga berhasil",
      "Das ist mir Wurst = terserah / tidak peduli",
      "Banyak idiom memakai makanan dan bagian tubuh",
    ],
  },
};