import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Syarat dan Ketentuan",
	description: "Aturan penggunaan Deutsch Lernen.",
};

/**
 * Placeholders in square brackets must be filled before launch:
 * [NAMA ENTITAS], [ALAMAT], [EMAIL KONTAK], [TANGGAL BERLAKU], [YURISDIKSI].
 */
export default function TermsPage() {
	return (
		<main className="mx-auto max-w-3xl space-y-8 px-6 py-12">
			<header className="space-y-2">
				<h1 className="font-display text-3xl font-semibold text-foreground">
					Syarat dan Ketentuan
				</h1>
				<p className="text-sm text-muted-foreground">
					Berlaku sejak [TANGGAL BERLAKU]. Penyelenggara: [NAMA ENTITAS],
					[ALAMAT]. Kontak: [EMAIL KONTAK].
				</p>
			</header>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold text-foreground">1. Akun</h2>
				<p className="text-sm text-muted-foreground">
					Satu orang satu akun. Kamu bertanggung jawab menjaga kerahasiaan
					password dan atas semua aktivitas yang terjadi pada akunmu. Beri tahu
					kami segera jika akun diduga diakses pihak lain.
				</p>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold text-foreground">2. Penggunaan yang dilarang</h2>
				<ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
					<li>
						Mengotomatiskan permintaan di luar pemakaian normal, termasuk
						memanipulasi XP, streak, atau hasil latihan.
					</li>
					<li>
						Mencoba mengakses data pengguna lain atau menembus pembatasan akses.
					</li>
					<li>
						Mengirim konten melanggar hukum ke fitur AI Tutor, atau memakainya
						untuk menghasilkan konten yang melanggar hukum.
					</li>
					<li>
						Melakukan uji keamanan tanpa izin tertulis. Pelaporan kerentanan
						dilakukan melalui jalur di{" "}
						<Link
							href="/.well-known/security.txt"
							className="text-primary hover:underline"
						>
							/.well-known/security.txt
						</Link>
						.
					</li>
				</ul>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold text-foreground">3. Batas layanan</h2>
				<p className="text-sm text-muted-foreground">
					Jumlah permintaan AI dan permintaan API dibatasi per akun untuk
					menjaga layanan tetap tersedia. Pelanggaran berulang dapat berujung
					pada penangguhan atau penghapusan akun.
				</p>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold text-foreground">4. Konten AI</h2>
				<p className="text-sm text-muted-foreground">
					Jawaban AI Tutor dihasilkan secara otomatis dan bisa salah. Materi
					dalam layanan ini bersifat bantuan belajar, bukan sertifikasi bahasa
					resmi.
				</p>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold text-foreground">5. Ketersediaan dan perubahan</h2>
				<p className="text-sm text-muted-foreground">
					Layanan disediakan apa adanya tanpa jaminan ketersediaan tanpa henti.
					Syarat ini dapat diubah; perubahan material diumumkan di halaman ini
					beserta tanggal berlakunya.
				</p>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold text-foreground">6. Penghentian akun</h2>
				<p className="text-sm text-muted-foreground">
					Kamu dapat menghapus akun kapan saja dari halaman Profil. Penghapusan
					bersifat permanen dan menghapus seluruh riwayat belajar.
				</p>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold text-foreground">7. Hukum yang berlaku</h2>
				<p className="text-sm text-muted-foreground">
					Syarat ini tunduk pada hukum [YURISDIKSI]. Pemrosesan data pribadi
					dijelaskan pada{" "}
					<Link href="/privacy" className="text-primary hover:underline">
						Kebijakan Privasi
					</Link>
					.
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
