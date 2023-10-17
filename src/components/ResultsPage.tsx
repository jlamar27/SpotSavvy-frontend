import React, {useEffect, useState} from 'react'
import api from '../http/httpConfig'
import { url } from 'inspector'
import { request } from 'http'

interface ResultData {
  term: string
  location: string

}


export default function ResultsPage() {
  const [results, setResults] = useState<ResultData | null>(null)
  console.log('here', results)

  useEffect(() => {
    async function getResults(): Promise<any> {
      try {
        const response = await api.get(`/businesses/search?location=New%20York&term=burgers&sort_by=best_match`)
        setResults(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getResults()
  }, [])




  return (
    <div>ResultsPage</div>
  )
}
