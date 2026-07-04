import { notFound } from "next/navigation";
import { books } from "@/app/data/books";
import InteractiveBook from "@/components/ui/interactive-book";

interface SingleBookPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const SingleBookPage = async ({ params }: SingleBookPageProps) => {
  const { slug } = await params;

  const book = books.find((book) => book.slug === slug);

  if (!book) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto py-20 overflow-x-hidden">
      <h1 className="text-4xl font-bold">{book.title}</h1>
      <p className="text-gray-500">{book.subtitle}</p>
      <InteractiveBook
  coverImage={book.image}
  bookTitle={book.title}
  bookAuthor={book.subtitle}
  pages={book.pages}
/>
    </div>
  );
};

export default SingleBookPage;