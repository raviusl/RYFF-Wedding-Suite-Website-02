import { Scene } from "@/components/layout/scene";
import { wedding } from "@/content/wedding";

export function Venue() {
  return (
    <Scene id="venue">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="kicker">The Place</p>
        <h2 className="display title mt-6">Where we gather.</h2>
        <p className="mt-10 font-serif text-3xl font-light italic text-ivory">
          {wedding.venue}
        </p>
        <p className="prose-soft mt-5">
          {wedding.venueAddress}
          <br />
          {wedding.city}
        </p>
        <a
          href={wedding.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="cta mt-10"
        >
          View Location
        </a>
      </div>
    </Scene>
  );
}
