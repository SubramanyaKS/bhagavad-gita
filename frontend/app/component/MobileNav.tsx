const navItems = [
  { label: "Home", icon: "🏠" },
  { label: "Read", icon: "📖" },
  { label: "Ask", icon: "✦" },
  { label: "My Gita", icon: "♡" },
];

export default function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {navItems.map((item) => (
        <div key={item.label} className="flex flex-col items-center justify-center text-[11px] text-[#766e63]">
          <span className="text-base leading-none">{item.icon}</span>
          <span className="mt-1">{item.label}</span>
        </div>
      ))}
    </nav>
  );
}
