import React, { useEffect, useState } from 'react'
import api from '../http/httpConfig'

function Business() {
  const [business, setBusiness] = useState({})
  const id = 'gaeJZeZmKalQhcPFjbPrPg'
  console.log(business)

  async function getBusiness(): Promise<any> {
    const response = await api.get(`/businesses/${id}`)
    setBusiness(response)
  }

  useEffect(() => {
    getBusiness()
  }, [])


  return (
    <div>
      {/* <img src={business.image_url} /> */}
    </div>
  )
}

export default Business