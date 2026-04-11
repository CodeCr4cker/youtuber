export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  readTime: number;
  views: number;
  likes: number;
  comments: Comment[];
  youtubeVideoId?: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  createdAt: Date;
  likes: number;
  replies?: Comment[];
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: Date;
  viewCount: string;
  duration: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  permalink: string;
}

export interface NavLink {
  label: string;
  href: string;
  icon?: string;
}

export interface SocialLink {
  platform: 'youtube' | 'instagram' | 'twitter' | 'facebook';
  url: string;
  followers?: string;
}

export interface SiteStats {
  subscribers: string;
  videos: string;
  views: string;
}
