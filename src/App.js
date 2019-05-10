import React from 'react'
import styled from 'styled-components'
import addExtensions from './extensions'
import './app.css'

addExtensions()
let start, end, _newPos, slides

//#region styled components
const Wrapper = styled.div`
  direction: ${ props => props.dir };
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
  background: #333;
`;

const Slider = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
`;

const SliderSlides = styled.div`
  position: relative;
  height: 100%;
  transition: -webkit-transform 0.6s cubic-bezier(0.51, 0.92, 0.24, 1);
  transition: transform 0.6s cubic-bezier(0.51, 0.92, 0.24, 1);
  will-change: transform;
`;

const SliderSlide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  height: 100vh;
  font-size: 5rem;
`;

const SliderDots = styled.div`
  display: flex;
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
`;

const SliderDot = styled.span`
  cursor: pointer;
  display: block;
  margin: 0 0.5em;
  width: 1em;
  height: 1em;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 100px;
`;

const SliderIndicator = styled(SliderDot)`
  width: auto;
  position: absolute;
  background: #fff;
`;

const SliderButtons = styled.div`
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${ props => (props.dir === 'rtl')? 'row-reverse' : 'row' }
  justify-content: space-between;
  position: absolute;
  z-index: 100;
  top: 50%;
  transform: translate(0, -50%);
`;

const NavArrow = styled.i`
  cursor: pointer;
  font-size: 3rem !important;
  color: #fff;
`;
//#endregion

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
      <SliderDot key={i + 1}
        onClick={doSlide(start, end, i, currentPos, setCurrentPos, setCurrentDir)}
      />
    ) : (
      <SliderSlide key={i + 1}
        style={{
          width: `${100 / sliderLength}%`,
          background: `#${color}`
        }}
      >
        Slide #{i + 1}
      </SliderSlide>
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
    <Wrapper>
      <Slider>
        <SliderSlides
          style={{
            width: `${sliderLength * 100}%`,
            transform: (dir === 'rtl')
              ? `translateX(${(sliderLength - 1 - currentPos) * (100 / sliderLength)}%)`
              : `translateX(-${currentPos * (100 / sliderLength)}%)`
          }}
        >
          {renderItems('slides',  start, end, currentPos, sliderLength)}
        </SliderSlides>
        <SliderDots>
            <SliderIndicator
              style={{
                [start]: `${currentPos * 2}rem`,
                [end]: `${(sliderLength - 1) * 2 - currentPos * 2}rem`,
                transition: (currentDir === 'left')
                  ? `left 0.3s cubic-bezier(0.51, 0.92, 0.24, 1.15), right 0.3s 0.1s cubic-bezier(0.51, 0.92, 0.24, 1.15)`
                  : `left 0.3s 0.1s cubic-bezier(0.51, 0.92, 0.24, 1.15), right 0.3s cubic-bezier(0.51, 0.92, 0.24, 1.15)`
              }}
            />
          {renderItems('dots', start, end, currentPos, sliderLength, setCurrentPos, setCurrentDir)}
        </SliderDots>
        <SliderButtons>
          <NavArrow className='material-icons backward' onClick={moveSlider(sliderLength, dir, 'backward', currentPos, setCurrentPos, setCurrentDir, start, end)}>arrow_back_ios</NavArrow>
          <NavArrow className='material-icons forward'  onClick={moveSlider(sliderLength, dir, 'forward', currentPos, setCurrentPos, setCurrentDir, start, end)}>arrow_forward_ios</NavArrow>
        </SliderButtons>
      </Slider>
    </Wrapper>
  )
}

export default App
