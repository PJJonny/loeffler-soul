/*
  LOGO
  ----
  Zeigt das hochgeladene Original-Logo (/public/logo.png) – unverändert,
  nur der weiße Hintergrund wurde entfernt, damit es sauber auf der cremefarbenen
  Fläche sitzt. Größe wird über die Höhe gesteuert (className, z. B. "h-11 w-auto").

  Hinweis: Das Logo ist schwarz. Auf hellen Flächen (Header) steht es perfekt.
  Auf der dunklen Footer-Fläche wird stattdessen die Wortmarke als Text gezeigt
  (siehe Footer.tsx), da das Logo laut Vorgabe nicht umgefärbt werden darf.
  Möchtest du das Bildlogo auch im Footer, lege eine helle Version als
  /public/logo-hell.png ab und binde sie dort ein.
*/

import Image from "next/image";

export default function Logo({ className = "h-11 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="LOEFFLER SOUL"
      width={760}
      height={701}
      priority
      className={className}
    />
  );
}
