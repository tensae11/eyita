export interface Movie {
  id: number
  title: string
  year: string
  rating: string
  image: string
  genre: string
  description?: string
}

export interface Category {
  id: string
  name: string
  highlighted?: boolean
  icon?: string
}

export interface Ad {
  id: number
  title: string
  subtitle: string
  image: string
  gradient: string
}

export interface SocialPlatform {
  id: string
  name: string
  icon: string
  color: string
}

export interface NavigationProps {
  onNavigate: (page: string) => void
}
