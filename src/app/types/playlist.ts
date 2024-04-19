export interface Playlists {
  featuredPlaylists: FeaturedPlaylists
}

export interface FeaturedPlaylists {
  name: string
  content: PlaylistContent[]
}

export interface PlaylistContent {
  id: string
  kind: string
  name: string
  url: string
  curator_name: string
  artwork: string
}
