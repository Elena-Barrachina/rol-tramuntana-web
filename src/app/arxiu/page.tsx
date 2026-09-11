/* eslint-disable @next/next/no-img-element */
import { instagramPosts, type InstagramPost } from "@/data/instagram-posts";
import { TopNav } from "../top-nav";

const slots = Array.from({ length: 20 }, (_, index) => instagramPosts[index]);

function EmptyPost({ index }: { index: number }) {
  return <button className="post-card post-card--empty" type="button" aria-label={`Espai reservat per a la publicació ${index + 1}`}><span>Publicació pendent</span></button>;
}

function InstagramPost({ post }: { post: InstagramPost }) {
  return (
    <a className="post-card" href={post.permalink} target="_blank" rel="noreferrer" aria-label={`Obre a Instagram: ${post.title}`}>
      <img src={post.image} alt="" />
      <span>{post.title}</span>
    </a>
  );
}

export default function ArxiuPage() {
  return (
    <main className="main-surface">
      <TopNav current="arxiu" />
      <section className="inner-page archive" aria-labelledby="page-title">
        <div className="window-title">roltramuntana.cat :: arxiu</div>
        <p className="eyebrow">Rol Tramuntana</p>
        <h1 id="page-title">Arxiu</h1>
        <p>Aquí trobaràs un recull de les publicacions i notícies més recents de l&apos;associació.</p>
        <div className="post-grid" aria-label="Publicacions d&apos;Instagram">
          {slots.map((post, index) => post ? <InstagramPost key={index} post={post} /> : <EmptyPost key={index} index={index} />)}
        </div>
      </section>
    </main>
  );
}
