export type SongType = {
  id: number;
  title: string;
  authors: string[];
  year?: number | null;
  verses: {
    type: string;
    number: number;
    content: string;
  }[];
  note?: string;
};
