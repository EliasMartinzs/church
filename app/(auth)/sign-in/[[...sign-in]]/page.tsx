import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { PiChurchThin } from "react-icons/pi";

export default function Page() {
  return (
    <Suspense fallback={<Loader2 className="size-10 animate-spin" />}>
      <div className="h-svh lg:grid grid-cols-2 place-items-center bg-white text-black">
        <div className="w-full h-full bg-primary text-white shadow-3xl max-lg:hidden">
          <div className="w-full h-full flex items-center justify-center flex-col gap-y-10 p-10 relative">
            <div className="w-full text-center flex items-center justify-center mb-10 -mt-10 flex-col ">
              <PiChurchThin className="text-white size-36 -mb-4" />
              <h6 className="font-black text-4xl">Cramb</h6>
            </div>
            <div>
              <h4 className="text-2xl font-bold italic">
                Bem-vindo à ferramenta que aproxima a sua comunidade!
              </h4>
              <p className="font-extralight italic">
                Gerencie suas células, organize eventos e acompanhe os membros
                da sua igreja com facilidade. Um só lugar para unir e fortalecer
                a fé.
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-bold italic">
                Sua igreja mais conectada do que nunca.
              </h4>
              <p className="font-extralight italic">
                Gerencie células, membros e secretários com simplicidade e
                eficiência. Tudo o que você precisa para servir e organizar a
                sua comunidade em um único app.
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-bold italic">
                Organize, cuide e inspire sua comunidade.
              </h4>
              <p className="font-extralight italic">
                Acompanhe o crescimento das células, faça pedidos de oração e
                mantenha todos os ministérios alinhados. Facilite a gestão da
                sua igreja com amor e propósito.
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-bold italic">
                Sua igreja no controle, sua fé em ação.
              </h4>
              <p className="font-extralight italic">
                Gerencie células, organize eventos e conecte sua comunidade de
                forma eficiente. Um lugar onde a gestão pastoral encontra a
                tecnologia.
              </p>
            </div>

            <div className="absolute bottom-10 left-10 text-sm text-muted-foreground">
              © ${new Date().getFullYear()} Cramb. Todos os direitos reservados.
              Ao se cadastrar, você concorda com nossos Termos de Uso e Política
              de Privacidade
            </div>
          </div>
        </div>

        <div className="w-full h-full flex flex-col items-center justify-center gap-y-6">
          <ClerkLoading>
            <div className="w-full text-center flex items-center justify-center mb-10 -mt-10 flex-col">
              <PiChurchThin className="text-black size-36 -mb-4" />
              <h6 className="font-black text-4xl">Cramb</h6>
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <div className="w-full text-center flex items-center justify-center mb-10 -mt-10 flex-col">
              <PiChurchThin className="text-black size-36 -mb-4" />
              <h6 className="font-black text-4xl">Cramb</h6>
            </div>
            <SignIn />
          </ClerkLoaded>
        </div>
      </div>
    </Suspense>
  );
}
