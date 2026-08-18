export const site = {
  name: "Roy & MJ",
  company: "RYFF",
  version: "2.0.0",
  copyright: "© 2026 RYFF",
  website: "https://ryff.com",
  instagram: "@ryffwedding",
  email: "hello@ryff.com",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;

export const navigation = [
  { href: "#story", label: "Story" },
  { href: "#timeline", label: "Evening" },
  { href: "#venue", label: "Venue" },
  { href: "#details", label: "Details" },
  { href: "#gallery", label: "Memories" },
  { href: "#attend", label: "Presence" },
] as const;

export default site;
