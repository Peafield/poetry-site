type ContentCardProps = {
  content_text: string;
  date?: string;
};

const ContentCard = ({ content_text, date }: ContentCardProps) => {
  const isHTML = (str: string) => {
    return /<[a-z][\s\S]*>/i.test(str);
  };

  const renderContent = () => {
    if (isHTML(content_text)) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: content_text }}
          className="prose-lg prose max-w-none space-y-4 font-lato font-medium leading-relaxed tracking-wide text-black [&>p.text-center]:text-center [&>p.text-right]:text-right [&>p]:text-justify [&>p]:text-lg [&>p]:text-black"
        />
      );
    }

    return (
      <p className="space-y-4 text-justify font-lato font-medium leading-relaxed tracking-wide text-black">
        {content_text}
      </p>
    );
  };

  return (
    <div className="relative flex flex-col rounded-[32px] bg-stone-50 shadow-lg mobile:m-4 mobile:p-16 md:m-8 md:p-32">
      {date && (
        <div className="absolute mobile:right-10 mobile:top-2 md:right-20 md:top-4">
          <h3 className="text-center font-lato font-medium text-black md:text-2xl">
            {date}
          </h3>
        </div>
      )}
      {renderContent()}
    </div>
  );
};

export default ContentCard;
