export interface Book {
  id: string;
  title: string;
  author: string;
}

export interface Query {
  books: Book[];
}
