import { AttendModal } from "@/components/attend/attend-modal";
import { AttendProvider } from "@/components/attend/attend-context";
import { DrapeAtmosphere } from "@/components/layout/drape-atmosphere";
import { MusicPlayer } from "@/components/layout/music-player";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Attend } from "@/components/sections/attend";
import { Details } from "@/components/sections/details";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Story } from "@/components/sections/story";
import { Timeline } from "@/components/sections/timeline";
import { Venue } from "@/components/sections/venue";

export default function HomePage() {
  return (
    <AttendProvider>
      <DrapeAtmosphere />
      <div className="canvas">
        <SiteHeader />
        <main>
          <Hero />
          <Story />
          <Timeline />
          <Venue />
          <Details />
          <Gallery />
          <Attend />
        </main>
        <SiteFooter />
      </div>
      <AttendModal />
      <MusicPlayer />
    </AttendProvider>
  );
}
