/*
  INSTAGRAM-LOGO
  --------------
  Das Instagram-Glyph als feine, einfarbige Linienzeichnung (Form wie in
  den Icon-Sammlungen Lucide/Feather). Es übernimmt die Textfarbe
  (currentColor): dunkel auf hellem Grund, hell im dunklen Footer.
  Nach den Markenrichtlinien von Instagram darf das Glyph einfarbig
  verwendet werden, um auf das eigene Profil zu verlinken.
*/
export default function InstagramIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect x="2.8" y="2.8" width="18.4" height="18.4" rx="5.2" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.35" cy="6.65" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}
