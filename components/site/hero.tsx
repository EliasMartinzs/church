import Image from "next/image";
import { SectionWrapper } from "./section-wrapper";

export const Hero = () => {
  return (
    <SectionWrapper>
      <div className="flex flex-col gap-y-6">
        <h1 className="text-3xl lg:text-6xl font-bebas text-center text-white/70">
          Simplifique a Gestão de Células na Sua Igreja com{" "}
          <span className="text-white">Cramb</span>
        </h1>
        <p className="text-center">
          Organize e lidere células na sua igreja de forma eficiente com o
          Cramb. Com uma interface intuitiva e funcionalidades poderosas, nosso
          app ajuda líderes a focarem no que importa: fortalecer laços, promover
          o crescimento espiritual e impactar vidas.
        </p>
      </div>
      <Image
        src="/devices-site.png"
        width={900}
        height={900}
        alt="devices"
        className="object-contain"
      />
    </SectionWrapper>
  );
};
