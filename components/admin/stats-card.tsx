import { getDataForDashboardAdmin } from "@/actions/dashboard-admin";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Title } from "../global/title";

async function getData() {
  const data = await getDataForDashboardAdmin();

  return data;
}

export const StatsCard = async () => {
  const data = await getData();

  return (
    <>
      <Title text="Dados Resumidos" />
      <div className="grid grid-cols-2 lg:flex flex-row gap-4">
        {data.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              href={item.href}
              key={index}
              className="rounded-3xl lg:w-1/4 group transition-colors cursor-pointer text-card-foreground hover:dark:border"
            >
              <Card className="rounded-3xl">
                <CardHeader>
                  <CardTitle>
                    <div className="flex items-center gap-x-4">
                      <Icon className="size-10 group-hover:text-muted-foreground text-card-foreground" />
                      <div className="flex flex-col lg:flex-row lg:gap-x-2 text-start text-lg leading-5 group-hover:text-muted-foreground text-card-foreground">
                        {item.title}
                        {item.description && <p>{item.description}</p>}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardFooter className="">
                  <p className="text-7xl group-hover:text-muted-foreground text-card-foreground">
                    {item.total}
                  </p>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
};
