import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type SearchResult = {
  _index: string;
  _id: string;
  _score: number;
  _ignored?: string[];
  _source: {
      title: string;
      ingredients: string;
      time: number;
      cook: string;
      images: string;
  };
};