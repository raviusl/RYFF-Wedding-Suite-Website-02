import { Scene } from "@/components/layout/scene";
import { wedding } from "@/content/wedding";

export function Details() {
  return (
    <Scene id="details">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="kicker">The Details</p>
        <h2 className="display title mt-6">A few things to know.</h2>

        <p className="kicker mt-16">Dress code</p>
        <p className="mt-5 font-serif text-2xl font-light italic text-ivory">
          {wedding.details.dressCode}
        </p>
        <p className="prose-soft mt-3">{wedding.details.attireNote}</p>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-10">
          {wedding.details.palette.map((swatch) => (
            <li key={swatch.name} className="flex flex-col items-center gap-3">
              <span
                className="h-12 w-12 rounded-full"
                style={{
                  backgroundColor: swatch.hex,
                  boxShadow: "inset 0 0 0 1px rgba(196, 168, 170, 0.4)",
                }}
                aria-hidden="true"
              />
              <span className="kicker">{swatch.name}</span>
            </li>
          ))}
        </ul>

        <p className="kicker mt-20">Contact</p>
        <p className="mt-5 font-serif text-2xl font-light italic text-ivory">
          {wedding.details.contact.team}
        </p>
        <p className="prose-soft mt-4">
          {wedding.details.contact.email}
          <br />
          {wedding.details.contact.instagram}
        </p>
      </div>
    </Scene>
  );
}
