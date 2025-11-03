"use state"
import React from 'react'
import { HeroParallax } from './ui/hero-parallax';  
import { products } from '../lib/Product';  
export const HeroSection = () => {
  return (
    <div>
        <HeroParallax products={products}  />
    </div>
  )
}
