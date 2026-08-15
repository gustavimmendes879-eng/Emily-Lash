import Image from 'next/image'

const CERTS = [
  'Especialista em Visagismo',
  'Certificação em Volume Russo',
  'Design de Sobrancelhas Avançado',
  'Biossegurança Certificada',
]

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="8" stroke="#A9824F" strokeWidth="1.3" fill="none" />
      <path
        d="M5 9l3 3 5-6"
        stroke="#A9824F"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AboutSection() {
  return (
    <section className="sobre" id="sobre">
      <div className="container sobre-grid">
        <div className="portrait-frame reveal">
          <div className="portrait-inner">
            <Image
              src="/emily-clara.jpeg"
              alt="Emily Clara, Lash Designer e Especialista em Sobrancelhas"
              fill
              sizes="(max-width: 860px) 90vw, 420px"
              className="portrait-photo"
              priority
            />
          </div>
          <div className="portrait-tag">Emily Clara</div>
        </div>

        <div className="sobre-text reveal">
          <div className="eyebrow">Sobre Mim</div>
          <h2>Visagismo, técnica e cuidado em cada detalhe do seu olhar.</h2>
          <p>
            Há mais de sete anos me dedico à arte de realçar olhares. Minha trajetória nasceu do
            encantamento com o visagismo — a certeza de que cada rosto pede um desenho único, e que
            a beleza verdadeira aparece quando a técnica respeita as proporções naturais de cada
            cliente.
          </p>
          <p>
            Sou certificada nas principais técnicas de extensão de cílios e design de sobrancelhas
            do mercado, e mantenho minha formação em constante atualização. Mais do que estética,
            meu compromisso é com a saúde dos seus cílios e sobrancelhas naturais — por isso cada
            procedimento é pensado para durar com segurança e leveza.
          </p>
          <ul className="cert-list">
            {CERTS.map((cert) => (
              <li key={cert}>
                <CheckIcon /> {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
