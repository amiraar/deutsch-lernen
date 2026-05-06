import "dotenv/config";

import bcrypt from "bcryptjs";

import { PrismaClient, LevelEnum, ExerciseType } from "../src/generated/prisma";

const prisma = new PrismaClient();

const lessons = [
  {
    title: "Salam Dasar",
    slug: "salam-dasar",
    description: "Kenalan dengan salam dan sapaan dasar bahasa Jerman.",
    level: LevelEnum.A1,
    order: 1,
    estimatedMinutes: 15,
    content: { topic: "greetings" },
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Apa arti dari 'Guten Morgen'?",
        correctAnswer: "Selamat pagi",
        options: ["Selamat pagi", "Selamat malam", "Selamat tinggal", "Terima kasih"],
        explanation: "Guten Morgen berarti selamat pagi.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Lengkapi: ___ Tag!",
        correctAnswer: "Guten",
        options: [],
        explanation: "Sapaan formal: Guten Tag!",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Saya baik-baik saja.",
        correctAnswer: "Mir geht es gut.",
        options: [],
        explanation: "Frasa umum untuk mengatakan keadaan baik.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'Danke' berarti...",
        correctAnswer: "Terima kasih",
        options: ["Tolong", "Terima kasih", "Maaf", "Sampai jumpa"],
        explanation: "Danke artinya terima kasih.",
      },
      {
        type: ExerciseType.PRONUNCIATION,
        prompt: "Ucapkan: Guten Tag",
        correctAnswer: "Guten Tag",
        options: [],
        explanation: "Latihan pengucapan salam formal.",
      },
    ],
  },
  {
    title: "Angka 1-20",
    slug: "angka-1-20",
    description: "Belajar angka dasar dalam bahasa Jerman.",
    level: LevelEnum.A1,
    order: 2,
    estimatedMinutes: 20,
    content: { topic: "numbers" },
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Berapa arti 'drei'?",
        correctAnswer: "Tiga",
        options: ["Satu", "Dua", "Tiga", "Empat"],
        explanation: "drei = tiga.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Zwei + drei = ___",
        correctAnswer: "fünf",
        options: [],
        explanation: "fünf berarti lima.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Saya punya dua buku.",
        correctAnswer: "Ich habe zwei Bücher.",
        options: [],
        explanation: "Kalimat dengan angka dua.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'zehn' berarti...",
        correctAnswer: "Sepuluh",
        options: ["Delapan", "Sembilan", "Sepuluh", "Sebelas"],
        explanation: "zehn = sepuluh.",
      },
      {
        type: ExerciseType.PRONUNCIATION,
        prompt: "Ucapkan: eins, zwei, drei",
        correctAnswer: "eins zwei drei",
        options: [],
        explanation: "Latihan pengucapan angka dasar.",
      },
    ],
  },
  {
    title: "Kata Ganti Orang",
    slug: "kata-ganti-orang",
    description: "Ich, du, er, sie, wir, ihr.",
    level: LevelEnum.A1,
    order: 3,
    estimatedMinutes: 15,
    content: { topic: "pronouns" },
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'ich' berarti...",
        correctAnswer: "Saya",
        options: ["Saya", "Kamu", "Dia", "Kami"],
        explanation: "ich = saya.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "___ bist müde.",
        correctAnswer: "Du",
        options: [],
        explanation: "Du bist müde = Kamu lelah.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Kami belajar bahasa Jerman.",
        correctAnswer: "Wir lernen Deutsch.",
        options: [],
        explanation: "Wir = kami.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'sie (mereka)' berarti...",
        correctAnswer: "Sie",
        options: ["Sie", "Er", "Ihr", "Wir"],
        explanation: "Sie (mereka) ditulis dengan S besar.",
      },
      {
        type: ExerciseType.PRONUNCIATION,
        prompt: "Ucapkan: wir und ihr",
        correctAnswer: "wir und ihr",
        options: [],
        explanation: "Latihan pengucapan kata ganti.",
      },
    ],
  },
  {
    title: "Gender Kata Benda",
    slug: "gender-kata-benda",
    description: "Der, die, das dan artikel umum.",
    level: LevelEnum.A1,
    order: 4,
    estimatedMinutes: 20,
    content: { topic: "gender" },
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Artikel untuk 'Mann' adalah...",
        correctAnswer: "der",
        options: ["der", "die", "das", "den"],
        explanation: "Mann adalah maskulin: der Mann.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "___ Frau",
        correctAnswer: "die",
        options: [],
        explanation: "Frau adalah feminin: die Frau.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Anak itu belajar.",
        correctAnswer: "Das Kind lernt.",
        options: [],
        explanation: "Kind adalah netral: das Kind.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Artikel untuk 'Haus' adalah...",
        correctAnswer: "das",
        options: ["der", "die", "das", "des"],
        explanation: "Haus adalah netral: das Haus.",
      },
      {
        type: ExerciseType.PRONUNCIATION,
        prompt: "Ucapkan: der, die, das",
        correctAnswer: "der die das",
        options: [],
        explanation: "Latihan pengucapan artikel.",
      },
    ],
  },
  {
    title: "Kata Kerja Dasar",
    slug: "kata-kerja-dasar",
    description: "Belajar kata kerja umum seperti sein dan haben.",
    level: LevelEnum.A1,
    order: 5,
    estimatedMinutes: 20,
    content: { topic: "verbs" },
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'sein' berarti...",
        correctAnswer: "menjadi/berada",
        options: ["pergi", "makan", "menjadi/berada", "membaca"],
        explanation: "sein = menjadi/berada.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Ich ___ Student.",
        correctAnswer: "bin",
        options: [],
        explanation: "Ich bin Student.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Saya punya waktu.",
        correctAnswer: "Ich habe Zeit.",
        options: [],
        explanation: "haben = punya.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'lesen' berarti...",
        correctAnswer: "membaca",
        options: ["menulis", "membaca", "bermain", "belajar"],
        explanation: "lesen = membaca.",
      },
      {
        type: ExerciseType.PRONUNCIATION,
        prompt: "Ucapkan: Ich bin hier",
        correctAnswer: "Ich bin hier",
        options: [],
        explanation: "Latihan pengucapan kalimat sederhana.",
      },
    ],
  },
  {
    title: "Waktu dan Hari",
    slug: "waktu-dan-hari",
    description: "Mengenal hari dan waktu dalam bahasa Jerman.",
    level: LevelEnum.A2,
    order: 6,
    estimatedMinutes: 20,
    content: { topic: "time" },
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'Montag' berarti...",
        correctAnswer: "Senin",
        options: ["Senin", "Selasa", "Rabu", "Jumat"],
        explanation: "Montag = Senin.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Es ist ___ Uhr.",
        correctAnswer: "zwei",
        options: [],
        explanation: "zwei = dua.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Hari ini hari Jumat.",
        correctAnswer: "Heute ist Freitag.",
        options: [],
        explanation: "Heute ist Freitag.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'Uhr' berarti...",
        correctAnswer: "jam",
        options: ["jam", "hari", "bulan", "tahun"],
        explanation: "Uhr = jam.",
      },
      {
        type: ExerciseType.PRONUNCIATION,
        prompt: "Ucapkan: Es ist acht Uhr",
        correctAnswer: "Es ist acht Uhr",
        options: [],
        explanation: "Latihan pengucapan waktu.",
      },
    ],
  },
  {
    title: "Arah dan Tempat",
    slug: "arah-dan-tempat",
    description: "Menanyakan arah dan lokasi.",
    level: LevelEnum.A2,
    order: 7,
    estimatedMinutes: 20,
    content: { topic: "direction" },
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'rechts' berarti...",
        correctAnswer: "kanan",
        options: ["kanan", "kiri", "depan", "belakang"],
        explanation: "rechts = kanan.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Die Bank ist ___ Ecke.",
        correctAnswer: "an der",
        options: [],
        explanation: "an der Ecke = di sudut.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Apotek ada di sebelah kiri.",
        correctAnswer: "Die Apotheke ist links.",
        options: [],
        explanation: "links = kiri.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'geradeaus' berarti...",
        correctAnswer: "lurus",
        options: ["belok", "lurus", "berhenti", "cepat"],
        explanation: "geradeaus = lurus.",
      },
      {
        type: ExerciseType.PRONUNCIATION,
        prompt: "Ucapkan: Gehen Sie geradeaus",
        correctAnswer: "Gehen Sie geradeaus",
        options: [],
        explanation: "Latihan pengucapan instruksi arah.",
      },
    ],
  },
  {
    title: "Makanan Favorit",
    slug: "makanan-favorit",
    description: "Kosakata makanan dan minuman.",
    level: LevelEnum.A2,
    order: 8,
    estimatedMinutes: 20,
    content: { topic: "food" },
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'Apfel' berarti...",
        correctAnswer: "apel",
        options: ["apel", "pisang", "anggur", "roti"],
        explanation: "Apfel = apel.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Ich trinke ___ Wasser.",
        correctAnswer: "gern",
        options: [],
        explanation: "gern = dengan senang hati.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Saya makan roti.",
        correctAnswer: "Ich esse Brot.",
        options: [],
        explanation: "Brot = roti.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'Milch' berarti...",
        correctAnswer: "susu",
        options: ["susu", "keju", "kopi", "jus"],
        explanation: "Milch = susu.",
      },
      {
        type: ExerciseType.PRONUNCIATION,
        prompt: "Ucapkan: Ich esse gern",
        correctAnswer: "Ich esse gern",
        options: [],
        explanation: "Latihan pengucapan makanan.",
      },
    ],
  },
  {
    title: "Kegiatan Sehari-hari",
    slug: "kegiatan-harian",
    description: "Rutinitas harian dalam bahasa Jerman.",
    level: LevelEnum.A2,
    order: 9,
    estimatedMinutes: 20,
    content: { topic: "daily" },
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'arbeiten' berarti...",
        correctAnswer: "bekerja",
        options: ["bermain", "bekerja", "belajar", "berbelanja"],
        explanation: "arbeiten = bekerja.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Ich ___ um sieben Uhr auf.",
        correctAnswer: "stehe",
        options: [],
        explanation: "aufstehen = bangun.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Saya belajar setiap hari.",
        correctAnswer: "Ich lerne jeden Tag.",
        options: [],
        explanation: "jeden Tag = setiap hari.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'schlafen' berarti...",
        correctAnswer: "tidur",
        options: ["makan", "tidur", "mandi", "membaca"],
        explanation: "schlafen = tidur.",
      },
      {
        type: ExerciseType.PRONUNCIATION,
        prompt: "Ucapkan: Ich gehe schlafen",
        correctAnswer: "Ich gehe schlafen",
        options: [],
        explanation: "Latihan pengucapan rutinitas.",
      },
    ],
  },
  {
    title: "Waktu Senggang",
    slug: "waktu-senggang",
    description: "Hobi dan aktivitas di waktu luang.",
    level: LevelEnum.A2,
    order: 10,
    estimatedMinutes: 20,
    content: { topic: "hobbies" },
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'lesen' berarti...",
        correctAnswer: "membaca",
        options: ["membaca", "menari", "berenang", "menyanyi"],
        explanation: "lesen = membaca.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Ich ___ gern Musik.",
        correctAnswer: "höre",
        options: [],
        explanation: "hören = mendengar.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Saya bermain sepak bola.",
        correctAnswer: "Ich spiele Fußball.",
        options: [],
        explanation: "spielen = bermain.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'tanzen' berarti...",
        correctAnswer: "menari",
        options: ["menari", "bernyanyi", "melukis", "berkebun"],
        explanation: "tanzen = menari.",
      },
      {
        type: ExerciseType.PRONUNCIATION,
        prompt: "Ucapkan: Ich spiele gern",
        correctAnswer: "Ich spiele gern",
        options: [],
        explanation: "Latihan pengucapan hobi.",
      },
    ],
  },
];

const vocab = [
  { german: "Guten Morgen", indonesian: "Selamat pagi", example: "Guten Morgen!", exampleTranslation: "Selamat pagi!", level: LevelEnum.A1, tags: ["greetings"] },
  { german: "Danke", indonesian: "Terima kasih", example: "Danke für deine Hilfe.", exampleTranslation: "Terima kasih atas bantuanmu.", level: LevelEnum.A1, tags: ["greetings"] },
  { german: "Bitte", indonesian: "Tolong/silakan", example: "Bitte setz dich.", exampleTranslation: "Silakan duduk.", level: LevelEnum.A1, tags: ["greetings"] },
  { german: "Hallo", indonesian: "Halo", example: "Hallo, ich bin Ana.", exampleTranslation: "Halo, saya Ana.", level: LevelEnum.A1, tags: ["greetings"] },
  { german: "Tschüss", indonesian: "Dadah", example: "Tschüss, bis morgen!", exampleTranslation: "Dadah, sampai besok!", level: LevelEnum.A1, tags: ["greetings"] },
  { german: "Ja", indonesian: "Ya", example: "Ja, gerne.", exampleTranslation: "Ya, tentu.", level: LevelEnum.A1, tags: ["basics"] },
  { german: "Nein", indonesian: "Tidak", example: "Nein, danke.", exampleTranslation: "Tidak, terima kasih.", level: LevelEnum.A1, tags: ["basics"] },
  { german: "Entschuldigung", indonesian: "Maaf", example: "Entschuldigung, wo ist der Bahnhof?", exampleTranslation: "Maaf, di mana stasiun?", level: LevelEnum.A1, tags: ["basics"] },
  { german: "Bahnhof", indonesian: "Stasiun", example: "Der Bahnhof ist groß.", exampleTranslation: "Stasiun itu besar.", level: LevelEnum.A1, tags: ["places"] },
  { german: "Straße", indonesian: "Jalan", example: "Die Straße ist lang.", exampleTranslation: "Jalan itu panjang.", level: LevelEnum.A1, tags: ["places"] },
];

const moreVocab = [
  { german: "Haus", indonesian: "Rumah", example: "Das Haus ist groß.", exampleTranslation: "Rumah itu besar.", level: LevelEnum.A1, tags: ["places"] },
  { german: "Schule", indonesian: "Sekolah", example: "Die Schule ist weit.", exampleTranslation: "Sekolah itu jauh.", level: LevelEnum.A1, tags: ["places"] },
  { german: "Stadt", indonesian: "Kota", example: "Berlin ist eine große Stadt.", exampleTranslation: "Berlin adalah kota besar.", level: LevelEnum.A1, tags: ["places"] },
  { german: "Wasser", indonesian: "Air", example: "Ich trinke Wasser.", exampleTranslation: "Saya minum air.", level: LevelEnum.A1, tags: ["food"] },
  { german: "Brot", indonesian: "Roti", example: "Das Brot ist frisch.", exampleTranslation: "Roti itu segar.", level: LevelEnum.A1, tags: ["food"] },
  { german: "Milch", indonesian: "Susu", example: "Die Milch ist kalt.", exampleTranslation: "Susu itu dingin.", level: LevelEnum.A1, tags: ["food"] },
  { german: "Apfel", indonesian: "Apel", example: "Der Apfel ist rot.", exampleTranslation: "Apel itu merah.", level: LevelEnum.A1, tags: ["food"] },
  { german: "Buch", indonesian: "Buku", example: "Das Buch ist interessant.", exampleTranslation: "Buku itu menarik.", level: LevelEnum.A1, tags: ["objects"] },
  { german: "Tisch", indonesian: "Meja", example: "Das Buch liegt auf dem Tisch.", exampleTranslation: "Buku itu ada di atas meja.", level: LevelEnum.A1, tags: ["objects"] },
  { german: "Stuhl", indonesian: "Kursi", example: "Der Stuhl ist bequem.", exampleTranslation: "Kursi itu nyaman.", level: LevelEnum.A1, tags: ["objects"] },
  { german: "Fenster", indonesian: "Jendela", example: "Das Fenster ist offen.", exampleTranslation: "Jendela itu terbuka.", level: LevelEnum.A1, tags: ["objects"] },
  { german: "Tür", indonesian: "Pintu", example: "Die Tür ist zu.", exampleTranslation: "Pintu itu tertutup.", level: LevelEnum.A1, tags: ["objects"] },
  { german: "Telefon", indonesian: "Telepon", example: "Mein Telefon ist alt.", exampleTranslation: "Telepon saya sudah tua.", level: LevelEnum.A1, tags: ["objects"] },
  { german: "Arbeit", indonesian: "Pekerjaan", example: "Die Arbeit ist schwer.", exampleTranslation: "Pekerjaan itu berat.", level: LevelEnum.A1, tags: ["work"] },
  { german: "Kind", indonesian: "Anak", example: "Das Kind spielt draußen.", exampleTranslation: "Anak itu bermain di luar.", level: LevelEnum.A1, tags: ["family"] },
  { german: "Mann", indonesian: "Pria/Suami", example: "Der Mann liest ein Buch.", exampleTranslation: "Pria itu membaca buku.", level: LevelEnum.A1, tags: ["family"] },
  { german: "Frau", indonesian: "Wanita/Istri", example: "Die Frau kocht.", exampleTranslation: "Wanita itu memasak.", level: LevelEnum.A1, tags: ["family"] },
  { german: "Mutter", indonesian: "Ibu", example: "Meine Mutter kocht gut.", exampleTranslation: "Ibu saya memasak dengan baik.", level: LevelEnum.A1, tags: ["family"] },
  { german: "Vater", indonesian: "Ayah", example: "Mein Vater arbeitet viel.", exampleTranslation: "Ayah saya banyak bekerja.", level: LevelEnum.A1, tags: ["family"] },
  { german: "Bruder", indonesian: "Kakak/Adik laki-laki", example: "Mein Bruder ist groß.", exampleTranslation: "Kakak saya tinggi.", level: LevelEnum.A1, tags: ["family"] },
  { german: "Schwester", indonesian: "Kakak/Adik perempuan", example: "Meine Schwester singt.", exampleTranslation: "Adik perempuan saya bernyanyi.", level: LevelEnum.A1, tags: ["family"] },
  { german: "Freund", indonesian: "Teman/Pacar (pria)", example: "Mein Freund heißt Lukas.", exampleTranslation: "Teman saya bernama Lukas.", level: LevelEnum.A1, tags: ["people"] },
  { german: "Freundin", indonesian: "Teman/Pacar (wanita)", example: "Meine Freundin kommt morgen.", exampleTranslation: "Teman perempuan saya datang besok.", level: LevelEnum.A1, tags: ["people"] },
  { german: "groß", indonesian: "Besar/Tinggi", example: "Der Turm ist groß.", exampleTranslation: "Menara itu besar.", level: LevelEnum.A1, tags: ["adjectives"] },
  { german: "klein", indonesian: "Kecil/Pendek", example: "Die Katze ist klein.", exampleTranslation: "Kucing itu kecil.", level: LevelEnum.A1, tags: ["adjectives"] },
  { german: "alt", indonesian: "Tua/Lama", example: "Das Auto ist alt.", exampleTranslation: "Mobil itu sudah tua.", level: LevelEnum.A1, tags: ["adjectives"] },
  { german: "neu", indonesian: "Baru", example: "Ich habe ein neues Fahrrad.", exampleTranslation: "Saya punya sepeda baru.", level: LevelEnum.A1, tags: ["adjectives"] },
  { german: "gut", indonesian: "Baik/Bagus", example: "Das ist gut.", exampleTranslation: "Itu bagus.", level: LevelEnum.A1, tags: ["adjectives"] },
  { german: "schön", indonesian: "Cantik/Indah", example: "Das Wetter ist schön.", exampleTranslation: "Cuacanya indah.", level: LevelEnum.A1, tags: ["adjectives"] },
  { german: "kalt", indonesian: "Dingin", example: "Es ist kalt draußen.", exampleTranslation: "Di luar dingin.", level: LevelEnum.A1, tags: ["weather"] },
  { german: "warm", indonesian: "Hangat", example: "Die Suppe ist warm.", exampleTranslation: "Supnya hangat.", level: LevelEnum.A1, tags: ["weather"] },
  { german: "heute", indonesian: "Hari ini", example: "Heute ist Montag.", exampleTranslation: "Hari ini hari Senin.", level: LevelEnum.A1, tags: ["time"] },
  { german: "morgen", indonesian: "Besok", example: "Ich komme morgen.", exampleTranslation: "Saya datang besok.", level: LevelEnum.A1, tags: ["time"] },
  { german: "gestern", indonesian: "Kemarin", example: "Gestern war Sonntag.", exampleTranslation: "Kemarin hari Minggu.", level: LevelEnum.A1, tags: ["time"] },
  { german: "jetzt", indonesian: "Sekarang", example: "Ich muss jetzt gehen.", exampleTranslation: "Saya harus pergi sekarang.", level: LevelEnum.A1, tags: ["time"] },
  { german: "kommen", indonesian: "Datang", example: "Ich komme aus Indonesien.", exampleTranslation: "Saya berasal dari Indonesia.", level: LevelEnum.A1, tags: ["verbs"] },
  { german: "gehen", indonesian: "Pergi", example: "Ich gehe in die Schule.", exampleTranslation: "Saya pergi ke sekolah.", level: LevelEnum.A1, tags: ["verbs"] },
  { german: "machen", indonesian: "Membuat/Melakukan", example: "Was machst du?", exampleTranslation: "Apa yang sedang kamu lakukan?", level: LevelEnum.A1, tags: ["verbs"] },
  { german: "sprechen", indonesian: "Berbicara", example: "Ich spreche Deutsch.", exampleTranslation: "Saya berbicara bahasa Jerman.", level: LevelEnum.A1, tags: ["verbs"] },
  { german: "verstehen", indonesian: "Mengerti", example: "Ich verstehe nicht.", exampleTranslation: "Saya tidak mengerti.", level: LevelEnum.A1, tags: ["verbs"] },
];

async function main() {
  const passwordHash1 = await bcrypt.hash("password123", 12);
  const passwordHash2 = await bcrypt.hash("password456", 12);

  const [user1, user2] = await prisma.$transaction([
    prisma.user.create({
      data: {
        email: "user1@example.com",
        passwordHash: passwordHash1,
        name: "Dewi",
        level: LevelEnum.A1,
      },
    }),
    prisma.user.create({
      data: {
        email: "user2@example.com",
        passwordHash: passwordHash2,
        name: "Rizky",
        level: LevelEnum.A2,
      },
    }),
  ]);

  for (const lesson of lessons) {
    await prisma.lesson.create({
      data: {
        title: lesson.title,
        slug: lesson.slug,
        description: lesson.description,
        level: lesson.level,
        order: lesson.order,
        content: lesson.content,
        estimatedMinutes: lesson.estimatedMinutes,
        exercises: {
          create: lesson.exercises,
        },
      },
    });
  }

  const vocabWords = await prisma.vocabWord.createMany({
    data: [...vocab, ...moreVocab],
  });

  const vocabEntries = await prisma.vocabWord.findMany({
    where: { level: LevelEnum.A1 },
    take: 10,
  });

  await prisma.flashcardReview.createMany({
    data: vocabEntries.map((word, index) => ({
      userId: user1.id,
      vocabWordId: word.id,
      easeFactor: 2.5,
      interval: 1,
      repetitions: 0,
      nextReviewAt: new Date(Date.now() - index * 86400000),
    })),
  });

  console.log("Seed completed", { vocabWords: vocabWords.count });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
