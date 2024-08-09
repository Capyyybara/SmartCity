import { useEffect, useRef, useState, FC } from 'react'
import './App.css'
import { initCity } from './enter'

function App() {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    initCity(canvas.current!);
  }, [])
  return (
    <>
      <canvas id='webgl' ref={canvas}>浏览器不支持canvas,请切换浏览器</canvas>
    </>
  )
}

export default App
