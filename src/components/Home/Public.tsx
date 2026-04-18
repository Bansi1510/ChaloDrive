'use client'

import React, { useState } from 'react'
import Hero from './Hero'
import VehicleSlider from './VehicleSlider'
import Auth from './Auth'
import Navbar from '../common/Navbar'

const Public = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Navbar onLogin={() => setOpen(true)} />
      <Hero onLogin={() => setOpen(true)} />
      <VehicleSlider />
      <Auth open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default Public
