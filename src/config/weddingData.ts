export interface WeddingEvent {
  title: string;
  date: string; // e.g. "Sunday, 18 May 2027"
  time: string; // e.g. "09:00 AM - 11:00 AM"
  venue: string;
  address: string;
  mapsUrl: string;
}

export interface LoveStoryItem {
  year: string;
  title: string;
  description: string;
  image: string;
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

export const weddingData = {
  couple: {
    bride: {
      shortName: "Yughi",
      fullName: "Yughi Shifa Linafusil Mugi Hidayah, S.Ars",
      parentNames: "Daughter of Mr. Albert Margaretta & Mrs. Evelyn Margaretta",
      instagram: "@oliviamargaretta",
      photo: "/foto-pengantin-wanita.jpg",
    },
    groom: {
      shortName: "Alghifari",
      fullName: "M. Alghifari Agin Ramadhani, M.B.A",
      parentNames: "Son of Mr. Henry Alexander & Mrs. Victoria Alexander",
      instagram: "@ralphalexander",
      photo: "/foto-pengantin-pria.jpg",
    },
    romanticPhoto: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920",
    openingBg: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1920",
  },
  date: {
    weddingDay: "18",
    weddingMonthYear: "May 2027",
    countdownTarget: "2027-05-18T09:00:00", // Future date for active countdown
    formattedFull: "Sunday, 18 May 2027",
  },
  musicUrl: "/lagu-weeding.mp3", // Local wedding music
  events: {
    akad: {
      title: "Akad Nikah",
      date: "Sunday, 18 May 2027",
      time: "09:00 AM - 11:00 AM (WIB)",
      venue: "St. John's Luxury Cathedral",
      address: "Jl. Katedral No.7, Pasar Baru, Sawah Besar, Central Jakarta City",
      mapsUrl: "https://maps.google.com/?q=Cathedral+of+Jakarta",
    } as WeddingEvent,
    reception: {
      title: "Wedding Reception",
      date: "Sunday, 18 May 2027",
      time: "06:00 PM - 09:00 PM (WIB)",
      venue: "Grand Ballroom, The Ritz Palace",
      address: "Mega Kuningan Barat Kav. E.1.1, Kuningan, South Jakarta City",
      mapsUrl: "https://maps.google.com/?q=The+Ritz-Carlton+Jakarta",
    } as WeddingEvent,
  },
  loveStory: [
    {
      year: "2021",
      title: "First Meet",
      description: "Our paths crossed for the first time in a cozy art workshop. Amidst brushes and paints, a beautiful spark of friendship began to grow.",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
    },
    {
      year: "2023",
      title: "Relationship Journey",
      description: "Two years of building memories, navigating dreams, and supporting each other through every high and low. We officially began our journey together.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
    },
    {
      year: "2025",
      title: "The Engagement",
      description: "Underneath a canopy of stars on a quiet beach, Ralph asked, and Olivia happily said YES. The beginning of our forever.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600",
    },
  ] as LoveStoryItem[],
  dressCode: {
    guidelines: "To celebrate our union, we request our beloved guests to dress in our color theme. Dress warmly and gracefully.",
    colors: [
      { name: "Navy Blue", hex: "#1D3557" },
      { name: "Sky Blue", hex: "#A8DADC" },
      { name: "Soft Blue", hex: "#4A7BC8" }, // Luxury soft blue color swatches
      { name: "White", hex: "#FFFFFF" },
    ],
  },
  gifts: {
    accounts: [
      {
        bankName: "BCA",
        accountNumber: "8410294821",
        accountHolder: "Olivia Margaretta",
      },
      {
        bankName: "Mandiri",
        accountNumber: "1310029384192",
        accountHolder: "Ralph Alexander",
      },
    ] as BankAccount[],
    qrisUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=OliviaRalphWeddingGift", // Demo QRIS
  },
  gallery: [
    "https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
  ],
  entourage: {
    bridesmaids: [
      { name: "Sarah Jenkins", role: "Maid of Honor" },
      { name: "Emily Watson", role: "Bridesmaid" },
      { name: "Chloe Bennett", role: "Bridesmaid" },
      { name: "Sophia Martinez", role: "Bridesmaid" },
    ] as EntourageMember[],
    groomsmen: [
      { name: "David Miller", role: "Best Man" },
      { name: "James Anderson", role: "Groomsman" },
      { name: "Michael Carter", role: "Groomsman" },
      { name: "William Taylor", role: "Groomsman" },
    ] as EntourageMember[],
    family: [
      { name: "Albert Margaretta", role: "Father of the Bride" },
      { name: "Evelyn Margaretta", role: "Mother of the Bride" },
      { name: "Henry Alexander", role: "Father of the Groom" },
      { name: "Victoria Alexander", role: "Mother of the Groom" },
    ] as EntourageMember[],
  },
};
