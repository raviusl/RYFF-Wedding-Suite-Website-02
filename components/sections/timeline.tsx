import { Scene } from "@/components/layout/scene";
import { wedding } from "@/content/wedding";

export function Timeline() {
  return (
    <Scene id="timeline">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="kicker">The Evening</p>
        <h2 className="display title mt-6">One evening, everything changes.</h2>
        <p className="prose-soft mt-6">
          {wedding.weddingDate}
          <span className="mx-2 text-rose/50">·</span>
          {wedding.dayOfWeek}
        </p>

        <ol className="relative mt-16 pt-2">
          <span className="timeline-line" aria-hidden="true" />
          {wedding.timeline.map((moment) => (
            <li key={`${moment.time}-${moment.title}`} className="relative pb-16 last:pb-0">
              <span className="timeline-node" aria-hidden="true" />
              <p className="kicker pt-6">{moment.time}</p>
              <p className="mt-4 font-serif text-2xl font-light italic text-ivory">
                {moment.title}
              </p>
              {moment.note ? <p className="prose-soft mt-3">{moment.note}</p> : null}
            </li>
          ))}
        </ol>
      </div>
    </Scene>
  );
}
