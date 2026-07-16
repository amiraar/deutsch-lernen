/**
 * Static reference material for the "Materi" library.
 * All explanations are in Indonesian, targeting learners of German (A1–B2).
 */

export type GrammarTable = {
	title: string;
	description: string;
	headers: string[];
	rows: string[][];
	tip?: string;
};

export type GrammarTopic = {
	id: string;
	title: string;
	intro: string;
	tables: GrammarTable[];
};

export type PhraseEntry = {
	german: string;
	indonesian: string;
	note?: string;
};

export type PhraseCategory = {
	id: string;
	title: string;
	emoji: string;
	description: string;
	phrases: PhraseEntry[];
};

export type IrregularVerb = {
	infinitive: string;
	indonesian: string;
	praesens: string;
	praeteritum: string;
	perfekt: string;
};

export type VocabTheme = {
	id: string;
	title: string;
	emoji: string;
	description: string;
	entries: PhraseEntry[];
};

/* ------------------------------------------------------------------ */
/* Grammatik                                                           */
/* ------------------------------------------------------------------ */

export const GRAMMAR_TOPICS: GrammarTopic[] = [
	{
		id: "artikel",
		title: "Artikel & Kasus",
		intro:
			"Setiap kata benda bahasa Jerman punya gender (maskulin, feminin, netral) dan artikel yang berubah mengikuti kasus. Tabel ini adalah peta yang akan kamu pakai terus-menerus — tidak perlu dihafal sekaligus, cukup sering dilihat.",
		tables: [
			{
				title: "Artikel tentu (der, die, das)",
				description: "Setara dengan 'the' dalam bahasa Inggris.",
				headers: ["Kasus", "Maskulin", "Feminin", "Netral", "Jamak"],
				rows: [
					["Nominativ (subjek)", "der Mann", "die Frau", "das Kind", "die Kinder"],
					["Akkusativ (objek langsung)", "den Mann", "die Frau", "das Kind", "die Kinder"],
					["Dativ (objek tak langsung)", "dem Mann", "der Frau", "dem Kind", "den Kindern"],
					["Genitiv (kepemilikan)", "des Mannes", "der Frau", "des Kindes", "der Kinder"],
				],
				tip: "Hanya maskulin yang berubah di Akkusativ (der → den). Kalau ragu, cek dulu apakah katanya maskulin.",
			},
			{
				title: "Artikel tak tentu (ein, eine)",
				description: "Setara dengan 'a/an'. Tidak ada bentuk jamak — gunakan tanpa artikel.",
				headers: ["Kasus", "Maskulin", "Feminin", "Netral"],
				rows: [
					["Nominativ", "ein Mann", "eine Frau", "ein Kind"],
					["Akkusativ", "einen Mann", "eine Frau", "ein Kind"],
					["Dativ", "einem Mann", "einer Frau", "einem Kind"],
					["Genitiv", "eines Mannes", "einer Frau", "eines Kindes"],
				],
				tip: "Bentuk negatifnya (kein) dan kata ganti milik (mein, dein, sein...) mengikuti pola yang sama persis.",
			},
			{
				title: "Petunjuk gender yang bisa diandalkan",
				description: "Gender kadang bisa ditebak dari akhiran kata.",
				headers: ["Akhiran", "Gender", "Contoh"],
				rows: [
					["-ung, -heit, -keit, -schaft, -ion", "die (feminin)", "die Zeitung, die Freiheit, die Nation"],
					["-chen, -lein, -um, -ment", "das (netral)", "das Mädchen, das Zentrum, das Dokument"],
					["-er (pelaku), -ling, -ismus", "der (maskulin)", "der Lehrer, der Frühling, der Tourismus"],
					["-e (mayoritas, tak selalu)", "die (feminin)", "die Lampe, die Straße, die Blume"],
				],
			},
		],
	},
	{
		id: "pronomen",
		title: "Kata Ganti Orang",
		intro:
			"Kata ganti juga berubah mengikuti kasus. Tabel ini penting untuk kalimat seperti 'Ich liebe dich' (Akkusativ) atau 'Ich helfe dir' (Dativ).",
		tables: [
			{
				title: "Kata ganti persona per kasus",
				description: "Nominativ = subjek, Akkusativ = objek langsung, Dativ = objek tak langsung.",
				headers: ["Nominativ", "Akkusativ", "Dativ", "Arti"],
				rows: [
					["ich", "mich", "mir", "saya"],
					["du", "dich", "dir", "kamu"],
					["er", "ihn", "ihm", "dia (laki-laki)"],
					["sie", "sie", "ihr", "dia (perempuan)"],
					["es", "es", "ihm", "dia (netral)"],
					["wir", "uns", "uns", "kami/kita"],
					["ihr", "euch", "euch", "kalian"],
					["sie/Sie", "sie/Sie", "ihnen/Ihnen", "mereka / Anda"],
				],
				tip: "'Sie' dengan S kapital selalu berarti 'Anda' (formal), baik tunggal maupun jamak.",
			},
			{
				title: "Kata ganti milik (Possessiv)",
				description: "Bentuk dasar — akhirannya berubah seperti 'ein'.",
				headers: ["Pemilik", "Kata ganti", "Contoh"],
				rows: [
					["ich", "mein", "mein Buch (buku saya)"],
					["du", "dein", "dein Auto (mobilmu)"],
					["er/es", "sein", "sein Hund (anjingnya)"],
					["sie", "ihr", "ihr Haus (rumahnya)"],
					["wir", "unser", "unser Lehrer (guru kami)"],
					["ihr", "euer", "euer Garten (kebun kalian)"],
					["sie/Sie", "ihr/Ihr", "Ihr Name (nama Anda)"],
				],
			},
		],
	},
	{
		id: "konjugation",
		title: "Konjugasi Kata Kerja",
		intro:
			"Kata kerja Jerman berubah bentuk sesuai subjek. Kuasai pola regular dan tiga kata kerja terpenting (sein, haben, werden) — hampir semua kalimat memakai salah satunya.",
		tables: [
			{
				title: "Pola regular: lernen (belajar)",
				description: "Hilangkan -en, lalu tambahkan akhiran sesuai subjek.",
				headers: ["Subjek", "Bentuk", "Akhiran"],
				rows: [
					["ich", "lerne", "-e"],
					["du", "lernst", "-st"],
					["er/sie/es", "lernt", "-t"],
					["wir", "lernen", "-en"],
					["ihr", "lernt", "-t"],
					["sie/Sie", "lernen", "-en"],
				],
				tip: "wir dan sie/Sie selalu sama dengan infinitif. Itu dua bentuk 'gratis' yang tidak perlu dihafal.",
			},
			{
				title: "Tiga kata kerja terpenting",
				description: "sein (menjadi/adalah), haben (punya), werden (akan/menjadi) — semuanya tak beraturan.",
				headers: ["Subjek", "sein", "haben", "werden"],
				rows: [
					["ich", "bin", "habe", "werde"],
					["du", "bist", "hast", "wirst"],
					["er/sie/es", "ist", "hat", "wird"],
					["wir", "sind", "haben", "werden"],
					["ihr", "seid", "habt", "werdet"],
					["sie/Sie", "sind", "haben", "werden"],
				],
				tip: "haben + Partizip II = Perfekt (lampau). werden + infinitif = Futur (akan datang). werden + Partizip II = Passiv.",
			},
			{
				title: "Kata kerja modal",
				description: "Modal + infinitif di akhir kalimat: 'Ich kann Deutsch sprechen.'",
				headers: ["Modal", "Arti", "ich/er", "du"],
				rows: [
					["können", "bisa", "kann", "kannst"],
					["müssen", "harus", "muss", "musst"],
					["wollen", "mau", "will", "willst"],
					["dürfen", "boleh", "darf", "darfst"],
					["sollen", "sebaiknya", "soll", "sollst"],
					["mögen", "suka", "mag", "magst"],
				],
				tip: "Bentuk ich dan er/sie/es selalu sama untuk kata kerja modal — tanpa akhiran -t.",
			},
		],
	},
	{
		id: "praepositionen",
		title: "Preposisi & Kasus",
		intro:
			"Setiap preposisi 'menuntut' kasus tertentu. Salah kasus adalah kesalahan paling umum pelajar — tabel ini membantumu mengeceknya dengan cepat.",
		tables: [
			{
				title: "Selalu Akkusativ",
				description: "Jembatan keledai: durch-für-gegen-ohne-um.",
				headers: ["Preposisi", "Arti", "Contoh"],
				rows: [
					["durch", "melalui", "durch den Park"],
					["für", "untuk", "für dich"],
					["gegen", "melawan/sekitar", "gegen die Wand"],
					["ohne", "tanpa", "ohne mich"],
					["um", "mengelilingi/pada pukul", "um acht Uhr"],
				],
			},
			{
				title: "Selalu Dativ",
				description: "Jembatan keledai: aus-bei-mit-nach-seit-von-zu.",
				headers: ["Preposisi", "Arti", "Contoh"],
				rows: [
					["aus", "dari (dalam)", "aus dem Haus"],
					["bei", "di/pada", "bei meiner Oma"],
					["mit", "dengan", "mit dem Bus"],
					["nach", "ke/setelah", "nach Berlin"],
					["seit", "sejak", "seit einem Jahr"],
					["von", "dari", "von meinem Vater"],
					["zu", "ke (orang/tempat)", "zum Arzt"],
				],
			},
			{
				title: "Wechselpräpositionen (bisa dua-duanya)",
				description:
					"in, an, auf, über, unter, vor, hinter, neben, zwischen. Gerakan/arah → Akkusativ. Posisi diam → Dativ.",
				headers: ["Pertanyaan", "Kasus", "Contoh"],
				rows: [
					["Wohin? (ke mana — ada gerakan)", "Akkusativ", "Ich gehe in die Schule."],
					["Wo? (di mana — posisi diam)", "Dativ", "Ich bin in der Schule."],
				],
				tip: "Tanya dirimu: 'wohin?' (Akkusativ) atau 'wo?' (Dativ). Trik ini menyelesaikan 90% keraguan.",
			},
		],
	},
	{
		id: "satzbau",
		title: "Struktur Kalimat",
		intro:
			"Aturan emas bahasa Jerman: kata kerja selalu di posisi kedua pada kalimat utama, dan di akhir pada anak kalimat.",
		tables: [
			{
				title: "Posisi kata kerja",
				description: "Tiga pola dasar yang mencakup hampir semua kalimat.",
				headers: ["Jenis kalimat", "Pola", "Contoh"],
				rows: [
					["Pernyataan", "Verba di posisi 2", "Ich lerne heute Deutsch."],
					["Pertanyaan ya/tidak", "Verba di posisi 1", "Lernst du Deutsch?"],
					["Pertanyaan dengan kata tanya", "W-Wort + verba", "Was lernst du?"],
					["Anak kalimat (weil, dass, wenn...)", "Verba di akhir", "..., weil ich Deutsch lerne."],
				],
				tip: "Kalau kalimat dimulai dengan keterangan waktu ('Heute...'), subjek pindah ke belakang verba: 'Heute lerne ich Deutsch.'",
			},
			{
				title: "Urutan keterangan: TeKaMoLo",
				description: "Temporal (kapan) → Kausal (kenapa) → Modal (bagaimana) → Lokal (di mana).",
				headers: ["Urutan", "Jenis", "Contoh"],
				rows: [
					["1. Te", "kapan", "heute, um 8 Uhr, im Sommer"],
					["2. Ka", "kenapa", "wegen des Regens"],
					["3. Mo", "bagaimana", "mit dem Bus, gern, schnell"],
					["4. Lo", "di mana/ke mana", "nach Hause, in Berlin"],
				],
				tip: "Contoh lengkap: 'Ich fahre heute wegen des Termins mit dem Zug nach München.'",
			},
		],
	},
];

/* ------------------------------------------------------------------ */
/* Buku Frasa                                                          */
/* ------------------------------------------------------------------ */

export const PHRASE_CATEGORIES: PhraseCategory[] = [
	{
		id: "perkenalan",
		title: "Perkenalan & Basa-basi",
		emoji: "👋",
		description: "Frasa pertama yang kamu butuhkan saat bertemu orang.",
		phrases: [
			{ german: "Wie heißen Sie?", indonesian: "Siapa nama Anda?", note: "formal" },
			{ german: "Wie heißt du?", indonesian: "Siapa namamu?", note: "santai" },
			{ german: "Ich heiße Putri.", indonesian: "Nama saya Putri." },
			{ german: "Woher kommen Sie?", indonesian: "Anda berasal dari mana?", note: "formal" },
			{ german: "Ich komme aus Indonesien.", indonesian: "Saya dari Indonesia." },
			{ german: "Freut mich!", indonesian: "Senang berkenalan!" },
			{ german: "Wie geht es Ihnen?", indonesian: "Apa kabar Anda?", note: "formal" },
			{ german: "Mir geht es gut, danke.", indonesian: "Kabar saya baik, terima kasih." },
			{ german: "Ich lerne erst seit Kurzem Deutsch.", indonesian: "Saya baru mulai belajar bahasa Jerman." },
			{ german: "Können Sie das bitte wiederholen?", indonesian: "Bisa tolong diulang?", note: "sangat berguna!" },
			{ german: "Sprechen Sie Englisch?", indonesian: "Apakah Anda bisa bahasa Inggris?" },
		],
	},
	{
		id: "restoran",
		title: "Di Restoran & Kafe",
		emoji: "🍽️",
		description: "Memesan makanan, minta bon, dan memberi tip.",
		phrases: [
			{ german: "Einen Tisch für zwei, bitte.", indonesian: "Meja untuk dua orang, ya." },
			{ german: "Die Speisekarte, bitte.", indonesian: "Minta menunya, ya." },
			{ german: "Ich hätte gern ein Wasser.", indonesian: "Saya mau air putih.", note: "hätte gern = sopan" },
			{ german: "Was können Sie empfehlen?", indonesian: "Apa rekomendasi Anda?" },
			{ german: "Ich bin Vegetarier / Vegetarierin.", indonesian: "Saya vegetarian.", note: "pria / wanita" },
			{ german: "Ist da Schweinefleisch drin?", indonesian: "Apakah ini mengandung daging babi?" },
			{ german: "Das schmeckt sehr gut!", indonesian: "Ini enak sekali!" },
			{ german: "Die Rechnung, bitte.", indonesian: "Minta bonnya, ya." },
			{ german: "Zusammen oder getrennt?", indonesian: "Bayar jadi satu atau pisah?", note: "pertanyaan pelayan" },
			{ german: "Stimmt so.", indonesian: "Kembaliannya ambil saja.", note: "cara memberi tip" },
		],
	},
	{
		id: "belanja",
		title: "Belanja",
		emoji: "🛍️",
		description: "Di supermarket, toko baju, atau pasar mingguan.",
		phrases: [
			{ german: "Was kostet das?", indonesian: "Ini harganya berapa?" },
			{ german: "Das ist mir zu teuer.", indonesian: "Itu terlalu mahal buat saya." },
			{ german: "Haben Sie das in Größe M?", indonesian: "Ada ukuran M?" },
			{ german: "Kann ich das anprobieren?", indonesian: "Boleh saya coba?" },
			{ german: "Ich schaue nur, danke.", indonesian: "Saya cuma lihat-lihat, terima kasih." },
			{ german: "Ich nehme das.", indonesian: "Saya ambil yang ini." },
			{ german: "Kann ich mit Karte zahlen?", indonesian: "Bisa bayar pakai kartu?", note: "banyak toko kecil hanya tunai!" },
			{ german: "Eine Tüte, bitte.", indonesian: "Minta kantongnya, ya.", note: "kantong plastik berbayar" },
			{ german: "Wo finde ich Milch?", indonesian: "Susu ada di mana, ya?" },
		],
	},
	{
		id: "transportasi",
		title: "Perjalanan & Transportasi",
		emoji: "🚆",
		description: "Naik kereta, bus, dan bertanya arah.",
		phrases: [
			{ german: "Wo ist der Bahnhof?", indonesian: "Stasiun kereta di mana?" },
			{ german: "Eine Fahrkarte nach München, bitte.", indonesian: "Satu tiket ke München, ya." },
			{ german: "Einfach oder hin und zurück?", indonesian: "Sekali jalan atau pulang-pergi?", note: "pertanyaan loket" },
			{ german: "Von welchem Gleis fährt der Zug ab?", indonesian: "Kereta berangkat dari peron berapa?" },
			{ german: "Der Zug hat Verspätung.", indonesian: "Keretanya terlambat.", note: "kamu akan sering dengar ini 😄" },
			{ german: "Muss ich umsteigen?", indonesian: "Apakah saya harus ganti kereta?" },
			{ german: "Wie komme ich zum Flughafen?", indonesian: "Bagaimana cara ke bandara?" },
			{ german: "Halten Sie hier, bitte.", indonesian: "Berhenti di sini, ya." },
			{ german: "Gehen Sie geradeaus, dann links.", indonesian: "Jalan lurus, lalu belok kiri." },
			{ german: "Ist es weit von hier?", indonesian: "Apakah jauh dari sini?" },
		],
	},
	{
		id: "darurat",
		title: "Darurat & Kesehatan",
		emoji: "🏥",
		description: "Semoga tidak pernah perlu — tapi wajib tahu.",
		phrases: [
			{ german: "Hilfe!", indonesian: "Tolong!" },
			{ german: "Rufen Sie einen Krankenwagen!", indonesian: "Panggil ambulans!", note: "nomor darurat: 112" },
			{ german: "Ich brauche einen Arzt.", indonesian: "Saya butuh dokter." },
			{ german: "Ich fühle mich nicht gut.", indonesian: "Saya merasa tidak enak badan." },
			{ german: "Ich habe Kopfschmerzen.", indonesian: "Kepala saya sakit." },
			{ german: "Ich habe Fieber.", indonesian: "Saya demam." },
			{ german: "Wo ist die nächste Apotheke?", indonesian: "Apotek terdekat di mana?" },
			{ german: "Ich bin allergisch gegen Nüsse.", indonesian: "Saya alergi kacang." },
			{ german: "Mein Handy wurde gestohlen.", indonesian: "HP saya dicuri.", note: "polisi: 110" },
			{ german: "Ich habe mich verlaufen.", indonesian: "Saya tersesat." },
		],
	},
	{
		id: "formal",
		title: "Kantor & Situasi Formal",
		emoji: "💼",
		description: "Email, janji temu, dan percakapan profesional.",
		phrases: [
			{ german: "Sehr geehrte Damen und Herren,", indonesian: "Yang terhormat Bapak/Ibu,", note: "pembuka surat formal" },
			{ german: "Mit freundlichen Grüßen", indonesian: "Hormat saya,", note: "penutup surat formal" },
			{ german: "Ich möchte einen Termin vereinbaren.", indonesian: "Saya ingin membuat janji temu." },
			{ german: "Ich rufe wegen der Wohnung an.", indonesian: "Saya menelepon soal apartemen itu." },
			{ german: "Könnten Sie mir bitte helfen?", indonesian: "Bisakah Anda membantu saya?", note: "Konjunktiv = ekstra sopan" },
			{ german: "Ich bin mit allem einverstanden.", indonesian: "Saya setuju dengan semuanya." },
			{ german: "Darf ich Sie kurz unterbrechen?", indonesian: "Boleh saya menyela sebentar?" },
			{ german: "Vielen Dank für Ihre Zeit.", indonesian: "Terima kasih banyak atas waktu Anda." },
			{ german: "Ich melde mich nächste Woche.", indonesian: "Saya akan menghubungi lagi minggu depan." },
		],
	},
];

/* ------------------------------------------------------------------ */
/* Kata kerja tak beraturan                                            */
/* ------------------------------------------------------------------ */

export const IRREGULAR_VERBS: IrregularVerb[] = [
	{ infinitive: "sein", indonesian: "menjadi / adalah", praesens: "ist", praeteritum: "war", perfekt: "ist gewesen" },
	{ infinitive: "haben", indonesian: "punya", praesens: "hat", praeteritum: "hatte", perfekt: "hat gehabt" },
	{ infinitive: "werden", indonesian: "menjadi / akan", praesens: "wird", praeteritum: "wurde", perfekt: "ist geworden" },
	{ infinitive: "gehen", indonesian: "pergi (jalan kaki)", praesens: "geht", praeteritum: "ging", perfekt: "ist gegangen" },
	{ infinitive: "fahren", indonesian: "pergi (berkendara)", praesens: "fährt", praeteritum: "fuhr", perfekt: "ist gefahren" },
	{ infinitive: "kommen", indonesian: "datang", praesens: "kommt", praeteritum: "kam", perfekt: "ist gekommen" },
	{ infinitive: "sehen", indonesian: "melihat", praesens: "sieht", praeteritum: "sah", perfekt: "hat gesehen" },
	{ infinitive: "essen", indonesian: "makan", praesens: "isst", praeteritum: "aß", perfekt: "hat gegessen" },
	{ infinitive: "trinken", indonesian: "minum", praesens: "trinkt", praeteritum: "trank", perfekt: "hat getrunken" },
	{ infinitive: "sprechen", indonesian: "berbicara", praesens: "spricht", praeteritum: "sprach", perfekt: "hat gesprochen" },
	{ infinitive: "lesen", indonesian: "membaca", praesens: "liest", praeteritum: "las", perfekt: "hat gelesen" },
	{ infinitive: "schreiben", indonesian: "menulis", praesens: "schreibt", praeteritum: "schrieb", perfekt: "hat geschrieben" },
	{ infinitive: "schlafen", indonesian: "tidur", praesens: "schläft", praeteritum: "schlief", perfekt: "hat geschlafen" },
	{ infinitive: "nehmen", indonesian: "mengambil", praesens: "nimmt", praeteritum: "nahm", perfekt: "hat genommen" },
	{ infinitive: "geben", indonesian: "memberi", praesens: "gibt", praeteritum: "gab", perfekt: "hat gegeben" },
	{ infinitive: "finden", indonesian: "menemukan", praesens: "findet", praeteritum: "fand", perfekt: "hat gefunden" },
	{ infinitive: "denken", indonesian: "berpikir", praesens: "denkt", praeteritum: "dachte", perfekt: "hat gedacht" },
	{ infinitive: "wissen", indonesian: "tahu", praesens: "weiß", praeteritum: "wusste", perfekt: "hat gewusst" },
	{ infinitive: "kennen", indonesian: "kenal", praesens: "kennt", praeteritum: "kannte", perfekt: "hat gekannt" },
	{ infinitive: "bringen", indonesian: "membawa", praesens: "bringt", praeteritum: "brachte", perfekt: "hat gebracht" },
	{ infinitive: "helfen", indonesian: "membantu", praesens: "hilft", praeteritum: "half", perfekt: "hat geholfen" },
	{ infinitive: "laufen", indonesian: "berlari / berjalan", praesens: "läuft", praeteritum: "lief", perfekt: "ist gelaufen" },
	{ infinitive: "fliegen", indonesian: "terbang", praesens: "fliegt", praeteritum: "flog", perfekt: "ist geflogen" },
	{ infinitive: "bleiben", indonesian: "tinggal / tetap", praesens: "bleibt", praeteritum: "blieb", perfekt: "ist geblieben" },
	{ infinitive: "beginnen", indonesian: "mulai", praesens: "beginnt", praeteritum: "begann", perfekt: "hat begonnen" },
	{ infinitive: "verlieren", indonesian: "kehilangan", praesens: "verliert", praeteritum: "verlor", perfekt: "hat verloren" },
	{ infinitive: "vergessen", indonesian: "lupa", praesens: "vergisst", praeteritum: "vergaß", perfekt: "hat vergessen" },
	{ infinitive: "verstehen", indonesian: "mengerti", praesens: "versteht", praeteritum: "verstand", perfekt: "hat verstanden" },
	{ infinitive: "treffen", indonesian: "bertemu", praesens: "trifft", praeteritum: "traf", perfekt: "hat getroffen" },
	{ infinitive: "tragen", indonesian: "membawa / memakai", praesens: "trägt", praeteritum: "trug", perfekt: "hat getragen" },
	{ infinitive: "waschen", indonesian: "mencuci", praesens: "wäscht", praeteritum: "wusch", perfekt: "hat gewaschen" },
	{ infinitive: "ziehen", indonesian: "menarik / pindah", praesens: "zieht", praeteritum: "zog", perfekt: "hat/ist gezogen" },
];

/* ------------------------------------------------------------------ */
/* Angka & Waktu                                                       */
/* ------------------------------------------------------------------ */

export const NUMBER_TABLES: GrammarTable[] = [
	{
		title: "Angka 0–20",
		description: "Fondasi semua angka lain.",
		headers: ["Angka", "Jerman", "Angka", "Jerman"],
		rows: [
			["0", "null", "11", "elf"],
			["1", "eins", "12", "zwölf"],
			["2", "zwei", "13", "dreizehn"],
			["3", "drei", "14", "vierzehn"],
			["4", "vier", "15", "fünfzehn"],
			["5", "fünf", "16", "sechzehn"],
			["6", "sechs", "17", "siebzehn"],
			["7", "sieben", "18", "achtzehn"],
			["8", "acht", "19", "neunzehn"],
			["9", "neun", "20", "zwanzig"],
			["10", "zehn", "", ""],
		],
		tip: "Perhatikan: sechzehn (bukan sechszehn) dan siebzehn (bukan siebenzehn).",
	},
	{
		title: "Puluhan & pola angka besar",
		description: "Angka Jerman dibaca 'terbalik': 21 = einundzwanzig (satu-dan-dua-puluh).",
		headers: ["Angka", "Jerman", "Catatan"],
		rows: [
			["21", "einundzwanzig", "satuan disebut dulu!"],
			["32", "zweiunddreißig", "dreißig pakai ß, bukan z"],
			["47", "siebenundvierzig", ""],
			["100", "(ein)hundert", ""],
			["215", "zweihundertfünfzehn", "ditulis serangkai"],
			["1.000", "(ein)tausend", ""],
			["2026", "zweitausendsechsundzwanzig", "tahun dibaca sebagai angka biasa"],
			["1.000.000", "eine Million", "kata benda, ditulis pisah"],
		],
	},
	{
		title: "Hari & bulan",
		description: "Semua nama hari dan bulan bergender maskulin (der).",
		headers: ["Hari", "Jerman", "Bulan", "Jerman"],
		rows: [
			["Senin", "Montag", "Januari", "Januar"],
			["Selasa", "Dienstag", "Februari", "Februar"],
			["Rabu", "Mittwoch", "Maret", "März"],
			["Kamis", "Donnerstag", "April–Agustus", "April, Mai, Juni, Juli, August"],
			["Jumat", "Freitag", "September–Desember", "September, Oktober, November, Dezember"],
			["Sabtu", "Samstag", "Musim", "Frühling, Sommer, Herbst, Winter"],
			["Minggu", "Sonntag", "", ""],
		],
		tip: "'Pada hari Senin' = am Montag. 'Pada bulan Juli' = im Juli.",
	},
	{
		title: "Membaca jam",
		description: "Hati-hati: 'halb' menunjuk ke jam BERIKUTNYA, kebalikan dari intuisi bahasa Indonesia.",
		headers: ["Jam", "Sehari-hari", "Formal"],
		rows: [
			["09.00", "neun Uhr", "neun Uhr"],
			["09.05", "fünf nach neun", "neun Uhr fünf"],
			["09.15", "Viertel nach neun", "neun Uhr fünfzehn"],
			["09.30", "halb zehn (!)", "neun Uhr dreißig"],
			["09.45", "Viertel vor zehn", "neun Uhr fünfundvierzig"],
			["09.55", "fünf vor zehn", "neun Uhr fünfundfünfzig"],
			["21.00", "neun Uhr abends", "einundzwanzig Uhr"],
		],
		tip: "halb zehn = 09.30, BUKAN 10.30. Bayangkan 'setengah perjalanan menuju jam sepuluh'.",
	},
];

/* ------------------------------------------------------------------ */
/* Kosakata tematik                                                    */
/* ------------------------------------------------------------------ */

export const VOCAB_THEMES: VocabTheme[] = [
	{
		id: "familie",
		title: "Keluarga",
		emoji: "👨‍👩‍👧‍👦",
		description: "Anggota keluarga inti dan besar.",
		entries: [
			{ german: "die Familie", indonesian: "keluarga" },
			{ german: "die Eltern", indonesian: "orang tua", note: "selalu jamak" },
			{ german: "der Vater / die Mutter", indonesian: "ayah / ibu" },
			{ german: "der Bruder / die Schwester", indonesian: "saudara laki-laki / perempuan" },
			{ german: "die Geschwister", indonesian: "saudara kandung", note: "selalu jamak" },
			{ german: "der Sohn / die Tochter", indonesian: "anak laki-laki / perempuan" },
			{ german: "der Großvater / die Großmutter", indonesian: "kakek / nenek", note: "santai: Opa / Oma" },
			{ german: "der Onkel / die Tante", indonesian: "paman / bibi" },
			{ german: "der Ehemann / die Ehefrau", indonesian: "suami / istri" },
		],
	},
	{
		id: "farben",
		title: "Warna",
		emoji: "🎨",
		description: "Warna dasar — juga dipakai sebagai kata sifat.",
		entries: [
			{ german: "rot", indonesian: "merah" },
			{ german: "blau", indonesian: "biru" },
			{ german: "gelb", indonesian: "kuning" },
			{ german: "grün", indonesian: "hijau" },
			{ german: "schwarz", indonesian: "hitam" },
			{ german: "weiß", indonesian: "putih" },
			{ german: "grau", indonesian: "abu-abu" },
			{ german: "braun", indonesian: "cokelat" },
			{ german: "orange", indonesian: "oranye" },
			{ german: "lila", indonesian: "ungu" },
			{ german: "rosa", indonesian: "merah muda", note: "tidak berubah bentuk" },
			{ german: "hell- / dunkel-", indonesian: "muda / tua", note: "hellblau = biru muda" },
		],
	},
	{
		id: "koerper",
		title: "Tubuh & Kesehatan",
		emoji: "🩺",
		description: "Bagian tubuh — berguna saat ke dokter.",
		entries: [
			{ german: "der Kopf", indonesian: "kepala" },
			{ german: "das Auge (die Augen)", indonesian: "mata" },
			{ german: "das Ohr (die Ohren)", indonesian: "telinga" },
			{ german: "die Nase", indonesian: "hidung" },
			{ german: "der Mund", indonesian: "mulut" },
			{ german: "der Hals", indonesian: "leher / tenggorokan" },
			{ german: "der Bauch", indonesian: "perut" },
			{ german: "der Rücken", indonesian: "punggung" },
			{ german: "der Arm / das Bein", indonesian: "lengan / kaki (tungkai)" },
			{ german: "die Hand / der Fuß", indonesian: "tangan / kaki (telapak)" },
			{ german: "Ich habe ...schmerzen", indonesian: "Saya sakit ...", note: "Kopfschmerzen, Bauchschmerzen" },
		],
	},
	{
		id: "wetter",
		title: "Cuaca & Musim",
		emoji: "🌦️",
		description: "Topik basa-basi nomor satu di Jerman.",
		entries: [
			{ german: "Das Wetter ist schön.", indonesian: "Cuacanya bagus." },
			{ german: "Es regnet.", indonesian: "Sedang hujan." },
			{ german: "Es schneit.", indonesian: "Sedang turun salju." },
			{ german: "Die Sonne scheint.", indonesian: "Matahari bersinar." },
			{ german: "Es ist bewölkt.", indonesian: "Berawan." },
			{ german: "Es ist windig.", indonesian: "Berangin." },
			{ german: "Es ist heiß / warm / kühl / kalt.", indonesian: "Panas / hangat / sejuk / dingin." },
			{ german: "der Frühling / der Sommer", indonesian: "musim semi / musim panas" },
			{ german: "der Herbst / der Winter", indonesian: "musim gugur / musim dingin" },
			{ german: "Wie ist das Wetter heute?", indonesian: "Bagaimana cuaca hari ini?" },
		],
	},
];
