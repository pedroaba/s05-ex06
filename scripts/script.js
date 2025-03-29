const notifications = [
  {
    id: crypto.randomUUID(),
    title: "Alerta de entrega",
    message: "Você possui um armário reservado com entrega para hoje!"
  },
  {
    id: crypto.randomUUID(),
    title: "Alerta de entrega",
    message: "Você possui um armário reservado com entrega para hoje!"
  },
  {
    id: crypto.randomUUID(),
    title: "Alerta do financeiro",
    message: "Você possui uma pendência no financeiro..."
  }
]

const disciplines = [
  {
    id: crypto.randomUUID(),
    name: "Computação Gráfica",
    room: "Sala 1",
    time: "08:00"
  },
  {
    id: crypto.randomUUID(),
    name: "Arquitetura de Computadores",
    room: "Sala 2",
    time: "09:00"
  },
  {
    id: crypto.randomUUID(),
    name: "IHM - Interface Homem Máquina",
    room: "Sala 3",
    time: "10:00"
  }
]

const events = [
  {
      id: 1,
      title: 'Semana do Software 2025',
      date: '12/05',
      time: '10:00',
      location: 'Salão de Eventos',
      type: 'tech',
      description: 'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400'
  },
  {
      id: 2,
      title: 'Workshop de IoT',
      date: '12/01',
      time: '08:00',
      location: 'Laboratório CS&I',
      type: 'tech',
      description: 'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400'
  },
  {
      id: 3,
      title: 'Festa dos Alunos 2025',
      date: '18/05',
      time: '19:00',
      location: 'Área Esportiva do Inatel',
      type: 'cultural',
      description: 'Venha comemorar a melhor Festa dos Alunos de todos os tempos!',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400'
  },
  {
      id: 4,
      title: 'Feira de Oportunidades',
      date: '04/05',
      time: '10:00',
      location: 'Salão de Eventos',
      type: 'academic',
      description: 'Venha conhecer empresas e projetos com destaque na área da engenharia.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400'
  }
]

const themeKey = "theme"
const themes = {
  "light-inatel": {
    "--color-text-primary": "#0284c7",
    "--color-text-secondary": "#64748b",
    "--color-accent": "#51DEE0",
    "--color-content": "#ffffff",
    "--color-footer": "#0284c7",

    "--color-background": "#f5f5f5",
  },
  dark: {
    "--color-text-primary": "oklch(0.967 0.001 286.375)",
    "--color-text-secondary": "oklch(0.442 0.017 285.786)",
    "--color-accent": "#F58653",
    "--color-content": "oklch(0.274 0.006 286.033)",
    "--color-footer": "oklch(0.274 0.006 286.033)",

    "--color-background": "oklch(0.141 0.005 285.823)",
  }
}

let indexOfImageOnCarousel = 0;
let startXOnCarouselInMobile = 0;
let intervalId = null;

const timeToCarouselAnimation = 5;  // 5 seconds

function toMillis(seconds) {
  return seconds * 1000
}

function buildIdNotificationFor(notificationId) {
  return `notification-${notificationId}`
}

function appendNotifications() {
  const notificationContainer = document.getElementById('notification')
  for (const notification of notifications) {
    const notificationElement = `
      <div class="pending-card" id="${buildIdNotificationFor(notification.id)}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-octagon-alert"><path d="M12 16h.01"/><path d="M12 8v4"/><path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"/></svg>
        <div class="pending-content">
          <span class="pending-title ubuntu-bold">${notification.title}</span>
          <p class="pending-text ubuntu-regular">${notification.message}</p>
        </div>
      </div>
    `

    notificationContainer.innerHTML += notificationElement
  }
}

function appendDisciplines() {
  const disciplinesContainer = document.getElementById('disciplines')
  for (const discipline of disciplines) {
    const disciplineElement = `
      <div class="discipline-card">
        <div class="discipline-card-content">
          <div class="discipline-content">
            <span class="discipline-title ubuntu-bold">${discipline.name}</span>
            <p class="discipline-text ubuntu-regular">Sala: ${discipline.room}</p>
            <p class="discipline-text ubuntu-regular">Horário: ${discipline.time}</p>
          </div>
          <div class="discipline-buttons">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alarm-clock"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/></svg> 
          </div>
        </div>
      </div>
    `

    disciplinesContainer.innerHTML += disciplineElement
  }
}

function appendEvents() {
  const eventsContainer = document.getElementById("carousel")
  for (const event of events) {
    const eventElement = `
      <div class="card">
        <img src="${event.image}" alt="${event.title}">
        <div class="info">
          <h3>${event.title}</h3>
          <p>${event.description}</p>

          <div>
            <div class="card-details">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-clock"><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><path d="M17.5 17.5 16 16.3V14"/><circle cx="16" cy="16" r="6"/></svg>
              <p>${event.date} às ${event.time}</p>
            </div>
            <div class="card-details">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pinned"><path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"/><circle cx="12" cy="8" r="2"/><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"/></svg>
              <p>${event.location}</p>
            </div>
          </div>
        </div>
      </div>
    `

    eventsContainer.innerHTML += eventElement
  }
}

function handleThemeChange(theme) {
  const root = document.documentElement
  const selectedTheme = themes[theme]

  if (!selectedTheme) {
    return
  }

  for (const [key, value] of Object.entries(selectedTheme)) {
    root.style.setProperty(key, value)
  }

  localStorage.setItem(themeKey, theme)
}

function addListeners() {
  document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("active")
  })

  document.addEventListener("click", function (event) {
    const sidebar = document.getElementById("sidebar")
    const menuButton = document.getElementById("menu-toggle")
    
    if (!sidebar.contains(event.target) && !menuButton.contains(event.target)) {
      sidebar.classList.remove("active") 
    }
  })

  document.getElementById("light").addEventListener("click", () => {
    handleThemeChange("light-inatel")
  })

  document.getElementById("dark").addEventListener("click", () => {
    handleThemeChange("dark")
  })

  document.addEventListener("DOMContentLoaded", function () {
    const theme = localStorage.getItem(themeKey)
    handleThemeChange(theme || "light-inatel")
  })
}

function nextCard() {
  indexOfImageOnCarousel = (indexOfImageOnCarousel + 1) % events.length
  updateCarousel()
}

function prevCard() {
  indexOfImageOnCarousel = (indexOfImageOnCarousel - 1 + events.length) % events.length
  updateCarousel()
}

function updateCarousel() {
  const carousel = document.getElementById("carousel")
  carousel.style.transform = `translateX(-${indexOfImageOnCarousel * 100}%)`

  if (intervalId) {
    clearInterval(intervalId)
  }

  intervalId = setInterval(nextCard, toMillis(timeToCarouselAnimation))
}

function handleTouchStart(event) {
  startXOnCarouselInMobile = event.touches[0].clientX
}

function handleTouchEnd(event) {
  const endX = event.changedTouches[0].clientX
  if (startXOnCarouselInMobile - endX > 50) nextCard()
  if (endX - startXOnCarouselInMobile > 50) prevCard()
}

function handleStartCarouselAnimation() {
  const carousel = document.getElementById("carousel")

  intervalId = setInterval(nextCard, toMillis(timeToCarouselAnimation))
  carousel.addEventListener("mouseenter", () => clearInterval(intervalId))
  carousel.addEventListener("mouseleave", () => {
    intervalId = setInterval(nextCard, toMillis(timeToCarouselAnimation))
  })
}

function addListenersToCarousel() {
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const carousel = document.getElementById("carousel")

  prevBtn.addEventListener("click", prevCard)
  nextBtn.addEventListener("click", nextCard)

  carousel.addEventListener("touchstart", handleTouchStart)
  carousel.addEventListener("touchend", handleTouchEnd)
}

function bootstrap() {
  appendNotifications()
  appendDisciplines()
  appendEvents()
  addListenersToCarousel()
  handleStartCarouselAnimation()

  addListeners()
}

bootstrap()
