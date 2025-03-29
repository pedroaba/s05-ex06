class ClassesComponent extends HTMLElement {
  #today = "ter"

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  getBadgeColor(grade) {
    if (grade >= 8) {
      return 'green'
    } 
    
    if (grade >= 6 && grade < 8) {
      return 'orange' 
    }
    
    return 'red' 
  }

  connectedCallback() {
    this.loadClasses()
  }

  render(classes) {
    const classesToday = classes.filter(c => c.date === this.#today)

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'css/component.css'
    this.shadowRoot.appendChild(link)

    this.shadowRoot.innerHTML += `
    <div>
      ${classesToday.map(c => {
        const testToDisplay = c.exam_alert ? '' : 'display: none;'
        const badgeColor = this.getBadgeColor(c.grade)

        return `
          <div class="container">
            <div class="exam_date ubuntu-light" style="${testToDisplay}">PROVA: <b>${c.exam}</b></div>
            <div class="subject ubuntu-medium">${c.subject}</div>
            <p class="location ubuntu-regular">Local e Horário: <b>${c.location} - ${c.time}</b></p>
            <div class="badge-container">
              <div class="badge ubuntu-bold">FALTAS: <b>${c.attendance}</b></div>
              <div class="badge ubuntu-bold ${badgeColor}">CR: <b>${c.grade}</b></div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
  }

  async loadClasses() {
    try {
      const response = await fetch("/assets/classes.json")
      const classes = await response.json()

      this.render(classes)
      new Notification('Classes loaded', {
        body: 'Classes were loaded successfully'
      })
    } catch {
      if (Notification.permission === 'granted') {
        new Notification('Error', {
          body: 'Something went wrong while loading classes'
        })
      }
    }
  }
}

customElements.define('classes-component', ClassesComponent)
