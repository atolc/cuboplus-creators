import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/HeroSection'
import { CreatorGrid } from '@/components/CreatorGrid'

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CreatorGrid />
      </main>
      <Footer />
    </div>
  )
}
