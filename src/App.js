import React from 'react'
import addExtensions from './extensions'
import './app.css'

addExtensions()
let start, end
const sliderLength = 5
const slides = Array.random({ count: sliderLength, stringOps: { len: 6, base: '0123456789ABCDF' } })

const doSlide = (start, end, newPos, currentPos, setCurrentPos, setCurrentDir) => e => {
  setCurrentDir(newPos > currentPos ? end : start)
  setCurrentPos(newPos)
}

const renderItems = (
  type,
  start,
  end,
  currentPos = 0,
  setCurrentPos = v => v,
  setCurrentDir = v => v
) => {
  return slides.map((color, i) => {
    return type === 'dots' ? (
      <span
        key={i + 1}
        className='slider__dot'
        onClick={doSlide(start, end, i, currentPos, setCurrentPos, setCurrentDir)}
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

function App ({ dir = 'rtl' }) {
  start = (dir === 'rtl') ? 'right' : 'left'
  end = (dir === 'rtl') ? 'left' : 'right'
  const [currentPos, setCurrentPos] = React.useState(0)
  const [currentDir, setCurrentDir] = React.useState(start)
  return (
    <div className='center' style={{ direction: dir }}>
      <div className='slider'>
        <div
          className='slider__slides'
          style={{
            width: `${sliderLength * 100}%`,
            transform: (dir === 'rtl')
              ? `translateX(${(sliderLength - 1 - currentPos) * (100 / sliderLength)}%)`
              : `translateX(-${currentPos * (100 / sliderLength)}%)`
          }}
        >
          {renderItems('slides', currentPos)}
        </div>
        <div className='slider__dots'>
          <span
            className={`slider__indicator slider__indicator--${currentDir}`}
            style={{
              [start]: `${currentPos * 2}rem`,
              [end]: `${(sliderLength - 1) * 2 - currentPos * 2}rem`
            }}
          />
          {renderItems('dots', start, end, currentPos, setCurrentPos, setCurrentDir)}
        </div>
      </div>
    </div>
  )
}

export default App
