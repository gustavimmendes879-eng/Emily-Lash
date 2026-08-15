const WHATSAPP_LINK =
  'https://wa.me/5563991391112?text=Ol%C3%A1%2C%20Emily!%20Gostaria%20de%20agendar%20um%20hor%C3%A1rio.'

export function SiteFooter() {
  return (
    <footer id="contato">
      <div className="container">
        <div className="contact-grid">
          <div className="foot-intro reveal">
            <div className="eyebrow" style={{ color: '#C9A876' }}>
              Contato &amp; Localização
            </div>
            <h2>Vamos agendar o seu horário?</h2>
            <p className="lead-foot">
              Preencha o agendamento acima ou fale direto comigo pelo WhatsApp — atendimento
              cuidadoso do primeiro contato ao resultado final.
            </p>
            <a href={WHATSAPP_LINK} className="btn btn-gold" target="_blank" rel="noopener">
              Falar no WhatsApp
            </a>
          </div>

          <div className="foot-col reveal">
            <h4>Endereço</h4>
            <p>
              Quadra T 22, Rua na 12, nº 0<br />
              Conj. 38, LT. 17<br />
              Palmas — TO
            </p>
            <h4 style={{ marginTop: 32 }}>Horário de Atendimento</h4>
            <div className="hours-row">
              <span>Sábado</span>
              <span>7h — 17h</span>
            </div>
            <div className="hours-row">
              <span>Domingo</span>
              <span>7h — 17h</span>
            </div>
            <div className="hours-row">
              <span>Segunda a Sexta</span>
              <span>Fechado</span>
            </div>
          </div>

          <div className="foot-col reveal">
            <h4>Localização</h4>
            <div className="map-block">
              <div className="map-pin">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 22s7-7.2 7-12.5A7 7 0 0 0 5 9.5C5 14.8 12 22 12 22Z"
                    stroke="#C9A876"
                    strokeWidth="1.3"
                  />
                  <circle cx="12" cy="9.5" r="2.4" stroke="#C9A876" strokeWidth="1.3" />
                </svg>
                <span>Quadra T 22, Rua na 12, Conj. 38, LT. 17 — Palmas, TO</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-bar">
          <a href="#top" className="logo">
            Emily Clara
          </a>
          <span>© 2026 Emily Clara Lash Designer. Todos os direitos reservados.</span>
          <span>Feito com cuidado para realçar olhares.</span>
        </div>
      </div>
    </footer>
  )
}

export function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener"
      aria-label="Agendar no WhatsApp"
    >
      <span className="wa-pulse" />
      <svg viewBox="0 0 32 32" fill="#FBF7F3" aria-hidden="true">
        <path d="M16.02 3C9.4 3 4 8.38 4 15c0 2.34.68 4.53 1.86 6.38L4 29l7.82-1.8A11.9 11.9 0 0 0 16.02 27C22.64 27 28 21.62 28 15S22.64 3 16.02 3Zm0 21.6c-1.98 0-3.83-.55-5.41-1.5l-.39-.23-4.63 1.07 1.1-4.5-.25-.4A9.5 9.5 0 0 1 5.6 15c0-5.75 4.68-10.4 10.42-10.4S26.44 9.25 26.44 15 22.76 24.6 16.02 24.6Zm5.7-7.8c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.71.16-.21.31-.81 1.02-1 1.23-.18.21-.37.23-.68.08-.31-.16-1.3-.48-2.48-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.14-.63.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.23 3.4 5.4 4.77.75.32 1.34.51 1.8.66.76.24 1.44.21 1.99.13.61-.09 1.85-.76 2.11-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.37Z" />
      </svg>
    </a>
  )
}
