import { Option } from "@/components/ui/multiple-selector";
import { Timestamp } from "firebase-admin/firestore";

export interface MovieInterface {
  type?: "video";
  id: string;
  title: string;
  year: string;
  rating: string;
  thumbnail: string;
  genre: string;
  description?: string;
  videoId: string;
  category: string;
  views: number;
  tags: string[];
  createdAt?: Timestamp;
}

export interface CardProps {
  id?: number;
  title: string;
  total: number | string;
  percent?: string;
  color?: "blue" | "green" | "orange" | "red" | "purple";
}

export interface AdItem {
  type: "ad";
  adId: string;
  content: string;
  poster: string;
}

export interface UserProps {
  name: string | undefined;
  email: string | undefined;
  avatar: string;
}

export type VideosType = MovieInterface | BannerAd;

export interface CategoryType {
  id: string;
  name: string;
  videoCount: number;
  totalViews: number;
  home?: boolean;
}

export interface DataProps {
  id: string;
  name: string;
  home?: boolean;
}

export interface CreateFormProps {
  name: string;
  home: boolean;
}

export interface BannerAd {
  type: "ad";
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  targetUrl: string;
}

export interface BannerAdEditProps {
  data: BannerAd;
  onUpdate: (data: BannerAd) => void;
}

export interface AdFormProps {
  title: string;
  subtitle?: string;
  image: string;
  targetUrl: string;
}
export type VideoFormData = {
  title: string;
  category: string;
  tags: Option[];
  videoId: string;
  year: string;
  rating: string;
  genre: string;
  thumbnail?: string;
};

export interface CreateTagForm {
  value: string;
}

export interface EditTagForm {
  value: string;
  id?: string;
}
