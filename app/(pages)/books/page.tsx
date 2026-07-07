import { books } from '@/app/data/books'
import CardsSlider from '@/components/pixel-perfect/cards-slider'
import ImageRevealList from '@/components/ui/image-reveal-list'
import React from 'react'

const BooksPage = () => {
  return (
    <div className='py-20'>
      <CardsSlider/>
      {/* <ImageRevealList
      items={books}
      /> */}
    </div>
  )
}

export default BooksPage
