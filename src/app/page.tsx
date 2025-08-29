import Image from "next/image";
import ConfigurationsPage from "./configurations/page";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 gap-16">
      <main className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
        <ConfigurationsPage />
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center">
        {/* footer content */}
      </footer>
    </div>

  );
}
