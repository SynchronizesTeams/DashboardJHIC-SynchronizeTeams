export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  no_induk: string;
  name: string;
  email: string;
  role: string;
  photo_url: string;
  phone: string;
  alamat: string;
  jabatan: string;
  tahun_ajaran_mulai: string;
  user_links: any | null;
  news: any | null;
  Post: any | null;
  Replies: any | null;
}

export interface Author {
  id: number;
  name: string;
}

export interface Tag {
  ID?: number;
  name: string;
}

export interface News {
  id?: number;
  title: string;
  excerpt: string;
  content?: string;
  status: string;
  thumbnail?: File | string;
  tags: string[];
  author?: Author;
  slug?: string;
  created_at?: string;
}

export interface Mading {
  id: number;
  title: string;
  description: string;
  category: string;
  start_date: string;
  end_date: string;
  location: string;
  organizer: string;
  visibility: "public" | "private";
  image: string;
  created_at: string;
  updated_at?: string;
  imageUrl?: string;
}

export interface MadingForm {
  title: string;
  description: string;
  category: string;
  start_date: string;
  end_date: string;
  location: string;
  organizer: string;
  image: File | null;
  imageUrl?: string;
}

export interface GalleryItem {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  file_path: string;
  category: string;
  title: string;
  event: number;
}

export interface Guru {
  id: number;
  nig: string;
  full_name: string;
  position: string;
  subject: string;
  photo: string;
  description: string;
}

export interface Eskul {
  id: number;
  name: string;
  description: string;
  image: string;
  pembina_id: number;
  Pembina: {
    id: number;
    full_name: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface EskulForm {
  name: string;
  description: string;
  pembina_id: string;
  image: File | null;
}

export interface AchievementNews {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  image?: File | string | null;
  achievement_date: string;
  news_id?: number;
  News?: AchievementNews;
}

export interface Tamu {
  id: number;
  title: string;
  instance_name: string;
  contact_person: string;
  email: string;
  phone: string;
  description: string;
  status: string;
  rejection_reason?: string;
  from: string;
  to: string;
  approved_at?: string;
  request_date: string;
  created_at: string;
  show_in_calendar: boolean;
}

export interface Forum {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Sertifikat {
  id: number;
  name: string;
  issuer: string;
  description: string;
  image: string;
  certification_number: string;
  issue_date: string;
  expiry_date: string;
  created_at: string;
}

export interface Industri {
  id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
  created_at: string;
}
export interface Acara {
  id: number;
  title: string;
  type: string;
  content: string;
  image: string;
  status: string;
  is_active: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  photo: string;
  testimonial: string;
  created_at: string;
}

export interface Portal {
  id: number;
  name: string;
  description: string;
  url: string;
  logo: string;
  category: string;
  is_sso_enabled: boolean;
  is_active: boolean;
  created_at: string; // ISO date string
}
