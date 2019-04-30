import React from 'react'
import addExtensions from './extensions'
import './app.css'

addExtensions()

const sliderLength = 10
const slides = Array.random({ count: sliderLength, stringOps: { len: 6, base: '0123456789ABCDF' } })

const doSlide = (newPos, currentPos, setCurrentPos, setCurrentDir) => e => {
  setCurrentDir(newPos > currentPos ? 'right' : 'left')
  setCurrentPos(newPos)
}

const renderItems = (
  type,
  currentPos = 0,
  setCurrentPos = v => v,
  setCurrentDir = v => v
) => {
  return slides.map((color, i) => {
    return type === 'dots' ? (
      <span
        key={i + 1}
        className='slider__dot'
        data-pos={i}
        onClick={doSlide(i, currentPos, setCurrentPos, setCurrentDir)}
      />
    ) : (
      <div
        key={i + 1}
        className='slider__slide'
        style={{
          width: `${100 / sliderLength}%`,
          background: `#${color}`
        }}
      >
        Slide #{i + 1}
      </div>
    )
  })
}

function App () {
  const [currentPos, setCurrentPos] = React.useState(0)
  const [currentDir, setCurrentDir] = React.useState('left')
  return (
    <div className='center'>
      <div className='slider'>
        <div
          className='slider__slides'
          style={{
            width: `${sliderLength * 100}%`,
            transform: `translateX(-${currentPos * (100 / sliderLength)}%)`
          }}
        >
          {renderItems('slides', currentPos)}
        </div>
        <div className='slider__dots'>
          <span
            className={`slider__indicator slider__indicator--${currentDir}`}
            style={{
              right: `${(sliderLength - 1) * 2 - currentPos * 2}rem`,
              left: `${currentPos * 2}rem`
            }}
          />
          {renderItems('dots', currentPos, setCurrentPos, setCurrentDir)}
        </div>
      </div>
    </div>
  )
}

export default App
