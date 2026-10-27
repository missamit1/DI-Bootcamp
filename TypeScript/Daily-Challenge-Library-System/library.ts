interface Book {
  title: string;
  author: string;
  readonly isbn: string;
  publishedYear: number;
  genre?: string;
}

class Library {
  private books: Book[] = [];

  public addBook(book: Book): void {
    this.books.push({ ...book });
  }

  public getBookDetails(isbn: string): Book | undefined {
    const book = this.books.find(book => book.isbn === isbn);
    return book ? { ...book } : undefined;
  }

  protected getBooks(): Book[] {
    return this.books.map(book => ({ ...book }));
  }
}

class DigitalLibrary extends Library {
  public readonly website: string;

  constructor(website: string) {
    super();
    this.website = website;
  }

  public listBooks(): string[] {
    return this.getBooks().map(book => book.title);
  }
}

const library = new DigitalLibrary("https://library.example.com");

library.addBook({
  title: "The Hobbit",
  author: "J. R. R. Tolkien",
  isbn: "9780547928227",
  publishedYear: 1937,
  genre: "Fantasy",
});

library.addBook({
  title: "Pride and Prejudice",
  author: "Jane Austen",
  isbn: "9780141439518",
  publishedYear: 1813,
});

console.log(library.website);
console.log(library.getBookDetails("9780547928227"));
console.log(library.getBookDetails("9780141439518"));
console.log(library.listBooks());
