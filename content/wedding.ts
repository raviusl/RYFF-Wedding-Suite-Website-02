export const wedding = {
  groom: "Roy",
  bride: "MJ",
  monogram: "R & M",
  weddingDate: "22 NOVEMBER 2026",
  dinnerTime: "6:30 PM",
  dayOfWeek: "Sunday",
  venue: "Copper Mansion Signature",
  venueAddress: "12, Jalan 51a/223, Seksyen 51a",
  city: "Petaling Jaya",
  googleMapsUrl: "https://maps.google.com",

  countdownAt: "2026-11-22T18:30:00+08:00",
  timezone: "Asia/Kuala_Lumpur",
  targetDate: "2026-11-22T18:30:00",

  logoImage: "/images/logo.png",
  music: {
    src: "/audio/wedding.mp3",
    title: "Cinematic Soundtrack",
  },
  audio: {
    src: "/audio/wedding.mp3",
    title: "Cinematic Soundtrack",
  },

  // 永久全公开 RSVP 配置（确保 isOpen 为 true）
  attend: {
    isOpen: true,
    title: "Your Presence",
    subtitle: "We hope you will be there.",
    modalTitle: "RSVP & Attendance",
    modalSubtitle: "Please confirm your presence with us on this special evening.",
    deadline: "Kindly respond before 1st October 2026",
    acceptLabel: "Joyfully Accept",
    declineLabel: "Regretfully Decline",
    guestOptions: ["1 Guest", "2 Guests", "3 Guests", "4 Guests"],
    googleSheetWebhook: "https://script.google.com/macros/s/AKfycbyE8woa2fHWz-Cp7NJD06bPP-xxxhOSQQqGoSExs3Zec4VMrhFIGOl_hJ_AjVwAwfl1/exec",
  },

  portraits: {
    story: "/images/story/story-1.jpeg",
  },
  story: {
    chapter: "CHAPTER ONE",
    title: "It began quietly.",
    paragraphs: [
      "What held us was never spectacle. It was the quieter work of choosing one another in ordinary hours — a table kept later than intended, a silence that did not need filling.",
      "On this evening we ask the people we love to sit with us, as that private decision is made visible.",
    ],
    photo: "/images/story/story-1.jpeg",
  },

  timeline: [
    { time: "6:30 PM", title: "Arrival & Welcome Cocktails", note: "Foyer lounge" },
    { time: "7:30 PM", title: "Grand Entrance & Toast", note: "Main dining hall" },
    { time: "8:15 PM", title: "Dinner & Speeches", note: "Curated course menu" },
    { time: "10:00 PM", title: "Dancing & Celebration", note: "Under the lights" },
  ],

  details: {
    dressCode: "Formal / Evening Attire",
    attireNote: "Deep burgundy, dark tones, black tie encouraged",
    palette: [
      { name: "Black", hex: "#0d0506" },
      { name: "Deep Burgundy", hex: "#4a121a" },
      { name: "Muted Rose", hex: "#c4a8aa" },
    ],
    contact: {
      team: "RYFF Wedding Suite",
      email: "hello@ryff.com",
      instagram: "@ryffwedding",
    },
  },

  gallery: [
    { src: "/images/gallery/images-2.jpeg", label: "PORTRAIT I" },
    { src: "/images/gallery/images-3.jpeg", label: "PORTRAIT II" },
    { src: "/images/gallery/images-5.jpeg", label: "PORTRAIT III" },
  ],
};

export const weddingData = wedding;
export default wedding;