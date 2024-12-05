import nlp from "compromise";
import { htmlToText } from "html-to-text";

const getPreviewText = (htmlText: string): string => {
  const text = htmlToText(htmlText || "", {
    wordwrap: false,
  });
  const doc = nlp(text);
  const firstSentence = doc.sentences().first().text();
  const cleanSentence = firstSentence.replace(/[.,!?;:]$/, "");

  return `${cleanSentence}...`;
};

export default getPreviewText;
