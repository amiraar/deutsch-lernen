// @ts-nocheck
import "dotenv/config";

import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient, LevelEnum, ExerciseType } from "../src/generated/prisma/client";
import { LESSON_CONTENT } from "../lesson-content";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const lessons = [
  {
    title: "Salam Dasar",
    slug: "salam-dasar",
    description: "Kenalan dengan salam dan sapaan dasar bahasa Jerman.",
    level: LevelEnum.A1,
    order: 1,
    estimatedMinutes: 15,
    content: LESSON_CONTENT["salam-dasar"],
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
    content: LESSON_CONTENT["angka-1-20"],
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
    content: LESSON_CONTENT["kata-ganti-orang"],
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
    content: LESSON_CONTENT["gender-kata-benda"],
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
    content: LESSON_CONTENT["kata-kerja-dasar"],
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
    content: LESSON_CONTENT["waktu-dan-hari"],
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
    content: LESSON_CONTENT["arah-dan-tempat"],
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
    content: LESSON_CONTENT["makanan-favorit"],
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
    content: LESSON_CONTENT["kegiatan-harian"],
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
    content: LESSON_CONTENT["waktu-senggang"],
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
  {
    title: "Perfekt Tense",
    slug: "perfekt-tense",
    description: "Mengenal Perfekt untuk menceritakan kejadian masa lalu.",
    level: LevelEnum.B1,
    order: 11,
    estimatedMinutes: 25,
    content: LESSON_CONTENT["perfekt-tense"],
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Pilih bentuk Perfekt yang benar: Ich ___ gegessen.",
        correctAnswer: "habe",
        options: ["bin", "habe", "hat", "haben"],
        explanation: "Ich + haben = ich habe gegessen.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Er ___ nach Hause gegangen.",
        correctAnswer: "ist",
        options: [],
        explanation: "gehen memakai sein: Er ist gegangen.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Saya sudah belajar bahasa Jerman.",
        correctAnswer: "Ich habe Deutsch gelernt.",
        options: [],
        explanation: "Perfekt: habe + gelernt.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Partizip II dari 'finden' adalah...",
        correctAnswer: "gefunden",
        options: ["gefindet", "gefunden", "findet", "finden"],
        explanation: "finden → gefunden.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Wir ___ gestern gearbeitet.",
        correctAnswer: "haben",
        options: [],
        explanation: "arbeiten memakai haben: wir haben gearbeitet.",
      },
    ],
  },
  {
    title: "Modalverben",
    slug: "modalverben",
    description: "Kata kerja modal untuk kemampuan, keharusan, dan izin.",
    level: LevelEnum.B1,
    order: 12,
    estimatedMinutes: 25,
    content: LESSON_CONTENT["modalverben"],
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'Ich ___ helfen.' Pilih modal yang tepat untuk 'bisa'.",
        correctAnswer: "kann",
        options: ["kann", "muss", "darf", "will"],
        explanation: "können = bisa.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Du ___ nicht rauchen.",
        correctAnswer: "darfst",
        options: [],
        explanation: "dürfen = boleh/tidak boleh.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Kami harus berangkat sekarang.",
        correctAnswer: "Wir müssen jetzt los.",
        options: [],
        explanation: "müssen = harus.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Bentuk 'möchten' untuk wir adalah...",
        correctAnswer: "möchten",
        options: ["möchtest", "möchten", "möchte", "möchtet"],
        explanation: "wir möchten.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Er ___ Arzt werden.",
        correctAnswer: "will",
        options: [],
        explanation: "wollen = ingin.",
      },
    ],
  },
  {
    title: "Konjunktionen",
    slug: "konjunktionen",
    description: "Menghubungkan kalimat dengan konjungsi koordinasi dan subordinasi.",
    level: LevelEnum.B1,
    order: 13,
    estimatedMinutes: 25,
    content: LESSON_CONTENT["konjunktionen"],
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Konjungsi subordinating yang benar untuk sebab adalah...",
        correctAnswer: "weil",
        options: ["und", "aber", "weil", "oder"],
        explanation: "weil = karena dan membuat kata kerja di akhir.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Ich bleibe zu Hause, ___ ich krank bin.",
        correctAnswer: "weil",
        options: [],
        explanation: "weil menaruh kata kerja di akhir.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Walaupun hujan, kami tetap pergi.",
        correctAnswer: "Obwohl es regnet, gehen wir trotzdem.",
        options: [],
        explanation: "obwohl = walaupun.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Kalimat yang benar dengan 'denn' adalah...",
        correctAnswer: "Ich komme, denn ich habe Zeit.",
        options: [
          "Ich komme, denn ich Zeit habe.",
          "Ich komme, denn ich habe Zeit.",
          "Ich komme, denn habe ich Zeit.",
          "Ich komme, denn ich Zeit habe nicht.",
        ],
        explanation: "denn tidak mengubah urutan kata.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "___ ich Zeit habe, komme ich.",
        correctAnswer: "Wenn",
        options: [],
        explanation: "Jika anak kalimat di depan, kalimat utama inversi.",
      },
    ],
  },
  {
    title: "Komparativ & Superlativ",
    slug: "komparativ-superlativ",
    description: "Membandingkan dengan Komparativ dan Superlativ.",
    level: LevelEnum.B1,
    order: 14,
    estimatedMinutes: 25,
    content: LESSON_CONTENT["komparativ-superlativ"],
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Bentuk komparativ dari 'groß' adalah...",
        correctAnswer: "größer",
        options: ["großer", "größer", "am größten", "groß"],
        explanation: "groß → größer.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Das Auto ist ___ als das Fahrrad.",
        correctAnswer: "schneller",
        options: [],
        explanation: "schnell → schneller.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Ini yang paling baik.",
        correctAnswer: "Das ist am besten.",
        options: [],
        explanation: "Superlativ: am besten.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Bentuk superlativ dari 'gut' adalah...",
        correctAnswer: "am besten",
        options: ["am besten", "am gutesten", "besser", "besten"],
        explanation: "gut → besser → am besten.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Berlin ist ___ als Hamburg.",
        correctAnswer: "größer",
        options: [],
        explanation: "Komparativ memakai -er.",
      },
    ],
  },
  {
    title: "Dativ vs Akkusativ",
    slug: "dativ-akkusativ",
    description: "Memahami perbedaan kasus Akkusativ dan Dativ.",
    level: LevelEnum.B1,
    order: 15,
    estimatedMinutes: 25,
    content: LESSON_CONTENT["dativ-akkusativ"],
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Pilih bentuk yang benar: Ich sehe ___ Mann.",
        correctAnswer: "den",
        options: ["der", "den", "dem", "des"],
        explanation: "Akkusativ maskulin: den Mann.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Ich helfe ___ Kind.",
        correctAnswer: "dem",
        options: [],
        explanation: "Dativ: dem Kind.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Kami memberi teman sebuah buku.",
        correctAnswer: "Wir geben dem Freund ein Buch.",
        options: [],
        explanation: "Dativ untuk objek tidak langsung.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Preposisi yang selalu Akkusativ adalah...",
        correctAnswer: "für",
        options: ["mit", "bei", "für", "nach"],
        explanation: "für selalu Akkusativ.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Wir gehen ___ Bahnhof.",
        correctAnswer: "zum",
        options: [],
        explanation: "zu + Dativ: zum Bahnhof.",
      },
    ],
  },
  {
    title: "Konjunktiv II",
    slug: "konjunktiv-ii",
    description: "Mengungkapkan kondisi tidak nyata dan permintaan sopan.",
    level: LevelEnum.B2,
    order: 16,
    estimatedMinutes: 30,
    content: LESSON_CONTENT["konjunktiv-ii"],
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Bentuk yang benar: Ich ___ gern reisen.",
        correctAnswer: "würde",
        options: ["würde", "werde", "wurde", "würden"],
        explanation: "Konjunktiv II: würde + infinitif.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Wenn ich Zeit hätte, ___ ich kommen.",
        correctAnswer: "würde",
        options: [],
        explanation: "Kalimat pengandaian memakai würde.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Bisakah Anda menunggu di sini?",
        correctAnswer: "Würden Sie bitte hier warten?",
        options: [],
        explanation: "Permintaan sopan dengan würde.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Bentuk khusus Konjunktiv II untuk 'haben' adalah...",
        correctAnswer: "hätte",
        options: ["hat", "hatte", "hätte", "haben"],
        explanation: "haben → hätte.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Wir ___ helfen, aber wir sind nicht da.",
        correctAnswer: "würden",
        options: [],
        explanation: "wir würden.",
      },
    ],
  },
  {
    title: "Passiv",
    slug: "passiv",
    description: "Membedakan Vorgangspassiv dan Zustandspassiv.",
    level: LevelEnum.B2,
    order: 17,
    estimatedMinutes: 30,
    content: LESSON_CONTENT["passiv"],
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Kalimat pasif proses yang benar adalah...",
        correctAnswer: "Das Haus wird gebaut.",
        options: [
          "Das Haus ist gebaut.",
          "Das Haus wird gebaut.",
          "Das Haus war gebaut.",
          "Das Haus hat gebaut.",
        ],
        explanation: "Vorgangspassiv memakai werden + Partizip II.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Der Brief ___ geschrieben.",
        correctAnswer: "wird",
        options: [],
        explanation: "werden + Partizip II.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Tugasnya sudah selesai.",
        correctAnswer: "Die Aufgabe ist erledigt.",
        options: [],
        explanation: "Zustandspassiv: sein + Partizip II.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Bentuk Zustandspassiv yang benar adalah...",
        correctAnswer: "Die Tür ist geschlossen.",
        options: ["Die Tür wird geschlossen.", "Die Tür ist geschlossen.", "Die Tür schließt.", "Die Tür hat geschlossen."],
        explanation: "sein + Partizip II.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Die Aufgaben ___ erklärt.",
        correctAnswer: "werden",
        options: [],
        explanation: "Plural: werden.",
      },
    ],
  },
  {
    title: "Nebensätze",
    slug: "nebensatze",
    description: "Relativsatz, pertanyaan tidak langsung, dan konstruksi infinitif.",
    level: LevelEnum.B2,
    order: 18,
    estimatedMinutes: 30,
    content: LESSON_CONTENT["nebensatze"],
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Relativsatz yang benar adalah...",
        correctAnswer: "Das ist der Mann, der hier wohnt.",
        options: [
          "Das ist der Mann, der wohnt hier.",
          "Das ist der Mann, der hier wohnt.",
          "Das ist der Mann, hier wohnt der.",
          "Das ist der Mann, wohnt der hier.",
        ],
        explanation: "Kata kerja di akhir anak kalimat.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Ich weiß nicht, ___ er kommt.",
        correctAnswer: "ob",
        options: [],
        explanation: "Pertanyaan tidak langsung memakai ob.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Saya belajar untuk lulus ujian.",
        correctAnswer: "Ich lerne, um die Prüfung zu bestehen.",
        options: [],
        explanation: "um...zu + infinitif.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Kalimat dengan 'ohne...zu' yang benar adalah...",
        correctAnswer: "Er geht, ohne etwas zu sagen.",
        options: [
          "Er geht, ohne er etwas sagt.",
          "Er geht, ohne etwas zu sagen.",
          "Er geht, ohne zu sagt etwas.",
          "Er geht, ohne etwas sagt.",
        ],
        explanation: "ohne...zu + infinitif.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Er fragt, ___ du kommst.",
        correctAnswer: "ob",
        options: [],
        explanation: "ob untuk pertanyaan ya/tidak.",
      },
    ],
  },
  {
    title: "Wortbildung",
    slug: "wortbildung",
    description: "Mengenal prefiks, sufiks, dan komposita dalam pembentukan kata.",
    level: LevelEnum.B2,
    order: 19,
    estimatedMinutes: 30,
    content: LESSON_CONTENT["wortbildung"],
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Bentuk kata dengan prefiks 'un-' dari 'glücklich' adalah...",
        correctAnswer: "unglücklich",
        options: ["glücklich", "unglücklich", "glücklichun", "unglücke"],
        explanation: "un- membentuk makna negasi.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Frei → ___ (kata benda)",
        correctAnswer: "Freiheit",
        options: [],
        explanation: "Suffix -heit membentuk noun abstrak.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Saya butuh penjelasan.",
        correctAnswer: "Ich brauche eine Erklärung.",
        options: [],
        explanation: "erklären → Erklärung.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Kata majemuk yang benar adalah...",
        correctAnswer: "Sprachkurs",
        options: ["Sprache Kurs", "Sprachkurs", "Kurs Sprache", "Sprach Kurs"],
        explanation: "Komposita digabung jadi satu kata.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "schnell → ___ (noun)",
        correctAnswer: "Schnelligkeit",
        options: [],
        explanation: "-keit membentuk noun.",
      },
    ],
  },
  {
    title: "Bahasa Formal",
    slug: "formelle-sprache",
    description: "Gaya bahasa formal untuk surat dan situasi profesional.",
    level: LevelEnum.B2,
    order: 20,
    estimatedMinutes: 30,
    content: LESSON_CONTENT["formelle-sprache"],
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Pembuka surat formal yang tepat adalah...",
        correctAnswer: "Sehr geehrte Damen und Herren,",
        options: ["Hallo!", "Liebe Freunde,", "Sehr geehrte Damen und Herren,", "Hi zusammen,"],
        explanation: "Surat formal memakai pembuka sopan.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Ich freue mich auf Ihre ___.",
        correctAnswer: "Rückmeldung",
        options: [],
        explanation: "Ungkapan formal untuk menunggu balasan.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Terima kasih sebelumnya.",
        correctAnswer: "Vielen Dank im Voraus.",
        options: [],
        explanation: "Ungkapan formal umum.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Ungkapan penutup formal yang benar adalah...",
        correctAnswer: "Mit freundlichen Grüßen",
        options: ["Tschüss", "Bis bald", "Mit freundlichen Grüßen", "Viele Grüße"],
        explanation: "Penutup formal standar.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Ich ___ Ihnen zu.",
        correctAnswer: "stimme",
        options: [],
        explanation: "Ich stimme Ihnen zu.",
      },
    ],
  },
  {
    title: "Warna & Kata Sifat",
    slug: "farben-und-adjektive",
    description: "Warna dasar dan cara memakainya sebagai kata sifat.",
    level: LevelEnum.A1,
    order: 21,
    estimatedMinutes: 15,
    content: LESSON_CONTENT["farben-und-adjektive"],
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'grün' berarti...",
        correctAnswer: "Hijau",
        options: ["Merah", "Biru", "Hijau", "Kuning"],
        explanation: "grün = hijau.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Der Apfel ist ___. (merah)",
        correctAnswer: "rot",
        options: [],
        explanation: "Setelah 'ist', warna tidak berubah bentuk: rot.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Mobil itu hitam.",
        correctAnswer: "Das Auto ist schwarz.",
        options: [],
        explanation: "Pola: [benda] + ist + [warna].",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'hellblau' berarti...",
        correctAnswer: "Biru muda",
        options: ["Biru tua", "Biru muda", "Abu-abu", "Ungu"],
        explanation: "hell- = muda, dunkel- = tua.",
      },
      {
        type: ExerciseType.PRONUNCIATION,
        prompt: "Ucapkan: weiß und schwarz",
        correctAnswer: "weiß und schwarz",
        options: [],
        explanation: "Latihan pengucapan warna.",
      },
    ],
  },
  {
    title: "Cuaca & Musim",
    slug: "wetter-und-jahreszeiten",
    description: "Mendeskripsikan cuaca, suhu, dan empat musim.",
    level: LevelEnum.A2,
    order: 22,
    estimatedMinutes: 20,
    content: LESSON_CONTENT["wetter-und-jahreszeiten"],
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'Es regnet' berarti...",
        correctAnswer: "Sedang hujan",
        options: ["Sedang panas", "Sedang hujan", "Sedang bersalju", "Berawan"],
        explanation: "regnen = hujan; es regnet = sedang hujan.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "___ ist kalt. (Saya kedinginan)",
        correctAnswer: "Mir",
        options: [],
        explanation: "Merasa dingin memakai Dativ: Mir ist kalt.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Pada musim dingin sering turun salju.",
        correctAnswer: "Im Winter schneit es oft.",
        options: [],
        explanation: "'Pada musim...' = im + musim.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Musim gugur dalam bahasa Jerman adalah...",
        correctAnswer: "der Herbst",
        options: ["der Frühling", "der Sommer", "der Herbst", "der Winter"],
        explanation: "Herbst = musim gugur (September–November).",
      },
      {
        type: ExerciseType.PRONUNCIATION,
        prompt: "Ucapkan: Es ist sonnig und warm",
        correctAnswer: "Es ist sonnig und warm",
        options: [],
        explanation: "Latihan pengucapan kalimat cuaca.",
      },
    ],
  },
  {
    title: "Präteritum",
    slug: "praeteritum",
    description: "Bentuk lampau untuk tulisan, sein, haben, dan modal.",
    level: LevelEnum.B1,
    order: 23,
    estimatedMinutes: 25,
    content: LESSON_CONTENT["praeteritum"],
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Präteritum dari 'sein' (ich) adalah...",
        correctAnswer: "war",
        options: ["bin", "war", "gewesen", "wurde"],
        explanation: "ich war = saya (dulu) adalah.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Wir ___ keine Zeit. (haben, Präteritum)",
        correctAnswer: "hatten",
        options: [],
        explanation: "haben → hatte; wir hatten.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Saya tidak bisa datang.",
        correctAnswer: "Ich konnte nicht kommen.",
        options: [],
        explanation: "können → konnte (Präteritum).",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "Präteritum dari 'gehen' adalah...",
        correctAnswer: "ging",
        options: ["gegangen", "gehte", "ging", "geht"],
        explanation: "gehen adalah verba kuat: ging.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Es ___ einmal... (awal dongeng)",
        correctAnswer: "war",
        options: [],
        explanation: "Es war einmal = pada suatu ketika.",
      },
    ],
  },
  {
    title: "Idiom & Ungkapan",
    slug: "redewendungen",
    description: "Idiom sehari-hari agar bahasamu terdengar alami.",
    level: LevelEnum.B2,
    order: 24,
    estimatedMinutes: 25,
    content: LESSON_CONTENT["redewendungen"],
    exercises: [
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'Ich verstehe nur Bahnhof' berarti...",
        correctAnswer: "Saya tidak mengerti sama sekali",
        options: [
          "Saya suka kereta",
          "Saya tidak mengerti sama sekali",
          "Saya mau pulang",
          "Saya paham sedikit",
        ],
        explanation: "Idiom: tidak paham sama sekali.",
      },
      {
        type: ExerciseType.FILL_IN_BLANK,
        prompt: "Ich drücke dir die ___. (semoga berhasil)",
        correctAnswer: "Daumen",
        options: [],
        explanation: "Ich drücke dir die Daumen = semoga berhasil.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'Das ist mir Wurst' berarti...",
        correctAnswer: "Terserah, saya tidak peduli",
        options: [
          "Saya lapar",
          "Terserah, saya tidak peduli",
          "Itu enak",
          "Saya marah",
        ],
        explanation: "Idiom dengan makanan: tidak peduli.",
      },
      {
        type: ExerciseType.TRANSLATION,
        prompt: "Kamu beruntung sekali!",
        correctAnswer: "Du hast Schwein gehabt!",
        options: [],
        explanation: "Schwein haben = beruntung.",
      },
      {
        type: ExerciseType.MULTIPLE_CHOICE,
        prompt: "'zwei Fliegen mit einer Klappe schlagen' setara dengan...",
        correctAnswer: "Sekali dayung dua pulau terlampaui",
        options: [
          "Besar pasak daripada tiang",
          "Sekali dayung dua pulau terlampaui",
          "Air susu dibalas air tuba",
          "Tak ada rotan akar pun jadi",
        ],
        explanation: "Menyelesaikan dua hal sekaligus.",
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
  { german: "gestern", indonesian: "kemarin", example: "Gestern habe ich gelernt.", exampleTranslation: "Kemarin saya belajar.", level: LevelEnum.B1, tags: ["past_tense"] },
  { german: "schon", indonesian: "sudah", example: "Ich habe schon gegessen.", exampleTranslation: "Saya sudah makan.", level: LevelEnum.B1, tags: ["past_tense"] },
  { german: "erklären", indonesian: "menjelaskan", example: "Er hat es erklärt.", exampleTranslation: "Dia sudah menjelaskannya.", level: LevelEnum.B1, tags: ["past_tense"] },
  { german: "müssen", indonesian: "harus", example: "Ich muss arbeiten.", exampleTranslation: "Saya harus bekerja.", level: LevelEnum.B1, tags: ["modal_verbs"] },
  { german: "können", indonesian: "bisa", example: "Sie kann schwimmen.", exampleTranslation: "Dia bisa berenang.", level: LevelEnum.B1, tags: ["modal_verbs"] },
  { german: "dürfen", indonesian: "boleh", example: "Darf ich fragen?", exampleTranslation: "Boleh saya bertanya?", level: LevelEnum.B1, tags: ["modal_verbs"] },
  { german: "wollen", indonesian: "ingin", example: "Ich will reisen.", exampleTranslation: "Saya ingin bepergian.", level: LevelEnum.B1, tags: ["modal_verbs"] },
  { german: "sollen", indonesian: "sebaiknya", example: "Du sollst lernen.", exampleTranslation: "Kamu sebaiknya belajar.", level: LevelEnum.B1, tags: ["modal_verbs"] },
  { german: "möchten", indonesian: "ingin (sopan)", example: "Ich möchte Tee.", exampleTranslation: "Saya ingin teh.", level: LevelEnum.B1, tags: ["modal_verbs"] },
  { german: "weil", indonesian: "karena", example: "Ich bleibe, weil ich müde bin.", exampleTranslation: "Saya tinggal karena saya lelah.", level: LevelEnum.B1, tags: ["conjunctions"] },
  { german: "obwohl", indonesian: "walaupun", example: "Obwohl es regnet, gehe ich.", exampleTranslation: "Walaupun hujan, saya pergi.", level: LevelEnum.B1, tags: ["conjunctions"] },
  { german: "dass", indonesian: "bahwa", example: "Ich weiß, dass er kommt.", exampleTranslation: "Saya tahu bahwa dia datang.", level: LevelEnum.B1, tags: ["conjunctions"] },
  { german: "wenn", indonesian: "jika", example: "Wenn ich Zeit habe, komme ich.", exampleTranslation: "Jika saya punya waktu, saya datang.", level: LevelEnum.B1, tags: ["conjunctions"] },
  { german: "größer", indonesian: "lebih besar", example: "Berlin ist größer als Hamburg.", exampleTranslation: "Berlin lebih besar daripada Hamburg.", level: LevelEnum.B1, tags: ["comparison"] },
  { german: "schneller", indonesian: "lebih cepat", example: "Der Zug ist schneller.", exampleTranslation: "Kereta lebih cepat.", level: LevelEnum.B1, tags: ["comparison"] },
  { german: "besser", indonesian: "lebih baik", example: "Das ist besser.", exampleTranslation: "Itu lebih baik.", level: LevelEnum.B1, tags: ["comparison"] },
  { german: "am besten", indonesian: "paling baik", example: "Das ist am besten.", exampleTranslation: "Itu yang terbaik.", level: LevelEnum.B1, tags: ["comparison"] },
  { german: "den", indonesian: "artikel Akkusativ (mask.)", example: "Ich sehe den Mann.", exampleTranslation: "Saya melihat pria itu.", level: LevelEnum.B1, tags: ["cases"] },
  { german: "dem", indonesian: "artikel Dativ (mask.)", example: "Ich helfe dem Mann.", exampleTranslation: "Saya membantu pria itu.", level: LevelEnum.B1, tags: ["cases"] },
  { german: "für", indonesian: "untuk", example: "Das Geschenk ist für dich.", exampleTranslation: "Hadiah itu untukmu.", level: LevelEnum.B1, tags: ["cases"] },
  { german: "mit", indonesian: "dengan", example: "Ich komme mit dem Bus.", exampleTranslation: "Saya datang dengan bus.", level: LevelEnum.B1, tags: ["cases"] },
  { german: "würde", indonesian: "akan (Konjunktiv II)", example: "Ich würde helfen.", exampleTranslation: "Saya akan membantu.", level: LevelEnum.B2, tags: ["subjunctive"] },
  { german: "hätte", indonesian: "akan punya", example: "Ich hätte Zeit.", exampleTranslation: "Saya akan punya waktu.", level: LevelEnum.B2, tags: ["subjunctive"] },
  { german: "könnte", indonesian: "bisa (andaikan)", example: "Wir könnten gehen.", exampleTranslation: "Kami bisa pergi.", level: LevelEnum.B2, tags: ["subjunctive"] },
  { german: "würden", indonesian: "akan (plural)", example: "Wir würden kommen.", exampleTranslation: "Kami akan datang.", level: LevelEnum.B2, tags: ["subjunctive"] },
  { german: "passiv", indonesian: "pasif", example: "Das wird passiv gesagt.", exampleTranslation: "Itu dikatakan secara pasif.", level: LevelEnum.B2, tags: ["passive_voice"] },
  { german: "werden", indonesian: "menjadi", example: "Das Haus wird gebaut.", exampleTranslation: "Rumah sedang dibangun.", level: LevelEnum.B2, tags: ["passive_voice"] },
  { german: "relativ", indonesian: "relatif", example: "Das ist ein relativ wichtiger Punkt.", exampleTranslation: "Itu poin yang relatif penting.", level: LevelEnum.B2, tags: ["subordinate_clauses"] },
  { german: "ob", indonesian: "apakah", example: "Ich frage, ob er kommt.", exampleTranslation: "Saya bertanya apakah dia datang.", level: LevelEnum.B2, tags: ["subordinate_clauses"] },
  { german: "um...zu", indonesian: "untuk...", example: "Ich lerne, um die Prüfung zu bestehen.", exampleTranslation: "Saya belajar untuk lulus ujian.", level: LevelEnum.B2, tags: ["subordinate_clauses"] },
  { german: "Präfix", indonesian: "prefiks", example: "Un- ist ein Präfix.", exampleTranslation: "Un- adalah prefiks.", level: LevelEnum.B2, tags: ["word_formation"] },
  { german: "Suffix", indonesian: "sufiks", example: "-ung ist ein Suffix.", exampleTranslation: "-ung adalah sufiks.", level: LevelEnum.B2, tags: ["word_formation"] },
  { german: "Kompositum", indonesian: "kata majemuk", example: "Hausaufgabe ist ein Kompositum.", exampleTranslation: "Hausaufgabe adalah kata majemuk.", level: LevelEnum.B2, tags: ["word_formation"] },
  { german: "formell", indonesian: "formal", example: "Das ist eine formelle E-Mail.", exampleTranslation: "Itu email formal.", level: LevelEnum.B2, tags: ["formal_language"] },
  { german: "Rückmeldung", indonesian: "balasan", example: "Ich warte auf Ihre Rückmeldung.", exampleTranslation: "Saya menunggu balasan Anda.", level: LevelEnum.B2, tags: ["formal_language"] },
  { german: "Bewerbung", indonesian: "lamaran", example: "Ich schicke meine Bewerbung.", exampleTranslation: "Saya mengirim lamaran saya.", level: LevelEnum.B2, tags: ["formal_language"] },
  { german: "Zustimmung", indonesian: "persetujuan", example: "Danke für die Zustimmung.", exampleTranslation: "Terima kasih atas persetujuannya.", level: LevelEnum.B2, tags: ["formal_language"] },
  { german: "Ablehnung", indonesian: "penolakan", example: "Die Ablehnung war höflich.", exampleTranslation: "Penolakannya sopan.", level: LevelEnum.B2, tags: ["formal_language"] },
  { german: "rot", indonesian: "merah", example: "Der Apfel ist rot.", exampleTranslation: "Apel itu merah.", level: LevelEnum.A1, tags: ["colors"] },
  { german: "blau", indonesian: "biru", example: "Der Himmel ist blau.", exampleTranslation: "Langit itu biru.", level: LevelEnum.A1, tags: ["colors"] },
  { german: "gelb", indonesian: "kuning", example: "Die Blume ist gelb.", exampleTranslation: "Bunga itu kuning.", level: LevelEnum.A1, tags: ["colors"] },
  { german: "grün", indonesian: "hijau", example: "Das Gras ist grün.", exampleTranslation: "Rumput itu hijau.", level: LevelEnum.A1, tags: ["colors"] },
  { german: "schwarz", indonesian: "hitam", example: "Das Auto ist schwarz.", exampleTranslation: "Mobil itu hitam.", level: LevelEnum.A1, tags: ["colors"] },
  { german: "weiß", indonesian: "putih", example: "Der Schnee ist weiß.", exampleTranslation: "Salju itu putih.", level: LevelEnum.A1, tags: ["colors"] },
  { german: "regnen", indonesian: "hujan", example: "Es regnet heute.", exampleTranslation: "Hari ini hujan.", level: LevelEnum.A2, tags: ["weather"] },
  { german: "schneien", indonesian: "turun salju", example: "Im Winter schneit es.", exampleTranslation: "Pada musim dingin turun salju.", level: LevelEnum.A2, tags: ["weather"] },
  { german: "die Sonne", indonesian: "matahari", example: "Die Sonne scheint.", exampleTranslation: "Matahari bersinar.", level: LevelEnum.A2, tags: ["weather"] },
  { german: "der Winter", indonesian: "musim dingin", example: "Der Winter ist kalt.", exampleTranslation: "Musim dingin itu dingin.", level: LevelEnum.A2, tags: ["weather"] },
  { german: "der Sommer", indonesian: "musim panas", example: "Im Sommer ist es warm.", exampleTranslation: "Pada musim panas hangat.", level: LevelEnum.A2, tags: ["weather"] },
  { german: "die Redewendung", indonesian: "idiom/ungkapan", example: "Diese Redewendung ist lustig.", exampleTranslation: "Idiom ini lucu.", level: LevelEnum.B2, tags: ["idioms"] },
  { german: "Daumen drücken", indonesian: "mendoakan berhasil", example: "Ich drücke dir die Daumen!", exampleTranslation: "Semoga berhasil!", level: LevelEnum.B2, tags: ["idioms"] },
  { german: "Schwein haben", indonesian: "beruntung", example: "Du hast Schwein gehabt!", exampleTranslation: "Kamu beruntung sekali!", level: LevelEnum.B2, tags: ["idioms"] },
  { german: "die Nase voll haben", indonesian: "sudah muak", example: "Ich habe die Nase voll.", exampleTranslation: "Saya sudah muak.", level: LevelEnum.B2, tags: ["idioms"] },
];

async function main() {
  const existingLessons = await prisma.lesson.count();
  const isFreshSeed = existingLessons === 0;

  if (existingLessons >= lessons.length) {
    console.log("Seed sudah lengkap, skip.");
    return;
  }

  let user1: { id: string } | null = null;

  if (isFreshSeed) {
    const passwordHash1 = await bcrypt.hash("password123", 12);
    const passwordHash2 = await bcrypt.hash("password456", 12);

    [user1] = await prisma.$transaction([
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
  }

  // Top-up aware: only create lessons whose slug is not in the database yet.
  const existingSlugSet = new Set(
    (await prisma.lesson.findMany({ select: { slug: true } })).map(
      (lesson) => lesson.slug
    )
  );

  for (const lesson of lessons) {
    if (existingSlugSet.has(lesson.slug)) {
      continue;
    }
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

  const existingVocabSet = new Set(
    (await prisma.vocabWord.findMany({ select: { german: true } })).map(
      (word) => word.german
    )
  );

  const vocabWords = await prisma.vocabWord.createMany({
    data: [...vocab, ...moreVocab].filter(
      (word) => !existingVocabSet.has(word.german)
    ),
  });

  const vocabForLinks = await prisma.vocabWord.findMany({
    select: { id: true, tags: true },
  });

  const lessonLinks: Array<{ lessonSlug: string; tags: string[] }> = [
    { lessonSlug: "salam-dasar", tags: ["greetings"] },
    { lessonSlug: "angka-1-20", tags: ["basics"] },
    { lessonSlug: "kata-ganti-orang", tags: ["basics"] },
    { lessonSlug: "gender-kata-benda", tags: ["objects"] },
    { lessonSlug: "kata-kerja-dasar", tags: ["verbs"] },
    { lessonSlug: "waktu-dan-hari", tags: ["time"] },
    { lessonSlug: "arah-dan-tempat", tags: ["places"] },
    { lessonSlug: "makanan-favorit", tags: ["food"] },
    { lessonSlug: "kegiatan-harian", tags: ["daily"] },
    { lessonSlug: "waktu-senggang", tags: ["hobbies"] },
    { lessonSlug: "perfekt-tense", tags: ["past_tense"] },
    { lessonSlug: "modalverben", tags: ["modal_verbs"] },
    { lessonSlug: "konjunktionen", tags: ["conjunctions"] },
    { lessonSlug: "komparativ-superlativ", tags: ["comparison"] },
    { lessonSlug: "dativ-akkusativ", tags: ["cases"] },
    { lessonSlug: "konjunktiv-ii", tags: ["subjunctive"] },
    { lessonSlug: "passiv", tags: ["passive_voice"] },
    { lessonSlug: "nebensatze", tags: ["subordinate_clauses"] },
    { lessonSlug: "wortbildung", tags: ["word_formation"] },
    { lessonSlug: "formelle-sprache", tags: ["formal_language"] },
    { lessonSlug: "farben-und-adjektive", tags: ["colors"] },
    { lessonSlug: "wetter-und-jahreszeiten", tags: ["weather"] },
    { lessonSlug: "praeteritum", tags: ["past_tense"] },
    { lessonSlug: "redewendungen", tags: ["idioms"] },
  ];

  const lessonBySlug = await prisma.lesson.findMany({
    select: { id: true, slug: true },
  });

  const lessonIdBySlug = new Map(
    lessonBySlug.map((lesson) => [lesson.slug, lesson.id])
  );

  const vocabIdsByTag = new Map<string, string[]>();
  for (const word of vocabForLinks) {
    for (const tag of word.tags) {
      const existing = vocabIdsByTag.get(tag) ?? [];
      existing.push(word.id);
      vocabIdsByTag.set(tag, existing);
    }
  }

  const lessonVocabLinks: Array<{ lessonId: string; vocabWordId: string }> = [];
  for (const link of lessonLinks) {
    const lessonId = lessonIdBySlug.get(link.lessonSlug);
    if (!lessonId) {
      continue;
    }
    for (const tag of link.tags) {
      const vocabIds = vocabIdsByTag.get(tag) ?? [];
      for (const vocabId of vocabIds) {
        lessonVocabLinks.push({ lessonId, vocabWordId: vocabId });
      }
    }
  }

  if (lessonVocabLinks.length > 0) {
    await prisma.lessonVocab.createMany({
      data: lessonVocabLinks,
      skipDuplicates: true,
    });
  }

  if (user1) {
    const vocabEntries = await prisma.vocabWord.findMany({
      where: { level: LevelEnum.A1 },
      take: 10,
    });

    const demoUserId = user1.id;
    await prisma.flashcardReview.createMany({
      data: vocabEntries.map((word, index) => ({
        userId: demoUserId,
        vocabWordId: word.id,
        easeFactor: 2.5,
        interval: 1,
        repetitions: 0,
        nextReviewAt: new Date(Date.now() - index * 86400000),
      })),
    });
  }

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
