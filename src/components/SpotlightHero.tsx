import { Spotlight } from '@/components/ui/spotlight-new'

export function SpotlightHero() {
  return (
    <div className="h-screen w-screen fixed inset-0 flex flex-col justify-start bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-hidden">
      <Spotlight />
      <div className="px-4 py-8 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto relative z-10 w-full pt-[33vh]">
        <h1
          className="name-title text-5xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mt-2 sm:mt-4 md:mt-8"
          style={{ fontFamily: '"Italiana", sans-serif' }}
        >
          phil willis
        </h1>

        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mt-3 sm:mt-4 md:mt-6">
          Software Engineer
        </h2>

        <p className="mt-3 sm:mt-4 md:mt-6 font-normal text-sm sm:text-sm md:text-base lg:text-lg text-neutral-500 max-w-full sm:max-w-md md:max-w-xl lg:max-w-2xl text-center mx-auto leading-relaxed">
          Building elegant solutions to complex problems. Passionate about clean
          code, scalable architecture, and creating exceptional user
          experiences.
        </p>
      </div>
    </div>
  )
}
