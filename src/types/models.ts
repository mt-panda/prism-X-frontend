export interface User {
  id: string; // UUID
  username: string;
  email: string;
  password: string; // ⚠️ Never expose on frontend, only backend
  image?: string; // profile picture
  role?: string; // e.g., "admin", "user"

  // Relations
  places?: Place[]; // populated when including relations
  pendings?: Pending[];
}

export interface Pending {
  id: string;
  creator: string; // FK -> User.id
  email?: string;
  userName?: string;
  typeOfChange?: string; // e.g., "update", "delete"

  title: string;
  desc: string;
  address: string;
  image: string;
  slug: string;
  phone: number;
  category: string;
  city: string;
  website: string;
  priceRange: string;
  accountingAndTaxService: string[]; // converted from CSV
  area: string;

  image1: string;
  image2: string;
  image3: string;
  image4: string;

  intro: string;
  mapUrl: string;
  businessLogo: string;
  businessBanner: string;
  region: string;
  aboutUs: string;
  whyUs: string;
  latestProjectIntro: string;
  ourMission: string;
  contactUsIntro: string;

  // Relation
  user?: User;
}

export interface Place {
  id: string;
  creator: string; // FK -> User.id
  email?: string;
  userName?: string;
  typeOfChange?: string;
  featured: boolean;
  title: string;
  desc: string;
  address: string;
  image?: string;
  slug: string;
  phone: string;
  category: string;
  city: string;
  website: string;
  priceRange: string;
  accountingAndTaxService: string[];
  area: string;

  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;

  intro: string;
  mapUrl: string;
  businessLogo?: string;
  businessBanner?: string;
  region: string;
  aboutUs: string;
  whyUs: string;
  latestProjectIntro: string;
  ourMission: string;
  contactUsIntro: string;

  status?: string; // e.g., "active", "inactive"

  // Relation
  user?: User;
}
