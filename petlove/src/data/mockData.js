export const mockNews = [
  {
    id: 1,
    title: "New Pet Adoption Center Opens in Istanbul",
    description:
      "A state-of-the-art facility dedicated to finding homes for abandoned pets has opened its doors.",
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop",
    date: "2024-08-25",
    url: "https://example.com/news/1",
  },
  {
    id: 2,
    title: "Pet Care Tips for Summer Weather",
    description:
      "Essential advice for keeping your furry friends safe and comfortable during hot weather.",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    date: "2024-08-23",
    url: "https://example.com/news/2",
  },
  {
    id: 3,
    title: "Vaccination Drive for Street Animals",
    description:
      "Local veterinarians organize free vaccination program for stray cats and dogs.",
    image:
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=400&h=300&fit=crop",
    date: "2024-08-20",
    url: "https://example.com/news/3",
  },
  {
    id: 4,
    title: "New Pet Park Opens in Kadıköy",
    description:
      "A beautiful new space for pets and their owners to socialize and play.",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop",
    date: "2024-08-18",
    url: "https://example.com/news/4",
  },
  {
    id: 5,
    title: "Pet Adoption Success Stories",
    description:
      "Heartwarming tales of pets finding their forever homes through our platform.",
    image:
      "https://images.unsplash.com/photo-1601758064863-1bb5e4f8be1b?w=400&h=300&fit=crop",
    date: "2024-08-15",
    url: "https://example.com/news/5",
  },
];

export const mockNotices = [
  {
    id: 1,
    title: "Adorable Golden Retriever",
    name: "Buddy",
    birthday: "2022-03-15",
    sex: "Male",
    species: "Dog",
    category: "sell",
    comment: "Friendly and well-trained family dog, great with kids",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
    popularity: 4.8,
    price: 1500,
    location: "Istanbul",
    isFavorite: false,
  },
  {
    id: 2,
    title: "Beautiful Persian Cat",
    name: "Luna",
    birthday: "2021-07-08",
    sex: "Female",
    species: "Cat",
    category: "lost-found",
    comment: "Lost near Taksim Square, very gentle and loves cuddles",
    image:
      "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400&h=300&fit=crop",
    popularity: 4.5,
    price: 0,
    location: "Istanbul",
    isFavorite: true,
  },
  {
    id: 3,
    title: "Playful Beagle",
    name: "Max",
    birthday: "2023-01-20",
    sex: "Male",
    species: "Dog",
    category: "in-good-hands",
    comment: "Energetic puppy looking for an active family",
    image:
      "https://images.unsplash.com/photo-1544944194-28e3b0f6c24b?w=400&h=300&fit=crop",
    popularity: 4.7,
    price: 0,
    location: "Ankara",
    isFavorite: false,
  },
  {
    id: 4,
    title: "Sweet Tabby Cat",
    name: "Whiskers",
    birthday: "2022-09-12",
    sex: "Female",
    species: "Cat",
    category: "sell",
    comment: "Indoor cat, very calm and perfect for apartments",
    image:
      "https://images.unsplash.com/photo-1559235038-1b0fadf76f78?w=400&h=300&fit=crop",
    popularity: 4.3,
    price: 800,
    location: "Izmir",
    isFavorite: false,
  },
  {
    id: 5,
    title: "Colorful Parrot",
    name: "Rainbow",
    birthday: "2020-05-30",
    sex: "Male",
    species: "Bird",
    category: "sell",
    comment: "Talks and sings beautifully, needs experienced owner",
    image:
      "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&h=300&fit=crop",
    popularity: 4.1,
    price: 2000,
    location: "Istanbul",
    isFavorite: true,
  },
];

export const mockFriends = [
  {
    id: 1,
    title: "Happy Paws Veterinary Clinic",
    address: "Beyoğlu, Istanbul",
    email: "info@happypaws.com",
    phone: "+90 212 555 0123",
    workDays: [
      { isOpen: true, from: "08:00", to: "18:00" },
      { isOpen: true, from: "08:00", to: "18:00" },
      { isOpen: true, from: "08:00", to: "18:00" },
      { isOpen: true, from: "08:00", to: "18:00" },
      { isOpen: true, from: "08:00", to: "18:00" },
      { isOpen: true, from: "09:00", to: "15:00" },
      { isOpen: false },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    title: "Pet Paradise Store",
    address: "Kadıköy, Istanbul",
    email: "contact@petparadise.com",
    phone: "+90 216 555 0456",
    workDays: [
      { isOpen: true, from: "09:00", to: "19:00" },
      { isOpen: true, from: "09:00", to: "19:00" },
      { isOpen: true, from: "09:00", to: "19:00" },
      { isOpen: true, from: "09:00", to: "19:00" },
      { isOpen: true, from: "09:00", to: "19:00" },
      { isOpen: true, from: "10:00", to: "17:00" },
      { isOpen: true, from: "10:00", to: "17:00" },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1601758064863-1bb5e4f8be1b?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    title: "Animal Shelter Istanbul",
    address: "Şişli, Istanbul",
    email: "help@animalshelter.org",
    phone: "+90 212 555 0789",
    workDays: [
      { isOpen: true, from: "08:00", to: "17:00" },
      { isOpen: true, from: "08:00", to: "17:00" },
      { isOpen: true, from: "08:00", to: "17:00" },
      { isOpen: true, from: "08:00", to: "17:00" },
      { isOpen: true, from: "08:00", to: "17:00" },
      { isOpen: true, from: "09:00", to: "16:00" },
      { isOpen: false },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=100&h=100&fit=crop",
  },
];

export const categories = ["sell", "lost-found", "in-good-hands"];
export const sexOptions = ["Male", "Female"];
export const speciesOptions = ["Dog", "Cat", "Bird", "Rabbit"];
export const cities = ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"];
