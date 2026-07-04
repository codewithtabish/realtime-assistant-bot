import { books } from '@/app/data/books'
import ImageRevealList from '@/components/ui/image-reveal-list'
import React from 'react'

const BooksPage = () => {
  return (
    <div className='py-20'>
      <ImageRevealList
      items={books}
      />
    </div>
  )
}

export default BooksPage
