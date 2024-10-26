"use client";

import { cardSiteInfos } from "@/constants";
import { SectionWrapper } from "./section-wrapper";
import { IconType } from "react-icons/lib";
import { motion } from "framer-motion";

const Card = ({
  title,
  description,
  icon,
  invert,
}: {
  title: string;
  description: string;
  icon: IconType;
  invert: boolean;
}) => {
  const Icon = icon;
  return (
    <motion.div
      className={`relative p-4 shadow-3xl rounded-3xl cursor-pointer bg-white text-[#242529]`}
      initial={{ opacity: 0, x: invert ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-start gap-x-3">
          <Icon className="size-8 text-blue-500" />{" "}
          <small className="font-light">{title}</small>
        </div>

        <small className="text-muted-foreground">{description}</small>
      </div>
    </motion.div>
  );
};

export const Description = () => {
  return (
    <SectionWrapper className="space-y-6 overflow-hidden">
      <h4 className="text-3xl lg:text-6xl font-bebas text-center text-white/70">
        Funcionalidades
      </h4>

      <div className="flex flex-col lg:grid grid-cols-3 gap-8 p-5">
        {cardSiteInfos.map(({ title, description, icon }, i) => (
          <Card
            title={title}
            description={description}
            icon={icon}
            key={i}
            invert={i % 2 === 1}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};
