import { ImageRevealListItem } from "@/components/ui/image-reveal-list";
import { BookPage } from "@/components/ui/interactive-book";

export interface Book extends ImageRevealListItem {
  description: string;
  pages: BookPage[];
}

export const books: Book[] = [
  {
    id: "1",
    slug: "the-great-gatsby",
    title: "The Great Gatsby",
    subtitle: "F. Scott Fitzgerald",
    image: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    number: "01",
    description:
      "A timeless novel about wealth, love, and the American Dream in the Roaring Twenties.",
      pages: [
  {
    pageNumber: 1,
    title: "Chapter One",
    content: (
      <>
        <p>
          In my younger and more vulnerable years my father gave me some advice
          that I've been turning over in my mind ever since. He told me that not
          everyone in the world has had the same advantages that I have enjoyed,
          and those words stayed with me throughout my life.
        </p>

        <p className="mt-4">
          Looking back, I realize those simple words shaped the way I observed
          people and the world around me. They taught me to reserve judgment,
          even when appearances seemed obvious.
        </p>
      </>
    ),
  },
  {
    pageNumber: 2,
    title: "West Egg",
    content: (
      <>
        <p>
          I lived in West Egg, the less fashionable of the two villages that
          stretched along the glittering bay. Across the water stood enormous
          mansions that sparkled beneath the afternoon sun.
        </p>

        <p className="mt-4">
          The largest and most mysterious of them all belonged to Jay Gatsby,
          whose lavish estate attracted visitors from every corner of New York
          each weekend.
        </p>
      </>
    ),
  },
  {
    pageNumber: 3,
    title: "A Mysterious Neighbor",
    content: (
      <>
        <p>
          Although countless guests attended Gatsby's extravagant parties, very
          few had actually met the man himself. Rumors surrounded him wherever
          his name was spoken.
        </p>

        <p className="mt-4">
          Some believed he had inherited a vast fortune, while others whispered
          that his wealth came from darker and more dangerous pursuits.
        </p>
      </>
    ),
  },
  {
    pageNumber: 4,
    title: "The First Invitation",
    content: (
      <>
        <p>
          Unlike the hundreds who arrived uninvited, I received a formal
          invitation to one of Gatsby's famous gatherings. Curiosity quickly
          replaced hesitation.
        </p>

        <p className="mt-4">
          As evening settled over the estate, music drifted through the gardens,
          laughter echoed from every direction, and the mansion glowed like a
          palace beneath the stars.
        </p>
      </>
    ),
  },
  {
    pageNumber: 5,
    title: "Meeting Gatsby",
    content: (
      <>
        <p>
          I unexpectedly found myself speaking with a courteous stranger who
          seemed surprisingly humble. Only after several minutes did I realize
          that the man beside me was Gatsby himself.
        </p>

        <p className="mt-4">
          His calm smile and quiet confidence contrasted sharply with the myths
          that surrounded his name.
        </p>
      </>
    ),
  },
  {
    pageNumber: 6,
    title: "The Green Light",
    content: (
      <>
        <p>
          Late one night I noticed Gatsby standing alone at the end of his dock,
          staring silently across the dark water toward a single green light
          shining in the distance.
        </p>

        <p className="mt-4">
          That small light seemed insignificant, yet it carried a meaning that
          only Gatsby truly understood.
        </p>
      </>
    ),
  },
  {
    pageNumber: 7,
    title: "Dreams and Illusions",
    content: (
      <>
        <p>
          As the weeks passed, I learned that Gatsby's wealth, parties, and
          reputation all revolved around one powerful dream that had consumed
          him for years.
        </p>

        <p className="mt-4">
          Every celebration, every guest, and every dazzling display of luxury
          seemed to exist for a single purpose—to bring the past back to life.
        </p>
      </>
    ),
  },
  {
    pageNumber: 8,
    title: "Looking Ahead",
    content: (
      <>
        <p>
          The summer had only just begun, yet I sensed that the lives of
          everyone around me were moving toward an unavoidable turning point.
        </p>

        <p className="mt-4">
          Behind the glittering parties and expensive cars lay hidden truths
          that would eventually change every one of us forever.
        </p>
      </>
    ),
  },
]
   
  },

  {
    id: "2",
    slug: "1984",
    title: "1984",
    subtitle: "George Orwell",
    image: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    number: "02",
    description:
      "A dystopian novel about surveillance, censorship, and totalitarianism.",
    pages: [
      {
        pageNumber: 1,
        title: "Chapter One",
        content: <>It was a bright cold day in April...</>,
      },
      {
        pageNumber: 2,
        title: "Big Brother",
        content: <>BIG BROTHER IS WATCHING YOU.</>,
      },
    ],
  },

  {
    id: "3",
    slug: "to-kill-a-mockingbird",
    title: "To Kill a Mockingbird",
    subtitle: "Harper Lee",
    image: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
    number: "03",
    description:
      "A powerful story about justice, prejudice, and childhood in the American South.",
    pages: [
      {
        pageNumber: 1,
        title: "Maycomb",
        content: <>When he was nearly thirteen, my brother Jem...</>,
      },
      {
        pageNumber: 2,
        title: "The Finch Family",
        content: <>Atticus Finch believed in justice for everyone...</>,
      },
    ],
  },

  {
    id: "4",
    slug: "the-hobbit",
    title: "The Hobbit",
    subtitle: "J.R.R. Tolkien",
    image: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
    number: "04",
    description:
      "Bilbo Baggins embarks on an unforgettable adventure with a company of dwarves.",
    pages: [
      {
        pageNumber: 1,
        title: "An Unexpected Party",
        content: <>In a hole in the ground there lived a hobbit...</>,
      },
      {
        pageNumber: 2,
        title: "The Journey Begins",
        content: <>Bilbo soon found himself leaving the Shire...</>,
      },
    ],
  },

  {
    id: "5",
    slug: "pride-and-prejudice",
    title: "Pride and Prejudice",
    subtitle: "Jane Austen",
    image: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
    number: "05",
    description:
      "A beloved romance exploring love, class, and first impressions.",
    pages: [
      {
        pageNumber: 1,
        title: "The Bennets",
        content: <>It is a truth universally acknowledged...</>,
      },
      {
        pageNumber: 2,
        title: "Mr. Darcy",
        content: <>Elizabeth found Mr. Darcy rather proud...</>,
      },
    ],
  },

  {
    id: "6",
    slug: "the-catcher-in-the-rye",
    title: "The Catcher in the Rye",
    subtitle: "J.D. Salinger",
    image: "https://covers.openlibrary.org/b/isbn/9780316769488-L.jpg",
    number: "06",
    description:
      "The coming-of-age story of Holden Caulfield as he struggles with growing up.",
    pages: [
      {
        pageNumber: 1,
        title: "Pencey Prep",
        content: <>If you really want to hear about it...</>,
      },
      {
        pageNumber: 2,
        title: "Leaving School",
        content: <>Holden decided it was finally time to leave...</>,
      },
    ],
  },

  {
    id: "7",
    slug: "the-alchemist",
    title: "The Alchemist",
    subtitle: "Paulo Coelho",
    image: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
    number: "07",
    description:
      "A philosophical novel about following your dreams and discovering your destiny.",
    pages: [
      {
        pageNumber: 1,
        title: "The Shepherd",
        content: <>The boy's name was Santiago...</>,
      },
      {
        pageNumber: 2,
        title: "The Dream",
        content: <>He believed his recurring dream held a message...</>,
      },
    ],
  },

  {
    id: "8",
    slug: "harry-potter-and-the-sorcerers-stone",
    title: "Harry Potter and the Sorcerer's Stone",
    subtitle: "J.K. Rowling",
    image: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
    number: "08",
    description:
      "Harry discovers he is a wizard and begins his magical journey at Hogwarts.",
    pages: [
      {
        pageNumber: 1,
        title: "The Boy Who Lived",
        content: <>Mr. and Mrs. Dursley were proud to say...</>,
      },
      {
        pageNumber: 2,
        title: "Letters",
        content: <>Strange letters began arriving for Harry...</>,
      },
    ],
  },
];