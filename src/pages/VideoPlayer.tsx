import { useMemo } from "react";
import { JSX } from "react";

export default function VideoPlayer(): JSX.Element {
  const url = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("url") ?? "";
  }, []);

  if (!url) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center text-white">
        <p>No se proporcionó URL de video.</p>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-black min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <video src={url} controls autoPlay className="w-full h-auto rounded-lg shadow-2xl" />
      </div>
    </section>
  );
}


