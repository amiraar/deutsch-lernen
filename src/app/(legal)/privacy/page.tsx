import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Kebijakan Privasi",
	description:
		"Data apa yang dikumpulkan Deutsch Lernen, ke mana data dikirim, dan hak kamu atas data tersebut.",
};

/**
 * Placeholders in square brackets must be filled before launch:
 * [NAMA ENTITAS], [ALAMAT], [EMAIL KONTAK], [TANGGAL BERLAKU].
 * Every claim below matches what the code actually does; update this page
 * whenever data collection changes.
 */
export default function PrivacyPage() {
	return (
		<main className="mx-auto max-w-3xl space-y-8 px-6 py-12">
			<header className="space-y-2">
				<h1 className="font-display text-3xl font-semibold text-foreground">
					Kebijakan Privasi
				</h1>
				<p className="text-sm text-muted-foreground">
					Berlaku sejak [TANGGAL BERLAKU]. Pengendali data: [NAMA ENTITAS],
					[ALAMAT]. Kontak: [EMAIL KONTAK].
				</p>
			</header>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold text-foreground">1. Data yang dikumpulkan</h2>
				<ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
					<li>Data akun: alamat email, nama, dan password dalam bentuk hash bcrypt.</li>
					<li>
						Data belajar: level (A1-B2), XP, streak, waktu belajar terakhir,
						riwayat penyelesaian pelajaran (skor dan XP), serta status review
						kartu kosakata.
					</li>
					<li>
						Teks yang kamu kirim ke AI Tutor dan jawaban latihan menulis.
					</li>
					<li>
						Rekaman suara latihan pelafalan: dikirim ke server untuk diproses,
						tidak disimpan, dan tidak diteruskan ke penyedia AI.
					</li>
					<li>
						Log keamanan: waktu kejadian, alamat IP, dan email dalam bentuk
						tersamar (contoh: a***l@contoh.com) untuk login gagal, pembuatan
						akun, dan pemblokiran karena terlalu banyak percobaan.
					</li>
				</ul>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold text-foreground">2. Dasar dan tujuan pemrosesan</h2>
				<p className="text-sm text-muted-foreground">
					Data akun diperlukan untuk menjalankan layanan sesuai persetujuan yang
					kamu berikan saat mendaftar. Data belajar dipakai untuk menampilkan
					progres dan menjadwalkan review kartu. Log keamanan dipakai untuk
					mendeteksi penyalahgunaan, berdasarkan kepentingan sah pengelolaan
					keamanan sistem.
				</p>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold text-foreground">3. Pihak ketiga</h2>
				<p className="text-sm text-muted-foreground">
					Teks yang kamu kirim ke AI Tutor dan latihan menulis diproses oleh
					penyedia model bahasa pihak ketiga: Google (Gemini), Groq, dan
					Anthropic (Claude). Jangan mengirim data pribadi atau rahasia ke
					fitur tersebut.
				</p>
				<p className="text-sm text-muted-foreground">
					Pemroses lain: Vercel (hosting), Neon (basis data PostgreSQL), Upstash
					atau Redis (pembatasan laju dan cache), serta Resend (pengiriman email
					reset password).
				</p>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold text-foreground">4. Cookie dan penyimpanan browser</h2>
				<ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
					<li>
						Cookie sesi (httpOnly, secure, SameSite=Lax) untuk menjaga status
						login, berumur 7 hari.
					</li>
					<li>Cookie token CSRF dari Auth.js untuk mencegah pemalsuan permintaan.</li>
					<li>
						localStorage: daftar id kartu yang sudah dinilai di sesi flashcard.
						Tidak ada token maupun data pribadi di sana.
					</li>
					<li>Tidak ada cookie iklan dan tidak ada pelacak analitik pihak ketiga.</li>
				</ul>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold text-foreground">5. Retensi</h2>
				<p className="text-sm text-muted-foreground">
					Data akun dan data belajar disimpan selama akun aktif. Saat akun
					dihapus, seluruh baris data belajar dan data akun dihapus permanen
					dari basis data. Log keamanan disimpan maksimal 90 hari.
				</p>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold text-foreground">6. Hak kamu</h2>
				<ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
					<li>
						Akses dan salinan data: tombol <strong>Unduh data saya</strong> di
						halaman Profil menghasilkan berkas JSON berisi data kamu.
					</li>
					<li>
						Penghapusan: tombol <strong>Hapus akun</strong> di halaman Profil
						menghapus akun beserta seluruh riwayat secara permanen.
					</li>
					<li>Perbaikan: level belajar bisa diubah sendiri melalui aplikasi.</li>
					<li>
						Penarikan persetujuan dan keberatan: hubungi [EMAIL KONTAK].
						Permintaan dijawab maksimal 14 hari kerja.
					</li>
				</ul>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold text-foreground">7. Keamanan dan insiden</h2>
				<p className="text-sm text-muted-foreground">
					Password disimpan sebagai hash bcrypt, koneksi basis data memakai TLS,
					dan seluruh lalu lintas aplikasi memakai HTTPS. Jika terjadi kebocoran
					data pribadi, pemberitahuan dikirim kepada pemilik data dan lembaga
					berwenang dalam 3x24 jam sesuai UU No. 27 Tahun 2022. Laporan
					kerentanan: lihat{" "}
					<Link href="/.well-known/security.txt" className="text-primary hover:underline">
						/.well-known/security.txt
					</Link>
					.
				</p>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold text-foreground">8. Anak</h2>
				<p className="text-sm text-muted-foreground">
					Layanan ini tidak ditujukan bagi anak di bawah 13 tahun. Pengguna di
					bawah umur sesuai hukum yang berlaku memerlukan persetujuan orang tua
					atau wali.
				</p>
			</section>

			<footer className="border-t border-border pt-6 text-sm text-muted-foreground">
				<Link href="/" className="text-primary hover:underline">
					Kembali ke halaman utama
				</Link>
			</footer>
		</main>
	);
}
