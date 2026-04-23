export interface ProjectItem {
  id: string;
  title: string;
  imageUrl: string;
  category: 'flyer' | 'logo' | 'social' | 'book';
  description?: string;
}

export interface GallerySectionData {
  id: string;
  title: string;
  items: ProjectItem[];
}

export type SectionType = 'flyers' | 'logos' | 'social' | 'books';
