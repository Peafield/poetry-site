type HeroSectionProps = {
  children: React.ReactNode;
};

const HeroSection = ({ children }: HeroSectionProps) => {
  return (
    <div className="h-3/5 rounded-b-[32px] bg-secondary inset-0">
      {children}
    </div>
  );
};

export default HeroSection;
