import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import homeIcon from './assets/Nav Icons/Home.png'
import aboutIcon from './assets/Nav Icons/About.png'
import contactIcon from './assets/Nav Icons/Contact.png'
import projectsIcon from './assets/Nav Icons/Projects.png'
import skillsIcon from './assets/Nav Icons/Skills.png'
import blogIcon from './assets/Nav Icons/Blog.png'
import cloverKingdomVideo from './assets/Clover Kingdom.mp4'
import zenitsuVideo from './assets/zenitsu.mp4'
import konohaVideo from './assets/KonohaGakure.mp4'
import narutoVideo from './assets/Naruto.mp4'
import gojoVideo from './assets/Gojo.mp4'

const imageAssets = [
  homeIcon,
  aboutIcon,
  contactIcon,
  projectsIcon,
  skillsIcon,
  blogIcon,
  'https://avatars.githubusercontent.com/u/144062193?v=4',
]

const videoAssets = [
  cloverKingdomVideo,
  zenitsuVideo,
  konohaVideo,
  narutoVideo,
  gojoVideo,
]

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = resolve
    image.onerror = () => reject(new Error(`Unable to load image: ${src}`))
    image.src = src
  })
}

function loadVideo(src) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.onloadeddata = resolve
    video.onerror = () => reject(new Error(`Unable to load video: ${src}`))
    video.preload = 'auto'
    video.src = src
    video.load()
  })
}

async function loadAssets() {
  await Promise.all([
    ...imageAssets.map(loadImage),
    ...videoAssets.map(loadVideo),
  ])
}

function renderApp() {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}

function renderLoadingState(message, isError = false) {
  document.getElementById('root').innerHTML = `
    <main class="startup-state${isError ? ' startup-state--error' : ''}" role="${isError ? 'alert' : 'status'}">
      <div class="startup-spinner" aria-hidden="true"></div>
      <p>${message}</p>
    </main>
  `
}

renderLoadingState('Loading portfolio assets…')

loadAssets()
  .then(renderApp)
  .catch((error) => {
    console.error(error)
    renderLoadingState('Some portfolio assets could not be loaded. Please refresh and try again.', true)
  })
