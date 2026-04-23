'use client'

import React, { useState } from 'react'
import Hero from './Hero'
import VehicleSlider from './VehicleSlider'
import Auth from './Auth'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'

const Public = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Navbar onLogin={() => setOpen(true)} />
      <Hero onLogin={() => setOpen(true)} />
      <VehicleSlider />
      <Footer />
      <Auth open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default Public
