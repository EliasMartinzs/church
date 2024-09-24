import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  text: string;
  href?: string;
};

export const Title = ({ text, href }: Props) => {
  return (
    <div className="flex items-center gap-x-3">
      {href && (
        <Link href={href}>
          <ChevronLeft className="size-10" />
        </Link>
      )}

      <h3 className="text-2xl font-semibold">{text}</h3>
    </div>
  );
};
