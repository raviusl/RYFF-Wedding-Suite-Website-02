import { Cormorant_Garamond, Montserrat, Alex_Brush } from "next/font/google";

export const fontSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const fontSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// 匹配 Madelyn 风格的高级手写连笔签名体
export const fontScript = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});