import Link from 'next/link'
import { paths } from '../utils/utils'

const ThreePath = () => {
  return (
    <section className="mx-auto max-w-280 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-3 font-sans text-[10px] uppercase tracking-[2.5px] text-[#9a8d7c]">
            Discover the Gita
          </div>
          <h2 className="text-[31px] font-normal text-[#29251f] sm:text-[36px]">
            Three ways to begin
          </h2>
          <p className="mx-auto mt-3 max-w-125 font-sans text-[13px] leading-6 text-[#81786d]">
            Read its verses, learn its teachings, or bring your own
            questions to the conversation.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {paths.map((path) => (
            <Link
              key={path.number}
              href={path.href}
              className="group rounded-2xl border border-[#e0d9ce] bg-[#fffdf8] p-7 transition duration-200 hover:-translate-y-1 hover:border-[#cfc6b8] hover:shadow-[0_12px_30px_rgba(60,48,32,0.06)]"
            >
              <div className="mb-12 font-sans text-[10px] tracking-[1.5px] text-[#a09382]">
                {path.number}
              </div>

              <h3 className="mb-2 text-[25px] font-normal text-[#29251f]">
                {path.title}
              </h3>

              <p className="min-h-12.5 font-sans text-[13px] leading-6 text-[#81786d]">
                {path.description}
              </p>

              <div className="mt-7 border-t border-[#ece6dc] pt-4 font-sans text-[12px] text-[#62594e]">
                {path.action}
                <span className="ml-1 transition group-hover:ml-2">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
  )
}

export default ThreePath