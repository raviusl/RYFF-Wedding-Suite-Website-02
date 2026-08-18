import { cn } from "@/lib/cn";

type SceneProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

export function Scene({ id, children, className }: SceneProps) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 py-32 sm:py-40", className)}>
      {children}
    </section>
  );
}
