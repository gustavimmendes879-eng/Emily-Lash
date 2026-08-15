const FEATURES = [
  {
    num: 'I.',
    title: 'Biossegurança',
    text: 'Materiais esterilizados, descartáveis de uso único e protocolos rigorosos de higienização em todas as etapas do atendimento.',
  },
  {
    num: 'II.',
    title: 'Materiais Premium',
    text: 'Fios de seda importados, colas hipoalergênicas e produtos selecionados que respeitam a saúde e a naturalidade dos seus cílios.',
  },
  {
    num: 'III.',
    title: 'Atendimento Personalizado',
    text: 'Cada procedimento começa com uma avaliação de visagismo — o resultado é sempre desenhado para o seu rosto, nunca padronizado.',
  },
]

export function FeaturesSection() {
  return (
    <section className="diferenciais" id="diferenciais">
      <div className="container">
        <div
          className="section-head center reveal"
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            Diferenciais &amp; Cuidados
          </div>
          <h2>Segurança e excelência em cada atendimento</h2>
          <p style={{ marginTop: 14 }}>
            Cuidar do seu olhar é uma responsabilidade que levo a sério — do material utilizado ao
            ambiente de trabalho.
          </p>
        </div>

        <div className="dif-grid reveal">
          {FEATURES.map((feature) => (
            <div className="dif-card" key={feature.num}>
              <span className="num">{feature.num}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
