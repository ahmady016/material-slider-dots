import React from 'react'
import addExtensions from './extensions'
import './app.css'

addExtensions()
let start, end, _newPos, slides

const doSlide = (start, end, newPos, currentPos, setCurrentPos, setCurrentDir) => e => {
  setCurrentDir(newPos > currentPos ? end : start)
  setCurrentPos(newPos)
}

const moveSlider = (sliderLength, sliderDir, buttonDir, currentPos, setCurrentPos, setCurrentDir, start, end) => (e) => {
  if ( (buttonDir === 'backward' && sliderDir === 'ltr') || (buttonDir === 'forward' && sliderDir === 'rtl') )
    _newPos = ((currentPos-1) < 0) ? sliderLength-1 : currentPos-1
  else if ( (buttonDir === 'forward' && sliderDir === 'ltr') || (buttonDir === 'backward' && sliderDir === 'rtl') )
    _newPos = ((currentPos+1) === sliderLength) ? 0 : currentPos+1
  doSlide(start, end, _newPos, currentPos, setCurrentPos, setCurrentDir)()
}

const renderItems = (
  type,
  start,
  end,
  currentPos = 0,
  sliderLength,
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

function App ({ dir = 'rtl', sliderLength = 5 }) {
  start = (dir === 'rtl') ? 'right' : 'left'
  end = (dir === 'rtl') ? 'left' : 'right'
  const [currentPos, setCurrentPos] = React.useState(0)
  const [currentDir, setCurrentDir] = React.useState(start)
  React.useMemo(() => {
    slides = Array.random({ count: sliderLength, stringOps: { len: 6, base: '0123456789ABCDF' } })
  }, [sliderLength])
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
          {renderItems('slides',  start, end, currentPos, sliderLength)}
        </div>
        <div className='slider__dots'>
          <span
            className={`slider__indicator slider__indicator--${currentDir}`}
            style={{
              [start]: `${currentPos * 2}rem`,
              [end]: `${(sliderLength - 1) * 2 - currentPos * 2}rem`
            }}
          />
          {renderItems('dots', start, end, currentPos, sliderLength, setCurrentPos, setCurrentDir)}
        </div>
        <div className='slider-buttons' style={{ flexDirection: (dir === 'rtl')? 'row-reverse' : 'row' }}>
          <i class='material-icons backward'  onClick={moveSlider(sliderLength, dir, 'backward', currentPos, setCurrentPos, setCurrentDir, start, end)}>arrow_back_ios</i>
          <i class='material-icons forward'   onClick={moveSlider(sliderLength, dir, 'forward', currentPos, setCurrentPos, setCurrentDir, start, end)}>arrow_forward_ios</i>
        </div>
      </div>
    </div>
  )
}

export default App
