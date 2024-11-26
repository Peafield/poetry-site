import { ABOUT_ME_TEXT } from "@/app/constants/constants";
import HeroSection from "./HeroSection";
import Image from "next/image";

const About = () => {
  return (
    <>
      <HeroSection className="flex items-center justify-center">
        <div className="grid grid-cols-2 mobile:gap-x-4 md:gap-x-8">
          <div className="flex size-full items-center justify-center">
            <h1 className="text-center font-bold mobile:text-4xl md:text-6xl">
              About Me
            </h1>
          </div>
          <div className="relative size-full">
            <div className="relative aspect-square mobile:w-48 md:w-56">
              <Image
                src="/profile-pic.jpeg"
                alt="Image of me"
                placeholder="blur"
                blurDataURL="/profile-pic.jpeg"
                priority
                fill
                sizes="100%"
                className="rounded-full object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </HeroSection>
      <div className="relative flex flex-col items-center justify-center rounded-[32px] bg-white shadow-inner-lg mobile:m-4 mobile:p-16 md:m-8 md:p-32">
        <div className="space-y-4 text-justify font-lato font-medium leading-relaxed tracking-wide text-black md:text-2xl">
          {ABOUT_ME_TEXT.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
