import clsx from "clsx";

type ContentCardProps = {
  content: string;
  date?: string;
  className?: string;
};

const ContentCard = ({ content, date, className }: ContentCardProps) => {
  const isHTML = (str: string) => {
    return /<[a-z][\s\S]*>/i.test(str);
  };

  const renderContent = () => {
    if (isHTML(content)) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="mt-8 h-full max-w-full break-words p-8 font-lato font-medium focus:outline-primary/35"
        />
      );
    }

    return (
      <p className="mt-8 h-full max-w-full break-words p-8 font-lato font-medium focus:outline-primary/35">
        {content}
      </p>
    );
  };

  return (
    <div
      className={clsx(
        "relative w-full flex-1 overflow-hidden rounded bg-stone-50 shadow-lg [&_.ProseMirror]:whitespace-pre-wrap [&_.ProseMirror]:break-words",
        className
      )}
    >
      {date && (
        <div className="absolute mobile:right-10 mobile:top-2 md:right-20 md:top-4">
          <h3 className="text-center font-lato font-medium text-black md:text-xl">
            {date}
          </h3>
        </div>
      )}
      {renderContent()}
    </div>
  );
};

export default ContentCard;
