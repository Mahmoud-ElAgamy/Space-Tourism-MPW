"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Tabs, Spin } from "antd";
import { motion } from "framer-motion";
import { techData } from "@/app/technology/data";
import { fadeIn } from "@/utils/motionVariants";
import { slideIn } from "@/utils/motionVariants";

function TechContent() {
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setIsInitialLoad(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const onTabChange = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };

  const tabItems = techData.map((tech, index) => ({
    label: index + 1,
    key: index.toString(),
    children: loading ? (
      <div className="flex min-h-[760px] items-center justify-center md:min-h-[644px] lg:min-h-[448px]">
        <Spin size="large" />
      </div>
    ) : (
      <>
        {!loading && (
          <motion.div
            key={index}
            className="flex h-screen flex-row-reverse flex-wrap items-center justify-center md:h-[644px] lg:h-[448px] lg:justify-between"
            variants={fadeIn()}
            initial="hidden"
            animate="visible"
          >
            {/* Left Side: Tech Image */}
            <motion.picture variants={fadeIn(0.8, 1)} className="mb-8 lg:mb-0">
              <source srcSet={tech.images.portrait} type="image/webp" />
              <Image
                src={tech.images.portrait}
                alt={tech.name}
                width={400}
                height={400}
                priority
                className="rounded shadow-lg"
              />
            </motion.picture>

            {/* Right Side: Tab Content */}
            <motion.div
              variants={slideIn("left", 0, 0.6, 50)}
              className="mb-4 max-w-2xl lg:mb-0"
            >
              <h2 className="mb-2 font-headings text-3xl font-bold uppercase tracking-widest text-[#D0D6F9] lg:text-6xl">
                {tech.name}
              </h2>

              {/* Description */}
              <p className="mt-4 font-headings text-lg text-[#D0D6F9] lg:text-xl">
                {tech.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </>
    ),
  }));

  return (
    <motion.article className="tech-content">
      {isInitialLoad ? (
        <div className="loading-indicator flex min-h-screen items-start justify-center md:min-h-[700px] md:items-center lg:min-h-[503px]">
          <Spin size="large" />
        </div>
      ) : (
        <Tabs
          defaultActiveKey="0"
          centered
          items={tabItems}
          onChange={onTabChange}
          type="card"
        />
      )}
    </motion.article>
  );
}

export default TechContent;
