export interface CuratedProps {
  title: string;
  description: string[];
  images: string[];
}

export interface FaqProps {
  title: string;
  img: string;
  items: {
    question: string;
    answer: string;
  }[];
}
