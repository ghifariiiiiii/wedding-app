// ============================================================
// weddingData.ts — ghiDigital.id Config Schema v1.1
// Setiap klien memiliki satu file config ini.
// Schema field TIDAK BERUBAH antar template, hanya nilainya.
// ============================================================

// --------------- TYPE DEFINITIONS ---------------

export interface WeddingEvent {
  title: string;
  date: string;           // "Sabtu, 9 April 2027"
  time: string;           // "09:00 - 11:00 WIB"
  venue: string;
  address: string;
  mapsUrl: string;        // URL Google Maps untuk tombol "Buka di Google Maps"
}

export interface LoveStoryItem {
  year: string;
  title: string;
  description: string;
  image: string;          // path relatif dari /public atau URL
}

export interface EntourageMember {
  name: string;
  role: string;
  photo?: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrCodeUrl?: string;
}

export interface DressCodeColor {
  name: string;
  hex: string;
}

// --------------- MAIN CONFIG ---------------

export const weddingData = {
  // --- SEO & Metadata ---
  meta: {
    title: "Pernikahan eun so & hyun wook | 9 April 2027",
    description:
      "You are cordially invited to celebrate the union of M. Alghifari Agin Ramadhani & Yughi Shifa Linafusil Mugi Hidayah. Sabtu, 9 April 2027.",
    // Key untuk URL query param personalisasi: ?to=NamaTamu
    // Ganti "to" jika ingin param key yang berbeda
    guestParamKey: "to",
  },

  // --- Couple ---
  couple: {
    bride: {
      shortName: "eun so",
      fullName: "Sin Eun So , S.Ars",
      parentNames: "Putri dari Bapak Mike & Ibu Winy",
      instagram: "@Shineunso",
      photo: "/foto-pengantin-wanita.jpg",
    },
    groom: {
      shortName: "hyun wook",
      fullName: "Hyun Wook , S.Ars",
      parentNames: "Putra dari Bapak Jackable & Ibu Greis",
      instagram: "@Hyunwook",
      photo: "/foto-pengantin-pria.jpg",
    },
    // Foto romantis untuk hero section background
    romanticPhoto: "/FotoPengantin.jpeg",
    // Background opening cover (URL atau path lokal)
    openingBg:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1920",
    // Ayat Al-Quran / quote pembuka (opsional)
    openingQuote:
      "\"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri.\" — Q.S. Ar-Rum: 21",
  },

  // --- Date ---
  date: {
    weddingDay: "9",
    weddingMonthYear: "April 2027",
    countdownTarget: "2027-04-09T09:00:00", // ISO format, waktu lokal
    formattedFull: "Sabtu, 9 April 2027",
  },

  // --- Background Music ---
  musicUrl: "/lagu-weeding.mp3", // Path dari /public, ganti per klien

  // --- Events (Akad & Resepsi) ---
  events: {
    akad: {
      title: "Akad Nikah",
      date: "Sabtu, 9 April 2027",
      time: "09:00 - 11:00 WIB",
      venue: "Masjid Fatimatuzzahra",
      address: "Jl. Jend Soedirman, Purwokerto Utara, Kab. Banyumas",
      mapsUrl: "https://maps.google.com/?q=Masjid+Fatimatuzzahra+Purwokerto",
    } as WeddingEvent,
    reception: {
      title: "Resepsi Pernikahan",
      date: "Sabtu, 9 April 2027",
      time: "18:00 - 21:00 WIB",
      venue: "Caffe Etery",
      address: "Jl. Mejasem, Kertasmanggu, Kec. Kramat, Kab. Tegal, Jawa Tengah",
      mapsUrl: "https://maps.google.com/?q=Caffe+Etery+Tegal",
    } as WeddingEvent,
  },

  // --- Love Story (opsional — set ke [] untuk menyembunyikan section) ---
  loveStory: [
    {
      year: "2023",
      title: "First Meet",
      description: "Hari pertama bertemu :>",
      image: "/Foto1.jpeg",
    },
    {
      year: "2025",
      title: "Comeback After Breakup?",
      description: "Foto pertama setelah lama tidak bertemu.",
      image: "/Foto2.jpeg",
    },
    {
      year: "2026",
      title: "The Graduation",
      description: "foto foto bersama",
      image: "/Foto3.jpeg",
    },
  ] as LoveStoryItem[],

  // --- Gallery (path lokal dari /public atau URL) ---
  gallery: [
    "/Foto4.jpeg",
    "/Foto5.jpeg",
    "/Foto6.jpeg",
    "/Foto7.jpeg",
    "/Foto8.jpeg",
    "/Foto9.jpeg",
    "/Foto10.jpeg",
    "/Foto11.jpeg",
  ] as string[],

  // --- Dress Code (opsional — set colors ke [] untuk menyembunyikan) ---
  dressCode: {
    guidelines:
      "Untuk merayakan momen istimewa kami, kami mengundang para tamu untuk hadir dengan busana sesuai tema warna kami. Hadir dengan anggun dan nyaman.",
    colors: [
      { name: "Navy Blue", hex: "#1D3557" },
      { name: "Sky Blue", hex: "#A8DADC" },
      { name: "Soft Blue", hex: "#4A7BC8" },
      { name: "White", hex: "#FFFFFF" },
    ] as DressCodeColor[],
  },

  // --- Wedding Gifts ---
  gifts: {
    message:
      "Doa dan kehadiran Anda sudah menjadi hadiah terindah bagi kami. Namun jika berkenan, kami menyediakan info rekening di bawah ini.",
    accounts: [
      {
        bankName: "BCA",
        accountNumber: "8410294821",
        accountHolder: "Hyun Wook.",
      },
      {
        bankName: "Mandiri",
        accountNumber: "1310029384192",
        accountHolder: "Eun So L. M. H.",
      },
    ] as BankAccount[],
    // URL QR code QRIS (bisa generate dari penyedia payment atau bank)
    qrisUrl:
      "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=AlghiYughiWeddingGift2027",
  },

  // --- Closing / Footer ---
  closing: {
    // Pesan penutup di footer
    message: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.",
    // Hashtag media sosial (opsional)
    hashtag: "#HyunwookEunso2027",
    // Nama yang tampil di footer
    coupleShort: "Hyun Wook & Eun So",
  },

  // --- Entourage (data tersimpan tapi tidak dirender di template lite) ---
  entourage: {
    bridesmaids: [] as EntourageMember[],
    groomsmen: [] as EntourageMember[],
    family: [] as EntourageMember[],
  },
};

export type WeddingData = typeof weddingData;
