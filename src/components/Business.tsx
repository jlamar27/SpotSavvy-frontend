import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../http/httpConfig'

interface BusinessData {
  name: string;
  image_url: string
}


function Business() {
  const [business, setBusiness] = useState<BusinessData | null>(null)
  // id should be passed in from results page
  const id = 'gaeJZeZmKalQhcPFjbPrPg'
  const navigate = useNavigate();




  useEffect(() => {
    async function getBusiness(): Promise<any> {
      try {
        const response = await api.get(`/businesses/${id}`)
        setBusiness(response.data)
        // console.log(business)
      } catch (error) {
        console.error(error)
      }
    }
    getBusiness()
  }, [])

  const handleWriteReview = () => {
    navigate(`/writeareview/biz/${id}`)
  };


  return (
    <div>
      <h1>{business?.name}</h1>
      <img src={business?.image_url} alt={business?.name} />

      <div className='review-container'>
        <button
          className='review-button'
          onClick={handleWriteReview}
        >
          Write a review
        </button>
        // to save as favorites
        <button >Save</button>
      </div>
    </div>
  )
}

export default Business