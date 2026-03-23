import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CodeExample from '@/components/CodeExample';
import SDKSection from '@/components/SDKSection';
import VideoBlock from '@/components/VideoBlock';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Features />
        <CodeExample />
        <SDKSection />
        <VideoBlock />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
