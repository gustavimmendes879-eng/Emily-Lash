import Image from 'next/image'

const GALLERY = [
  {
    src: '/portfolio/lash-01.jpeg',
    alt: 'Extensão de cílios volume — olhar marcante e curvatura definida',
    tag: 'Volume Russo',
  },
  {
    src: '/portfolio/lash-02.jpeg',
    alt: 'Cílios em volume preto intenso com efeito delineado',
    tag: 'Volume Intenso',
  },
  {
    src: '/portfolio/lash-03.jpeg',
    alt: 'Extensão de cílios com fios alongados e naturais',
    tag: 'Efeito Fox',
  },
  {
    src: '/portfolio/lash-04.jpeg',
    alt: 'Cílios em efeito natural realçando o olhar',
    tag: 'Efeito Natural',
  },
]

const TESTIMONIALS = [
  {
    initial: 'M',
    name: 'Mariana S.',
    service: 'Volume Russo',
    text: 'Nunca me senti tão bem cuidada. A Emily entende exatamente o que combina com o meu rosto — o resultado ficou natural e elegante.',
  },
  {
    initial: 'C',
    name: 'Carolina R.',
    service: 'Design de Sobrancelhas',
    text: 'O design de sobrancelhas mudou completamente a expressão do meu olhar. Atendimento impecável, ambiente limpo e super profissional.',
  },
  {
    initial: 'J',
    name: 'Juliana P.',
    service: 'Lash Lifting',
    text: 'Fiz o Lash Lifting e amei o efeito natural. A durabilidade é ótima e sinto que meu olhar ficou mais aberto e descansado.',
  },
]

export function PortfolioSection() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <div
          className="section-head center reveal"
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            Portfólio
          </div>
          <h2>Trabalhos Recentes</h2>
          <p style={{ marginTop: 14 }}>
            Cada olhar desenhado com técnica, delicadeza e atenção às proporções naturais.
          </p>
        </div>

        <div className="gallery reveal">
          {GALLERY.map((item) => (
            <figure className="gallery-item" key={item.src}>
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.alt}
                fill
                sizes="(max-width: 460px) 50vw, (max-width: 860px) 50vw, 25vw"
              />
              <figcaption className="gallery-tag">{item.tag}</figcaption>
            </figure>
          ))}
        </div>

        <div
          className="section-head center reveal"
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            Depoimentos
          </div>
          <h2>O que dizem as clientes</h2>
        </div>

        <div className="testimonials reveal">
          {TESTIMONIALS.map((t) => (
            <div className="t-card" key={t.name}>
              <span className="t-stars">★★★★★</span>
              <span className="t-quote">&quot;</span>
              <p>{t.text}</p>
              <div className="t-author">
                <div className="t-avatar">{t.initial}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
