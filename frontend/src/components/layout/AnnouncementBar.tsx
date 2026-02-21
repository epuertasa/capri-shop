// Server Component
export function AnnouncementBar() {
  return (
    <div
      className="bg-blush py-2 px-4"
      role="region"
      aria-label="Información de envíos"
    >
      <p className="font-body text-xs text-ink text-center tracking-widest uppercase">
        ¡Envíos Gratis desde{" "}
        <strong className="font-semibold">35,00 €</strong>!
      </p>
    </div>
  );
}
