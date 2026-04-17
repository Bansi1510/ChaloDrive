'use client'

import React, { useState } from 'react'
import Hero from './Hero'
import VehicleSlider from './VehicleSlider'
import Auth from './Auth'
import Navbar from '../common/Navbar'

const Public = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Navbar />
      <Hero />
      <VehicleSlider />
      <Auth open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default Public
