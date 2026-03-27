import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/deeplink";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookie", href: "/cookie" },
  { label: "Contact", href: "/contact" },
  { label: "Help Centre", href: "/help" },
];

interface Props {
  readonly mobile?: boolean;
}

export default function Footer({ mobile = false }: Props) {
  return (
    <footer className={`flex flex-col items-center gap-6 px-4 pt-10 ${mobile ? "pb-28" : "pb-10"}`}>
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

      {!mobile && (
        <div className="flex items-center gap-6">
          <a href={APP_STORE_URL} aria-label="Download on the App Store">
            <img src="/icons/icon-apple.svg" alt="App Store" className="w-5 h-auto" />
          </a>
          <a href={PLAY_STORE_URL} aria-label="Get it on Google Play">
            <img src="/icons/icon-playstore.svg" alt="Google Play" className="w-5 h-auto" />
          </a>
        </div>
      )}
    </footer>
  );
}
