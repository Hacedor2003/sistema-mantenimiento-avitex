/* eslint-disable prettier/prettier */
import { RootLayout } from '@renderer/components/AppLayout'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

interface Date {
  month: number
  day: number
  year: number
}

const monthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]

const Calendario = (): JSX.Element => {
  const [dates, setDates] = useState<Date[]>([])
  const [events, setEvents] = useState<Date[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const { maquinaria } = useParams()

  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear()
    const allDates: Date[] = []
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate()
      for (let day = 1; day <= daysInMonth; day++) {
        allDates.push({ month, day, year })
      }
    }
    setDates(allDates)

    const eventDates: Date[] = [
      { month: 3, day: 15, year },
      { month: 7, day: 1, year },
      { month: 11, day: 25, year }
    ]
    setEvents(eventDates)
  }, [])

  const handleDateChange = (date: Date): void => {
    setSelectedDate(date)
  }

  return (
    <RootLayout>
      <div className="w-full p-4">
        <h2 className="text-2xl font-bold mb-4">Calendario de {maquinaria}:</h2>
        <div className="flex flex-col items-center justify-center mb-4">
          <label htmlFor="inputDate" className="border-b border-black text-xl font-serif mb-2">
            Seleccione la fecha:
          </label>
          {selectedDate && (
            <div className="flex flex-col gap-y-2 items-center">
              <input
                id="inputDate"
                type="date"
                className="px-4 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={`${selectedDate.year}-${String(selectedDate.month + 1).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`}
                onChange={(e) =>
                  handleDateChange({
                    year: parseInt(e.target.value.split('-')[0]),
                    month: parseInt(e.target.value.split('-')[1]) - 1,
                    day: parseInt(e.target.value.split('-')[2])
                  })
                }
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 12 }, (_, index) => index).map((month) => (
            <div key={month} className="w-full flex flex-col items-center justify-center gap-2">
              <header className="col-span-11 font-bold mb-2 text-xl font-serif">
                {monthNames[month]}
              </header>
              <section className="w-full flex flex-row flex-wrap items-center justify-start gap-2 text-sm">
                {dates
                  .filter((date) => date.month === month)
                  .map((date, i) => (
                    <div
                      key={i}
                      className={`relative min-w-[45px] h-fit border border-black rounded-md text-center font-mono p-2 hover:bg-[#853232] hover:text-white duration-300 ${
                        events.some((event) => sameDate(event, date)) ? 'bg-yellow-300' : 'bg-white'
                      }`}
                      onClick={() => handleDateChange(date)}
                    >
                      {date.day}
                      <p className="w-full break-words absolute -top-2 -right-5">
                        {events.some((event) => sameDate(event, date)) ? ' ⚙️' : null}
                      </p>
                    </div>
                  ))}
              </section>
            </div>
          ))}
        </div>
      </div>
    </RootLayout>
  )
}

const sameDate = (date1: Date, date2: Date): boolean => {
  return date1.year === date2.year && date1.month === date2.month && date1.day === date2.day
}

export default Calendario
