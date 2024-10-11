import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function Page() {
  return (
    <div className="w-screen h-svh flex items-center justify-center">
      <div className="w-full h-[400px] background-site absolute top-0 left-0 -z-50 rotate-180" />
      <ClerkLoading>
        <Loader2 className="size-10 animate-spin text-blue-500" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignUp
          fallbackRedirectUrl="/admin"
          appearance={{
            elements: {
              button: {
                backgroundColor: "#2563EB",
                borderColor: "#2563EB",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#2563EB",
                },
              },
            },
          }}
        />
      </ClerkLoaded>
      <div className="w-full h-[400px] background-site absolute bottom-0 left-0 -z-50" />
    </div>
  );
}