import { AboutSection } from '@/components/about-section'
import { BookingSection } from '@/components/booking-section'
import { FeaturesSection } from '@/components/features-section'
import { Flourish, HeroSection } from '@/components/hero-section'
import { PortfolioSection } from '@/components/portfolio-section'
import { RevealObserver } from '@/components/reveal-observer'
import { ServicesSection } from '@/components/services-section'
import { SiteFooter, WhatsAppFloat } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function Page() {
  return (
    <>
      <RevealObserver />
      <SiteHeader />
      <HeroSection />
      <Flourish variant={1} />
      <AboutSection />
      <ServicesSection />
      <FeaturesSection />
      <PortfolioSection />
      <Flourish variant={2} />
      <BookingSection />
      <SiteFooter />
      <WhatsAppFloat />
    </>
  )
}
