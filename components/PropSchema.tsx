interface Song {
  song_title: string;
  artist_data: Artist[];
  album: string;
  releaseYear?: number;
  album_name: string;
  song_release_date: string;
  song_duration: durationProps;
}

interface SongSchemaProps {
  song: Song;
}

interface DiscographySchemaProps {
  artist: Artist;
  disco_artist: DiscoAlbum
}

interface WebPageSchemaProps {
  endpoint: string;
  description: string
  prop_type: string
}

interface DiscoAlbum {
  artist_slug: string;
  original_artist_albums: AlbumProp[]
}

interface AlbumProp {
  album_release_date?: string;
  album_name: string;
  album_thumbnail?: string;
}

interface Artist {
  name: string;
  slug: string;
  artist_name: string;
  thumbnail: string;
}

interface durationProps {
  min: number;
  sec: number;
}

const formatDurationISO = (duration: durationProps | null | undefined): string | undefined => {
  if (!duration) return undefined; // Handle missing values
  const minutes = duration.min
  const seconds = duration.sec
  return `PT${minutes}M${seconds > 0 ? `${seconds}S` : ''}`; // Format "PT#M#S"
};

export function SongSchema({ song }: SongSchemaProps) {
  const webBaseUrl = process.env.NEXT_PUBLIC_WEB_BASE_URL || "";
  const songJsonLD = {
    "@context": "http://schema.org",
    "@type": "MusicRecording",
    name: song.song_title,
    byArtist:
      song.artist_data.length === 1
        ? {
            "@type": "MusicGroup",
            name: song.artist_data[0].name,
            url: `${webBaseUrl}/discography/${song.artist_data[0].slug}`,
          }
        : song.artist_data.map((artist) => ({
            "@type": "MusicGroup",
            name: artist,
            url: `${webBaseUrl}/discography/${artist.slug}`,
          })),
    album: {
      "@type": "MusicAlbum",
      name: song.album_name,
    },
    datePublished: song.song_release_date  ? song.song_release_date : undefined,
    duration: song.song_duration  ? formatDurationISO(song.song_duration) : undefined,
  };

  return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(songJsonLD) }}
        />
  );
}

export function DiscographySchema({ artist, disco_artist }: DiscographySchemaProps) {
  const webBaseUrl = process.env.NEXT_PUBLIC_WEB_BASE_URL || "";
  const discographyJsonLD = {
    "@context": "http://schema.org",
    "@type": "MusicGroup",
    name: artist.artist_name,
    url: `${webBaseUrl}/discography/${disco_artist.artist_slug}`, // Link to discography page
    image: artist.thumbnail || undefined, // Artist image if available
    album: Object.values(disco_artist.original_artist_albums).map((album) => ({
      "@type": "MusicAlbum",
      name: album.album_name,
      datePublished: album.album_release_date?.toString(),
      image: album.album_thumbnail || undefined, // Album cover image
    })),
  };

  return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(discographyJsonLD) }}
        />
  );
}

export function WebPageSchema({ endpoint, description, prop_type }: WebPageSchemaProps) {
  const webBaseUrl = process.env.NEXT_PUBLIC_WEB_BASE_URL || "";
  const site_name = process.env.NEXT_PUBLIC_site_name
  const site_logo = process.env.NEXT_PUBLIC_site_logo || "";
  const discoverJsonLD = {
    "@context": `https://schema.org`,
    "@type": `WebPage`,
    "name": `${prop_type} - ${site_name}`,
    "description": description,
    "url": `${webBaseUrl}/discover/${endpoint}`,
    "image": site_logo,
  };

  return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(discoverJsonLD) }}
        />
  );
}