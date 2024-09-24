"use client";

import { onboardingSteps } from "@/constants";
import { SectionWrapper } from "./section-wrapper";
import { motion } from "framer-motion";

const StepItem = ({
  step,
  title,
  description,
  invert,
}: {
  step: number;
  title: string;
  description: string;
  invert: boolean;
}) => {
  return (
    <motion.div
      className={`relative flex flex-col gap-5 items-center justify-center p-6 rounded-3xl shadow-3xl
        ${invert ? "lg:flex-row-reverse" : "lg:flex-row"} 
        ${invert ? "lg:ml-auto" : "lg:mr-auto"}
        lg:w-3/4 bg-white`}
      initial={{ opacity: 0, x: invert ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-center size-12 rounded-full max-lg:bg-gradient-to-r from-blue-500 to-green-500 text-white text-lg font-bold lg:text-blue-500 lg:text-5xl">
        {step}
      </div>
      <div className="text-section ml-0 lg:ml-6 lg:mt-0 text-center lg:text-left">
        <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
        <small className="text-gray-600 mt-2">{description}</small>
      </div>
    </motion.div>
  );
};

export const HowItWorks = () => {
  return (
    <SectionWrapper className="space-y-6 overflow-hidden">
      <h4 className="text-3xl lg:text-6xl font-bebas text-center text-black/80">
        Como Funciona
      </h4>

      <div className="flex flex-col items-center w-full px-4 gap-8 pb-10">
        {onboardingSteps.map((step, index) => (
          <StepItem
            key={index}
            step={step.step}
            title={step.title}
            description={step.description}
            invert={index % 2 === 1}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};
