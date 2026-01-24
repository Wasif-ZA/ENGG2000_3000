"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight, FiCpu, FiActivity, FiServer } from "react-icons/fi";

// Props Interface
interface ContentPagesProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  description: string;
  buttonText: string;
  extraText?: string;
  href?: string;
  icon?: React.ElementType;
}

interface ServicesContentProps {
  title: string;
  contentData: ContentPagesProps[];
}

const IMG_PADDING = 12;

const ServicesContent: React.FC<ServicesContentProps> = ({ title, contentData }) => {
  return (
    <section className="bg-neutral-950 font-sans">
      {/* Section Title */}
      <div className="py-20 px-4 text-center">
        <h2 className="text-cyan-500 font-mono text-sm tracking-widest uppercase mb-4">
          // System Architecture
        </h2>
        <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
          {title}
        </h1>
      </div>

      <div className="container mx-auto">
        {contentData.map((content, index) => (
          <TextParallaxContent key={index} {...content} />
        ))}
      </div>
    </section>
  );
};

const TextParallaxContent: React.FC<ContentPagesProps> = ({
  imgUrl,
  subheading,
  heading,
  description,
  buttonText,
  extraText,
  href,
  icon: Icon
}) => {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      <ExampleContent
        description={description}
        buttonText={buttonText}
        extraText={extraText}
        href={href}
        icon={Icon}
      />
    </div>
  );
};

const StickyImage: React.FC<{ imgUrl: string }> = ({ imgUrl }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-xl border border-white/10"
    >
      <motion.div className="absolute inset-0 bg-black/60" style={{ opacity }} />
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />
    </motion.div>
  );
};

const OverlayCopy: React.FC<{ subheading: string; heading: string }> = ({ subheading, heading }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <div className="bg-black/60 backdrop-blur-md p-8 border border-white/10 rounded-lg">
        <p className="mb-2 text-center text-cyan-400 font-mono text-sm tracking-widest uppercase">{subheading}</p>
        <p className="text-center text-4xl font-bold md:text-6xl uppercase tracking-tighter">{heading}</p>
      </div>
    </motion.div>
  );
};

const ExampleContent: React.FC<Pick<ContentPagesProps, "description" | "buttonText" | "extraText" | "href" | "icon">> = ({
  description,
  buttonText,
  extraText,
  href,
  icon: Icon
}) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12 text-gray-300">
    <div className="col-span-1 md:col-span-4">
      <h2 className="text-2xl font-bold text-white mb-4">{extraText}</h2>
      {Icon && <Icon className="text-cyan-500 text-5xl mb-4" />}
      <div className="h-1 w-12 bg-cyan-600 rounded-full" />
    </div>

    <div className="col-span-1 md:col-span-8">
      <p className="mb-8 text-lg text-gray-400 leading-relaxed border-l-2 border-cyan-900/50 pl-6">
        {description}
      </p>
      <a
        href={href || "#"}
        className="group inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 text-cyan-400 font-mono text-sm uppercase tracking-wider transition-all hover:bg-cyan-500 hover:text-black"
      >
        {buttonText} <FiArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  </div>
);

export default ServicesContent;
