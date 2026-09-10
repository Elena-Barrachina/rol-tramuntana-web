export type InstagramPost = {
  /** The individual Instagram post or reel URL. */
  permalink: string;
  /** A local image path or a direct image URL. Local files in public/instagram are recommended. */
  image: string;
  /** Shown over the image when the hexagon is hovered or keyboard-focused. */
  title: string;
};

// Add posts here. For a dependable static gallery, download each preview image
// to public/instagram and reference it as "/instagram/your-file.jpg".
export const instagramPosts: InstagramPost[] = [
  // {
  //   permalink: "https://www.instagram.com/p/POST_SHORTCODE/",
  //   image: "/instagram/post-title.jpg",
  //   title: "Títol de la publicació",
  // },
];
