type ContentCardProps = {
  content_text: string | string[];
  date?: string;
};

const ContentCard = ({ content_text, date }: ContentCardProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center rounded-[32px] bg-stone-50 shadow-lg mobile:m-4 mobile:p-16 md:m-8 md:p-32">
      {date && (
        <div className="absolute mobile:right-10 mobile:top-2 md:right-20 md:top-4">
          <h3 className="text-center font-lato font-medium text-black md:text-2xl">
            {date}
          </h3>
        </div>
      )}
      <p className="space-y-4 text-justify font-lato font-medium leading-relaxed tracking-wide text-black md:text-2xl">
        {content_text}
      </p>
    </div>
  );
};

export default ContentCard;
