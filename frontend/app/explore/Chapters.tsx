"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { filters } from "../utils/utils";
import { ChaptersProps } from "../utils/types";


const Chapters = ({ initialChapters }: ChaptersProps) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  const visibleChapters = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return initialChapters.filter((chapter) => {
      const tags = chapter.tags ?? [];
      const matchesFilter =
        activeFilter === "All" ||
        tags.map((tag) => tag.toLowerCase()).includes(activeFilter.toLowerCase()) ||
        (activeFilter === "Knowledge" && tags.some((tag) => tag.toLowerCase() === "knowledge")) ||
        (activeFilter === "Karma" && tags.some((tag) => tag.toLowerCase() === "karma")) ||
        (activeFilter === "Devotion" && tags.some((tag) => tag.toLowerCase() === "devotion")) ||
        (activeFilter === "Meditation" && tags.some((tag) => tag.toLowerCase() === "meditation")) ||
        (activeFilter === "Dharma" && tags.some((tag) => tag.toLowerCase() === "dharma")) ||
        (activeFilter === "Self" && tags.some((tag) => tag.toLowerCase() === "self"));

      const searchableText = `${chapter.name ?? ""} ${chapter.sanskrit ?? ""} ${chapter.description ?? ""} ${chapter.search ?? ""} ${(chapter.tags ?? []).join(" ")}`.toLowerCase();
      const matchesSearch = !query || searchableText.includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, initialChapters, searchValue]);

  return (
    <>
      <div className="relative mx-auto mb-8 max-w-150">
        <input
          type="text"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search chapters..."
          className="h-13 w-full rounded-xl border border-[#dcd5c9] bg-[#fffdf8] px-5 pr-12.5 font-sans text-[14px] text-[#29251f] outline-none transition focus:border-[#aaa092]"
          aria-label="Search chapters"
        />
        <span className="pointer-events-none absolute right-4.5 top-1/2 -translate-y-1/2 text-[24px] text-[#8c8376]">
          ⌕
        </span>
      </div>
    <div className="mb-12.5 flex flex-wrap items-center justify-start gap-x-4 gap-y-2 sm:gap-x-5">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`border-0 bg-transparent p-0 font-serif text-[22px] leading-none transition-all ${
              activeFilter === filter
                ? "font-bold text-[#1d1b19]"
                : "text-[#544f4a] hover:text-[#1d1b19]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-[25px] font-normal text-[#29251f]">{visibleChapters.length} Chapters</h2>
            <div className="mt-1 font-sans text-[12px] text-[#8b8174]">
              Begin anywhere. Every chapter offers a different perspective.
            </div>
          </div>
        </div>

        {visibleChapters.length === 0 ? (
          <div className="rounded-[18px] border border-[#e0d9ce] bg-[#fffdf8] p-10 text-center font-sans text-[#766e63]">
            No chapters match your search. Try another keyword.
          </div>
        ) : (
          <div className="grid gap-4.5 md:grid-cols-2 xl:grid-cols-3">
            {visibleChapters.map((chapter) => {
              const chapterNumber = Number(chapter.number ?? 0);

              return (
                <article
                  key={chapter.number ?? `${chapter.name}-${chapter.sanskrit}`}
                  className="rounded-2xl border border-[#e0d9ce] bg-[#fffdf8] p-6.25 transition duration-200 hover:-translate-y-1 hover:border-[#cfc6b8] hover:shadow-[0_12px_30px_rgba(60,48,32,0.07)]"
                >
                  <div className="mb-3 font-sans text-[11px] uppercase tracking-[1.5px] text-[#9a8e7e]">
                    Chapter {String(chapterNumber).padStart(2, "0")}
                  </div>
                  <div className="mb-1 text-[24px] text-[#29251f]">{chapter.sanskrit || chapter.name}</div>
                  <div className="mb-3 text-[15px] text-[#655e54]">{chapter.name}</div>
                  <p className="min-h-15.5 font-sans text-[13px] leading-6 text-[#81796d]">
                    {chapter.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#ece6dc] pt-3.75">
                    <span className="font-sans text-[11px] text-[#918778]">{chapter.verses} verses</span>
                    <Link
                      href={`/explore/chapter/${chapterNumber}`}
                      className="font-sans text-[12px] text-[#5f574c] transition hover:text-[#29251f]"
                    >
                      Explore →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
       </>
  )
}

export default Chapters