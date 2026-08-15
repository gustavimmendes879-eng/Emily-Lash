export function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            Lash Designer &amp; Especialista em Sobrancelhas · Palmas, TO
          </div>
          <h1>
            Seu olhar merece ser
            <br /> a <em>primeira</em> coisa que encanta.
          </h1>
          <p className="lead">
            Emily Clara desenha extensões de cílios e sobrancelhas sob medida para a sua estrutura
            facial — técnica refinada, biossegurança em cada etapa e resultados que realçam a sua
            beleza natural.
          </p>
          <div className="hero-actions">
            <a href="#agendar" className="btn btn-primary">
              Agendar um Horário
            </a>
            <a href="#portfolio" className="btn btn-outline">
              Trabalhos Recentes
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <strong>+2</strong>
              <span>Anos Certificada</span>
            </div>
            <div>
              <strong>+250</strong>
              <span>Clientes Atendidas</span>
            </div>
            <div>
              <strong>5</strong>
              <span>Modelos de Cílios</span>
            </div>
            <div>
              <strong>+1</strong>
              <span>Design de Sobrancelha</span>
            </div>
          </div>
        </div>

        <div className="hero-art">
          <div className="hero-ring" />
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="lash-stroke d1" d="M90 95 C 140 55, 230 55, 300 100" />
            <path
              className="lash-stroke d2"
              d="M70 175 C 130 130, 270 130, 330 175 C 270 220, 130 220, 70 175 Z"
              strokeWidth="2.2"
            />
            <circle className="lash-stroke d3" cx="200" cy="175" r="26" />
            <circle cx="200" cy="175" r="9" fill="#B98671" opacity="0.5" />
            <path className="lash-stroke d4" d="M100 165 C 92 150, 88 140, 84 128" />
            <path className="lash-stroke d5" d="M140 142 C 136 122, 134 112, 130 98" />
            <path className="lash-stroke d6" d="M200 132 C 200 110, 200 98, 200 84" />
            <path className="lash-stroke d7" d="M260 142 C 264 122, 266 112, 270 98" />
            <path className="lash-stroke d4" d="M300 165 C 308 150, 312 140, 316 128" />
            <path
              className="lash-stroke d3"
              d="M110 205 C 150 224, 250 224, 290 205"
              strokeWidth="1.4"
              opacity="0.55"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}

export function Flourish({ variant = 1 }: { variant?: 1 | 2 }) {
  return (
    <div className="flourish">
      <svg viewBox="0 0 150 32">
        <path
          d={
            variant === 1
              ? 'M5 26 C 30 4, 45 4, 75 16 C 105 28, 120 28, 145 6'
              : 'M5 6 C 30 28, 45 28, 75 16 C 105 4, 120 4, 145 26'
          }
        />
      </svg>
    </div>
  )
}
