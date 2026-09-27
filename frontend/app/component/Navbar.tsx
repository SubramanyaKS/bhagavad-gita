const Navbar = () => {
  return (
    <nav className="sticky top-0 z-100 flex h-18 items-center justify-between border-b border-[#ded8cc] bg-[rgba(247,244,237,0.96)] px-[6%]">
  
  {/* Logo */}
  <div className="text-[22px] font-bold">
    <span className="mr-2 text-[26px]">ॐ</span> Gita
  </div>

  {/* Nav Links */}
  <div className="flex gap-8.5 font-sans text-sm">
    <a href="/explore" className="text-[#625b51] no-underline hover:text-[#29251f]">Read</a>
    <a href="#" className="text-[#625b51] no-underline hover:text-[#29251f]">Ask</a>
    <a href="#" className="text-[#625b51] no-underline hover:text-[#29251f]">Learn</a>
    <a href="#" className="text-[#625b51] no-underline hover:text-[#29251f]">My Gita</a>
  </div>

  {/* Nav Actions */}
  <div className="flex gap-2.5">
    <button className="flex h-9.5 w-9.5 items-center justify-center rounded-full border border-[#d8d1c5] bg-transparent cursor-pointer">
      🌐
    </button>
    <button className="flex h-9.5 w-9.5 items-center justify-center rounded-full border border-[#d8d1c5] bg-transparent cursor-pointer">
      ☼
    </button>
  </div>
</nav>
  )
}

export default Navbar