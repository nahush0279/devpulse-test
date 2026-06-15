import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getGreeting } from "@/lib/fallow-fixtures/greeting";
import { formatUser } from "@/lib/fallow-fixtures/cycles/user-service";

export default function HomePage() {
  const label = formatUser(getGreeting("Fallow"));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-semibold">Fallow fixture project</h1>
      <p className="text-muted-foreground">{label}</p>
    </main>
  );
}
