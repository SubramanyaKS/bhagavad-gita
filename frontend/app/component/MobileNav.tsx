import Link from 'next/link';

const navItems = [
  { label: "Home", icon: "🏠", href: "/" },
  { label: "Read", icon: "📖", href: "/explore" },
  { label: "Learn", icon: "✦", href: "/learn" },
];

export default function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex flex-col items-center justify-center text-[11px] text-[#766e63] no-underline transition hover:text-[#29251f]"
        >
          <span className="text-base leading-none">{item.icon}</span>
          <span className="mt-1">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
