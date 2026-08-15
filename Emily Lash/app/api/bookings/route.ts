import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET: retorna todos os horários já reservados (data + hora),
// para o formulário desabilitar esses horários pra outras pessoas.
export async function GET() {
  const { data, error } = await supabase
    .from('bookings')
    .select('date, time')
    .gte('date', new Date().toISOString().slice(0, 10))

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ bookings: data ?? [] })
}

// POST: cria um novo agendamento. Se já existir um agendamento
// para a mesma data + horário, o banco recusa (constraint UNIQUE)
// e devolvemos 409 pra avisar que o horário acabou de ser tomado.
export async function POST(request: Request) {
  let body: {
    name?: string
    serviceType?: string
    serviceName?: string
    price?: number
    date?: string
    time?: string
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Corpo da requisição inválido.' }, { status: 400 })
  }

  const { name, serviceType, serviceName, price, date, time } = body

  if (!name?.trim() || !serviceType || !serviceName || !date || !time) {
    return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 })
  }

  const { error } = await supabase.from('bookings').insert({
    name: name.trim(),
    service_type: serviceType,
    service_name: serviceName,
    price: price ?? null,
    date,
    time,
  })

  if (error) {
    // 23505 = violação de constraint UNIQUE (data+hora já reservados)
    if (error.code === '23505') {
      return NextResponse.json(
        {
          error:
            'Esse horário acabou de ser reservado por outra pessoa. Escolha outro horário, por favor.',
        },
        { status: 409 },
      )
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
