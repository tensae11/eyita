// Movie Posters for Background
export const moviePosters = [
  { id: 1, title: "CHERRY", image: "/images/cherry.png", position: "top-10 left-5 rotate-12" },
  { id: 2, title: "TRIGGERED", image: "/images/triggered.png", position: "top-20 right-8 -rotate-6" },
  { id: 3, title: "OBLIVION", image: "/images/oblivion.png", position: "top-32 left-1/4 rotate-3" },
  {
    id: 4,
    title: "THE FANATIC",
    image: "/images/fanatic.png",
    position: "top-40 right-1/4 -rotate-12",
  },
  { id: 5, title: "THE MARTIAN", image: "/images/martian.png", position: "top-52 left-12 rotate-6" },
  {
    id: 6,
    title: "POPEYE",
    image: "/images/popeye.png",
    position: "top-64 right-16 -rotate-3",
  },
]

// Advertisement Cards
export const ads = [
  {
    id: 1,
    title: "Marvel's New Universe",
    subtitle: "Experience the future of entertainment",
    image: "/images/cherry.png",
    gradient: "from-purple-600 to-blue-600",
  },
  {
    id: 2,
    title: "Sci-Fi Collection",
    subtitle: "Journey beyond imagination",
    image: "/images/oblivion.png",
    gradient: "from-cyan-500 to-purple-600",
  },
  {
    id: 3,
    title: "Action Blockbusters",
    subtitle: "Adrenaline-pumping adventures",
    image: "/images/triggered.png",
    gradient: "from-orange-500 to-red-600",
  },
]

// Categories for Category Page
export const categories = [
  { id: "romance", name: "Romance", highlighted: false },
  { id: "action", name: "Action", highlighted: true },
  { id: "scifi", name: "Science fiction", highlighted: true },
  { id: "comedy", name: "Comedy", highlighted: false },
  { id: "drama", name: "Drama", highlighted: false },
  { id: "fantasy", name: "Fantasy", highlighted: false },
  { id: "western", name: "Western", highlighted: false },
  { id: "horror", name: "Horror", highlighted: false },
  { id: "mystery", name: "Mystery", highlighted: false },
  { id: "thriller", name: "Thriller", highlighted: true },
]

// Categories for Home Page
export const homeCategories = [
  { id: "movie", name: "Movies", icon: "🎬" },
  { id: "tv", name: "TV Shows", icon: "📺" },
  { id: "sport", name: "Sports", icon: "⚽" },
  { id: "documentary", name: "Documentaries", icon: "🎥" },
]

// Movies Data
export const movies = [
  {
    id: 1,
    title: "Cherry",
    year: "2021",
    rating: "6.5",
    image: "/images/cherry.png",
    genre: "Drama",
  },
  {
    id: 2,
    title: "Triggered",
    year: "2020",
    rating: "5.3",
    image: "/images/triggered.png",
    genre: "Thriller",
  },
  {
    id: 3,
    title: "Oblivion",
    year: "2013",
    rating: "7.0",
    image: "/images/oblivion.png",
    genre: "Sci-Fi",
  },
  {
    id: 4,
    title: "The Fanatic",
    year: "2019",
    rating: "4.3",
    image: "/images/fanatic.png",
    genre: "Thriller",
  },
]

// Movie Detail Data
export const movieData = {
  id: 3,
  title: "Oblivion",
  year: "2013",
  rating: "7.0",
  image: "/images/oblivion.png",
  genre: "Sci-Fi",
  description:
    "A veteran assigned to extract Earth's remaining resources begins to question what he knows about his mission and himself.",
}

// Related Movies
export const relatedMovies = [
  { id: 1, title: "Cherry", image: "/images/cherry.png" },
  { id: 2, title: "Triggered", image: "/images/triggered.png" },
  { id: 4, title: "The Fanatic", image: "/images/fanatic.png" },
  { id: 5, title: "The Martian", image: "/images/martian.png" },
]

// Social Media Platforms
export const socialPlatforms = [
  { id: "facebook", name: "Facebook", icon: "📘", color: "bg-blue-600" },
  { id: "twitter", name: "Twitter", icon: "🐦", color: "bg-sky-500" },
  { id: "whatsapp", name: "WhatsApp", icon: "💬", color: "bg-green-500" },
  { id: "telegram", name: "Telegram", icon: "✈️", color: "bg-blue-500" },
  { id: "linkedin", name: "LinkedIn", icon: "💼", color: "bg-blue-700" },
  { id: "reddit", name: "Reddit", icon: "🤖", color: "bg-orange-600" },
]
