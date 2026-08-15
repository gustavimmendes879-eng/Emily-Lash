'use client'

import { useEffect, useMemo, useState } from 'react'

const WHATSAPP_NUMBER = '5563991391112'

type ServiceType = 'aplicacao' | 'manutencao'

const SERVICES: Record<ServiceType, { name: string; price: number }[]> = {
  aplicacao: [
    { name: 'Volume Brasileiro', price: 120 },
    { name: 'Volume Egípcio', price: 135 },
    { name: 'Volume Inglês 5D', price: 145 },
    { name: 'Efeito Fox', price: 150 },
    { name: 'Design de Sobrancelha (Com Henna)', price: 40 },
    { name: 'Design de Sobrancelha (Sem Henna)', price: 30 },
  ],
  manutencao: [
    { name: 'Volume Brasileiro', price: 95 },
    { name: 'Volume Egípcio', price: 105 },
    { name: 'Volume Inglês 5D', price: 115 },
    { name: 'Efeito Fox', price: 120 },
  ],
}

const AVAILABLE_TIMES = [
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
]

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

function formatDateISO(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function isWeekend(date: Date) {
  const day = date.getDay()
  return day === 0 || day === 6
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function BookingSection() {
  const [name, setName] = useState('')
  const [type, setType] = useState<ServiceType>('aplicacao')
  const [service, setService] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [time, setTime] = useState('')
  const [calendarMonth, setCalendarMonth] = useState(() => startOfMonth(new Date()))
  const [message, setMessage] = useState('')
  const [messageKind, setMessageKind] = useState<'error' | 'ok' | ''>('')
  const [errorFields, setErrorFields] = useState<Set<string>>(new Set())
  const [submitting, setSubmitting] = useState(false)

  // horários já reservados por outras pessoas, vindos do banco.
  // formato da chave: "AAAA-MM-DD|HH:MM"
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set())
  const [loadingBookings, setLoadingBookings] = useState(true)

  async function refreshBookedSlots() {
    try {
      const res = await fetch('/api/bookings', { cache: 'no-store' })
      const data = await res.json()
      const set = new Set<string>(
        (data.bookings ?? []).map((b: { date: string; time: string }) => `${b.date}|${b.time}`),
      )
      setBookedSlots(set)
    } catch {
      // se a busca falhar, não travamos o formulário — só não
      // conseguimos avisar em tempo real quais horários já foram
      // pegos, o próprio envio ainda é validado no servidor.
    } finally {
      setLoadingBookings(false)
    }
  }

  useEffect(() => {
    refreshBookedSlots()
  }, [])

  const serviceList = SERVICES[type]

  const servicePriceLabel = useMemo(() => {
    const found = serviceList.find((s) => s.name === service)
    if (!found) return ''
    const label = type === 'aplicacao' ? 'Aplicação' : 'Manutenção · 15 dias'
    return `${label}: R$ ${found.price.toLocaleString('pt-BR')}`
  }, [service, serviceList, type])

  const calendarCells = useMemo(() => {
    const year = calendarMonth.getFullYear()
    const month = calendarMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const cells: ({ day: number; date: Date; available: boolean } | null)[] = []
    for (let i = 0; i < firstDay; i++) cells.push(null)
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      date.setHours(0, 0, 0, 0)
      cells.push({ day, date, available: date >= today && isWeekend(date) })
    }
    return cells
  }, [calendarMonth])

  const calendarTitle = calendarMonth.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  })

  const selectedDateLabel = selectedDate
    ? `Selecionado: ${selectedDate.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
      })}`
    : 'Escolha um sábado ou domingo.'

  const selectedDateISO = selectedDate ? formatDateISO(selectedDate) : null

  function isTimeTaken(t: string) {
    if (!selectedDateISO) return false
    return bookedSlots.has(`${selectedDateISO}|${t}`)
  }

  function handlePrevMonth() {
    const minMonth = startOfMonth(new Date())
    const target = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1)
    if (target >= minMonth) setCalendarMonth(target)
  }

  function handleNextMonth() {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))
  }

  function clearFieldError(field: string) {
    setErrorFields((prev) => {
      if (!prev.has(field)) return prev
      const next = new Set(prev)
      next.delete(field)
      return next
    })
    setMessage('')
    setMessageKind('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const missing = new Set<string>()
    if (!name.trim()) missing.add('name')
    if (!service) missing.add('service')
    if (!selectedDate) missing.add('date')
    if (!time) missing.add('time')

    if (missing.size) {
      setErrorFields(missing)
      setMessage('Escolha seu nome, atendimento, serviço, dia e horário.')
      setMessageKind('error')
      return
    }

    if (isTimeTaken(time)) {
      setMessage('Esse horário já foi reservado. Escolha outro, por favor.')
      setMessageKind('error')
      return
    }

    const typeLabel = type === 'aplicacao' ? 'Aplicação' : 'Manutenção · 15 dias'
    const found = serviceList.find((s) => s.name === service)!
    const price = found.price.toLocaleString('pt-BR')
    const diaFormatado = selectedDate!.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    })

    setSubmitting(true)
    setMessage('Confirmando seu horário...')
    setMessageKind('')

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          serviceType: type,
          serviceName: service,
          price: found.price,
          date: selectedDateISO,
          time,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        // horário foi pego por outra pessoa entre a escolha e o envio,
        // ou outro erro do servidor.
        setMessage(data.error ?? 'Não foi possível confirmar. Tente novamente.')
        setMessageKind('error')
        await refreshBookedSlots()
        setTime('')
        return
      }

      const texto = `Olá, Emily! Meu nome é ${name.trim()}. Gostaria de agendar *${typeLabel}* de *${service}* (R$ ${price}) para ${diaFormatado}, às ${time}h.`
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`

      setMessage('Horário confirmado! Abrindo o WhatsApp com sua solicitação preenchida...')
      setMessageKind('ok')
      setBookedSlots((prev) => new Set(prev).add(`${selectedDateISO}|${time}`))
      window.location.href = url
    } catch {
      setMessage('Não foi possível conectar ao servidor. Tente novamente.')
      setMessageKind('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="agendamento" id="agendar">
      <div className="container">
        <div className="section-head center reveal" style={{ margin: '0 auto' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            Agendamento
          </div>
          <h2>Monte seu horário</h2>
          <p style={{ marginTop: 14 }}>
            Escolha entre aplicação ou manutenção, selecione o serviço, o dia disponível e o
            horário. A mensagem será enviada direto para o WhatsApp. Atendemos aos{' '}
            <strong>sábados e domingos, das 7h às 17h</strong>.
          </p>
        </div>

        <form className="booking-card reveal" onSubmit={handleSubmit} noValidate>
          <div className="booking-row">
            <label htmlFor="bkName">Seu nome</label>
            <input
              type="text"
              id="bkName"
              placeholder="Como podemos te chamar?"
              value={name}
              className={errorFields.has('name') ? 'field-error' : undefined}
              onChange={(e) => {
                setName(e.target.value)
                clearFieldError('name')
              }}
            />
          </div>

          <div className="booking-row">
            <label>Tipo de atendimento</label>
            <div className="booking-choice-grid">
              {(['aplicacao', 'manutencao'] as ServiceType[]).map((t) => (
                <button
                  type="button"
                  key={t}
                  className={`booking-choice${type === t ? ' active' : ''}`}
                  onClick={() => {
                    setType(t)
                    setService('')
                  }}
                >
                  {t === 'aplicacao' ? 'Aplicação' : 'Manutenção · 15 dias'}
                </button>
              ))}
            </div>
          </div>

          <div className="booking-row">
            <label htmlFor="bkService">Serviço desejado</label>
            <select
              id="bkService"
              value={service}
              className={errorFields.has('service') ? 'field-error' : undefined}
              onChange={(e) => {
                setService(e.target.value)
                clearFieldError('service')
              }}
            >
              <option value="" disabled>
                Escolha um serviço
              </option>
              {serviceList.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            <div className="service-price">{servicePriceLabel}</div>
          </div>

          <div className="booking-row">
            <label>Escolha o dia</label>
            <div className="booking-calendar">
              <div className="calendar-head">
                <button
                  type="button"
                  className="calendar-nav"
                  aria-label="Mês anterior"
                  onClick={handlePrevMonth}
                >
                  ‹
                </button>
                <strong>{calendarTitle}</strong>
                <button
                  type="button"
                  className="calendar-nav"
                  aria-label="Próximo mês"
                  onClick={handleNextMonth}
                >
                  ›
                </button>
              </div>
              <div className="calendar-weekdays">
                {WEEKDAYS.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
              <div className="calendar-days">
                {calendarCells.map((cell, i) => {
                  if (!cell) return <div key={`empty-${i}`} className="calendar-day empty" />
                  const iso = formatDateISO(cell.date)
                  const isSelected =
                    selectedDate && formatDateISO(selectedDate) === iso
                  if (!cell.available) {
                    return (
                      <button
                        key={iso}
                        type="button"
                        className="calendar-day disabled"
                        disabled
                      >
                        {cell.day}
                      </button>
                    )
                  }
                  return (
                    <button
                      key={iso}
                      type="button"
                      className={`calendar-day available${isSelected ? ' selected' : ''}`}
                      onClick={() => {
                        setSelectedDate(cell.date)
                        setTime('')
                        clearFieldError('date')
                      }}
                    >
                      {cell.day}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="selected-date">{selectedDateLabel}</div>
          </div>

          <div className="booking-row">
            <label>Escolha o horário</label>
            <div className="time-grid">
              {AVAILABLE_TIMES.map((t) => {
                const taken = isTimeTaken(t)
                return (
                  <button
                    type="button"
                    key={t}
                    disabled={taken || loadingBookings}
                    className={`time-option${time === t ? ' selected' : ''}${
                      taken ? ' disabled' : ''
                    }`}
                    title={taken ? 'Horário já reservado' : undefined}
                    onClick={() => {
                      setTime(t)
                      clearFieldError('time')
                    }}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          </div>

          <p className={`booking-msg${messageKind ? ` is-${messageKind}` : ''}`}>{message}</p>
          <button type="submit" className="btn btn-gold booking-submit" disabled={submitting}>
            {submitting ? 'Confirmando...' : 'Enviar pedido pelo WhatsApp'}
          </button>
        </form>
      </div>
    </section>
  )
}
