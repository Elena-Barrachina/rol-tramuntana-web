/* eslint-disable @next/next/no-img-element */
import { TopNav } from "../top-nav";
import { instagramPosts, type InstagramPost } from "@/data/instagram-posts";

const mobileRows = Array.from({ length: 11 }, () => 2);
const desktopGridSizes = [6, 5, 4, 3];

function rowsFor(columns: number) {
  return Array.from({ length: 7 }, (_, index) => index % 2 === 0 ? columns : columns - 1);
}

function EmptyHexagon() {
  return <button className="archive-hexagon" type="button" aria-label="Espai per a una publicació d&apos;Instagram" />;
}

function PostHexagon({ post }: { post: InstagramPost }) {
  return (
    <a className="archive-hexagon archive-hexagon--post" href={post.permalink} target="_blank" rel="noreferrer" aria-label={`Obre a Instagram: ${post.title}`}>
      <span className="archive-post-frame"><img src={post.image} alt="" /></span>
      <span className="archive-post-title">{post.title}</span>
    </a>
  );
}

function HexagonRows({ rows, variant, posts }: { rows: number[]; variant: string; posts: InstagramPost[] }) {
  let postIndex = 0;

  return (
    <div className={`archive-hex-grid archive-hex-grid--${variant}`}>
      {rows.map((columns, rowIndex) => (
        <div className={`archive-hex-row archive-hex-row--${columns}${rowIndex % 2 ? " archive-hex-row--inset" : ""}`} key={`${variant}-${rowIndex}`}>
          {Array.from({ length: columns }, (_, index) => {
            const post = posts[postIndex++];
            return post ? <PostHexagon key={index} post={post} /> : <EmptyHexagon key={index} />;
          })}
        </div>
      ))}
    </div>
  );
}

export default function ArxiuPage() {
  return (
    <main className="main-surface archive-surface">
      <TopNav current="arxiu" />
      <section className="archive-feed" aria-labelledby="page-title">
        <div className="archive-heading">
          <p className="eyebrow">Rol Tramuntana</p>
          <h1 id="page-title">Arxiu</h1>
          <p>Aquí trobaràs un recull de les publicacipons i noticies més recents de l&apos;associació.</p>
        </div>
        <div className="archive-gallery">
          {desktopGridSizes.map((columns) => (
            <HexagonRows key={columns} rows={rowsFor(columns)} variant={`desktop archive-hex-grid--${columns}`} posts={instagramPosts} />
          ))}
          <HexagonRows rows={mobileRows} variant="mobile" posts={instagramPosts} />
        </div>
      </section>
    </main>
  );
}
