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

const moreVocab = Array.from({ length: 40 }).map((_, index) => ({
  german: `Wort ${index + 1}`,
  indonesian: `Kata ${index + 1}`,
  example: `Das ist Wort ${index + 1}.`,
  exampleTranslation: `Ini adalah kata ${index + 1}.`,
  level: LevelEnum.A1,
  tags: ["basics"],
}));

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
