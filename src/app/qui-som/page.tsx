import { TopNav } from "../top-nav";

export default function QuiSomPage() {
  return (
    <main className="main-surface">
      <TopNav current="qui-som" />

      <section className="inner-page" aria-labelledby="page-title">
        <div className="window-title">roltramuntana.cat :: qui som</div>
        <p className="eyebrow">Rol Tramuntana</p>
        <h1 id="page-title" className="type-page-title">
          Qui som
        </h1>

        <p className="type-body">
          Som una associació adreçada a totes aquelles persones que estiguin
          interessades en els jocs de rol, jocs de taula i activitats
          relacionades. Els nostres principals objectius són:
        </p>

        <ul className="type-list">
          <li>
            &bull; Difondre i donar suport a els jocs de rol com a alternativa
            d&apos;oci.
          </li>
          <li>&bull; Ensenyar i desenvolupar jocs de rol.</li>
          <li>&bull; Crear un fons biliografic.</li>
          <li>
            &bull; Organitzar diferents activitats relacionades amb el món de
            rol.
          </li>
        </ul>

        <h2 className="type-section-title">Breu història del rol</h2>
        <p className="type-body">
          Durant la dècada dels 70 va néixer als EUA el sistema de rol modern,
          un concepte de joc basat principalment en la interpretació, el diàleg
          i la imaginació. Avui en dia hi ha centenars de jocs diferents amb
          ambientacions i mecàniques molt diverses. En un joc de rol hi
          intervenen un director i uns jugadors. El director de joc, o
          “màster”, crearà una història. Els jugadors interpretaran uns
          personatges dins de la narrativa creada pel màster. El rol és com una
          obra de teatre improvisada, on el màster i els jugadors són alhora
          autors i actors, i l&apos;escenari és la imaginació.
        </p>

        <h2 className="type-section-title">El rol en la cultura popular</h2>
        <p className="type-body">
          És possible que sàpigues més sobre els jocs de rol del què et penses,
          ja que estan presents en la cultura popular i molt del contingut que
          es consumeix està influït per aquests. DnD (Dungeon and Dragons), és
          l&apos;origen de molts dels clixés de la fantasia actual i és esmentat en
          sèries com Stranger Things. De fet, el nom Demogorgon surt d&apos;aquí.
          Vampire the Masquerade, ha influït en la visió que tenim actualment
          dels vampirs dins de la cultura popular, molt més del que un es
          pensaria. Cyberpunk: creat a finals del segle passat ha tingut una
          gran influència dins de la ciència-ficció urbana contemporània i és
          una de les pioneres del gènere homònim. És possible que hagis vist
          l&apos;anime Cyberpunk Edgerunners, que té lloc dins d&apos;aquest univers.
          Call of Cthulhu: basat en les novel·les de H.P. Lovecraft, ha
          introduït a múltiples generacions al terror còsmic/existencial.
        </p>

        <h2 className="type-section-title">Activitats</h2>
        <ul className="type-list">
          <li>
            &bull; <strong>Partides de rol:</strong> dirigides tant per a socis com per directors
            de joc d&apos;arreu del país, i obertes a tot el públic que s&apos;hi vulgui
            apuntar.
          </li>
          <li>
            &bull; <strong>Rol en viu:</strong> varietat de rol similar a una obra de teatre, on
            la improvisació i les interaccions orgàniques substitueixen als daus
            a l&apos;hora de contar la història i on els jugadors van attretzats com
            els seus personatges.
          </li>
          <li>
            &bull; <strong>Jocs de taula:</strong> partides de jocs de taula diversos amb
            mecàniques i temàtiques molt variades.
          </li>
          <li>
            &bull; <strong>Jornades temàtiques:</strong> un conjunt d&apos;activitats lúdiques d&apos;una
            ambientació concreta. Jocs de rol, jocs de taula, tallers,
            visualització de pel·lícules, etc. Tot relacionat amb el tema
            escollit.
          </li>
        </ul>
      </section>
    </main>
  );
}
