import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/deeplink";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookie", href: "/cookie" },
  { label: "Contact", href: "/contact" },
  { label: "Help Centre", href: "/help" },
];

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-6 px-4 py-10">
      {/* Nav links */}
      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-white/50 text-[13px] hover:text-white/80 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* App store buttons */}
      <div className="flex items-center gap-6">
        <a href={APP_STORE_URL} aria-label="Download on the App Store">
          <AppleIcon />
        </a>
        <a href={PLAY_STORE_URL} aria-label="Get it on Google Play">
          <GooglePlayIcon />
        </a>
      </div>
    </footer>
  );
}

function AppleIcon() {
  return (
    <svg width="28" height="34" viewBox="0 0 28 34" fill="none" className="text-white/60 hover:text-white/90 transition-colors">
      <path
        d="M23.2 17.9c0-3.8 2.1-5.8 2.2-5.9-1.2-1.7-3-1.9-3.7-1.9-1.6-.2-3.1 1-3.9 1-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.8 1.3 10.4.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.5 0 2 .8 3.3.8 1.4 0 2.3-1.3 3.1-2.6.6-.9 1-1.8 1.3-2.8-2.9-1.1-2.6-5.4.4-5.4zM20.6 8.2c.7-.9 1.2-2.1 1.1-3.3-1.1.1-2.4.7-3.1 1.6-.7.8-1.3 2-1.1 3.2 1.2.1 2.4-.5 3.1-1.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg width="30" height="34" viewBox="0 0 30 34" fill="none" className="text-white/60 hover:text-white/90 transition-colors">
      <path
        d="M1.5 1.8C1.2 2.1 1 2.6 1 3.3v27.4c0 .7.2 1.2.5 1.5l.1.1 15.3-15.3v-.3L1.6 1.7l-.1.1z"
        fill="currentColor"
        fillOpacity="0.7"
      />
      <path
        d="M21.8 22.2l-5.1-5.1v-.4l5.1-5.1.1.1 6 3.4c1.7 1 1.7 2.6 0 3.6l-6 3.4-.1.1z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <path
        d="M22 22.1L16.7 17 1.5 32.2c.6.6 1.5.6 2.5.1L22 22.1z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <path
        d="M22 11.9L4 1.7C3 1.1 2.1 1.2 1.5 1.8L16.7 17 22 11.9z"
        fill="currentColor"
        fillOpacity="0.8"
      />
    </svg>
  );
}
