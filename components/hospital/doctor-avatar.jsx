const tones = ["#16355C", "#1E56A0", "#40699C", "#0E2038"];

// Initials avatar: consistent duotone identity until real portraits ship.
export function DoctorAvatar({ name, size = 56 }) {
  const initials = (name || "?")
    .replace(/^Dr\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const tone =
    tones[
      [...(name || "x")].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) %
        tones.length
    ];

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{ width: size, height: size, backgroundColor: tone }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
