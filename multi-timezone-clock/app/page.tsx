'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { timezones } from '../utils/timezones'

export default function MultiTimezoneClock() {
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const handleTimezoneToggle = (timezone: string) => {
    setSelectedTimezones(prev =>
      prev.includes(timezone)
        ? prev.filter(tz => tz !== timezone)
        : [...prev, timezone]
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Multi-Timezone Clock</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Select Timezones</h2>
            <div className="space-y-2">
              {timezones.map(timezone => (
                <div key={timezone} className="flex items-center space-x-2">
                  <Checkbox
                    id={timezone}
                    checked={selectedTimezones.includes(timezone)}
                    onCheckedChange={() => handleTimezoneToggle(timezone)}
                  />
                  <label
                    htmlFor={timezone}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {timezone}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Selected Clocks</h2>
            <div className="space-y-4">
              {selectedTimezones.map(timezone => (
                <div key={timezone} className="flex justify-between items-center">
                  <span>{timezone}</span>
                  <span className="text-xl font-mono">
                    {format(utcToZonedTime(currentTime, timezone), 'HH:mm:ss')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

