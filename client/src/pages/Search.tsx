import React from 'react'
import { useParams } from 'react-router-dom'

export default function Search() {
const profile=useParams();

  return (
    <div>
      {profile._id}
    </div>
  )
}
