import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/deeplink";

const NAV_LINKS = [
  { label: "Home", href: "https://www.linkupapp.io/" },
  { label: "Terms", href: "https://www.linkupapp.io/terms-of-use" },
  { label: "Privacy", href: "https://www.linkupapp.io/privacy-policy" },
  { label: "Cookie", href: "https://www.linkupapp.io/cookie-policy" },
  { label: "Contact", href: "https://www.linkupapp.io/contact" },
  { label: "Help Center", href: "https://www.linkupapp.io/help-center" },
];

interface Props {
  readonly mobile?: boolean;
}

export default function Footer({ mobile = false }: Props) {
  return (
    <footer className={`flex flex-col items-center gap-8 px-4 pt-16 ${mobile ? "pb-28" : "pb-16"}`}>
      <nav className="flex flex-wrap justify-center gap-x-10 gap-y-3">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 text-[13px] hover:text-white/80 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {!mobile && (
        <div className="flex items-center gap-8">
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