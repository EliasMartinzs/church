import { Description } from "@/components/site/description";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { HowItWorks } from "@/components/site/how-it-works";
import { Navbar } from "@/components/site/navbar";
import { SectionWrapper } from "@/components/site/section-wrapper";
import { Separator } from "@/components/ui/separator";

const Home = () => {
  return (
    <main className="w-full min-h-svh relative">
      <div className="w-full h-[600px] background-site absolute top-0 left-0 -z-50 rotate-180 text-white" />
      <div className="pt-10 lg:pt-20 space-y-20">
        <Navbar />

        <Hero />

        <SectionWrapper>
          <Separator className="bg-gradient-to-br to-blue-50 from-blue-700" />
        </SectionWrapper>

        <Description />

        <SectionWrapper>
          <Separator className="bg-gradient-to-br to-blue-50 from-blue-700" />
        </SectionWrapper>

        <HowItWorks />

        <Footer />
      </div>
    </main>
  );
};

export default Home;
