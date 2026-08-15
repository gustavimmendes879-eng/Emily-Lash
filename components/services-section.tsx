import type { ReactNode } from 'react'

type Service = {
  icon: ReactNode
  title: string
  price: string
}

const SERVICES: Service[] = [
  {
    title: 'Volume Brasileiro',
    price: 'Aplicação: R$ 120 · Manutenção em 15 dias: R$ 95',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <path
          d="M2 11c3-5 7-7 9-7s6 2 9 7c-3 5-7 7-9 7s-6-2-9-7Z"
          stroke="#A9824F"
          strokeWidth="1.3"
          fill="none"
        />
        <circle cx="11" cy="11" r="3" stroke="#A9824F" strokeWidth="1.3" fill="none" />
      </svg>
    ),
  },
  {
    title: 'Volume Egípcio',
    price: 'Aplicação: R$ 135 · Manutenção em 15 dias: R$ 105',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <path
          d="M4 15c2-6 5-9 7-9s5 3 7 9"
          stroke="#A9824F"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M6 14c1.5-4 3.5-6 5-6s3.5 2 5 6"
          stroke="#A9824F"
          strokeWidth="1.1"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Volume Inglês 5D',
    price: 'Aplicação: R$ 145 · Manutenção em 15 dias: R$ 115',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <path
          d="M4 12c1.5 3 4 5 7 5s5.5-2 7-5"
          stroke="#A9824F"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M4 12c1.5-3 4-5 7-5s5.5 2 7 5"
          stroke="#A9824F"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
    ),
  },
  {
    title: 'Efeito Fox',
    price: 'Aplicação: R$ 150 · Manutenção: R$ 120',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <path
          d="M3 13c2-6 6-9 8-9s6 3 8 9"
          stroke="#A9824F"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Design de Sobrancelha',
    price: 'Com Henna: R$ 40 · Sem Henna: R$ 30',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <path
          d="M3 14c2-7 6-9 8-9s6 2 8 9"
          stroke="#A9824F"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

export function ServicesSection() {
  return (
    <section className="servicos" id="servicos">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Serviços</div>
          <h2>Procedimentos desenhados para o seu rosto</h2>
        </div>

        <div className="service-list">
          {SERVICES.map((service) => (
            <div className="service-row reveal" key={service.title}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: service.price.replace(
                    /R\$ \d+/g,
                    (m) => `<strong>${m}</strong>`,
                  ),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
