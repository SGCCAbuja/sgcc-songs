export type Hymn = {
  id: number;
  title: string;
  authors: string[];
  year?: number;
  verses: {
    type: string;
    number: number;
    content: string;
  }[];
  note?: string;
};
