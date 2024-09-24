import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { IconType } from "react-icons/lib";

type Props = {
  href: string;
  icon: IconType;
  name: string;
};

export const RedirectButton = ({ href, icon, name }: Props) => {
  const Icon = icon;

  return (
    <Link href={href}>
      <div className="hover:border rounded-3xl group transition-colors cursor-pointer">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-x-4 text-muted-foreground">
                <Icon className="size-10 group-hover:text-foreground" />
                <div className="flex flex-col lg:flex-row lg:gap-x-2 text-start text-lg leading-5 group-hover:text-foreground">
                  {name}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </Link>
  );
};
