document.addEventListener("DOMContentLoaded", () => {
    // Elementos principales
    const envelope = document.getElementById("envelope")
    const openButton = document.getElementById("openButton")
    const closeButton = document.getElementById("closeButton")
    const letterContainer = document.getElementById("letterContainer")
    const hearts = document.getElementById("hearts")
    const flowers = document.getElementById("flowers")
    const envelopeWrapper = document.querySelector(".envelope-wrapper")
  
    // Asegurarse de que la carta esté inicialmente cerrada
    envelope.classList.remove("open")
    letterContainer.classList.remove("show")
  
    // Función para abrir la carta
    function openLetter() {
      // Abrir el sobre
      envelope.classList.add("open")
  
      // Ocultar botón de abrir
      openButton.style.opacity = "0"
  
      // Esperar a que se complete la animación del sobre
      setTimeout(() => {
        // Hacer que el sobre se vea más pequeño
        envelopeWrapper.style.transform = "scale(0.5) translateY(50vh)"
        envelopeWrapper.style.opacity = "0.5"
  
        // Mostrar la carta
        letterContainer.classList.add("show")
  
        // Crear efectos decorativos
        createHearts()
        createFlowers()
  
        // Animar elementos de la carta
        const letterElements = document.querySelectorAll(".letter h2, .letter p, .signature")
        letterElements.forEach((el, index) => {
          el.style.opacity = "0"
          setTimeout(
            () => {
              el.classList.add("fadeInUp")
              el.style.animationDelay = `${index * 0.2}s`
              el.style.opacity = "1"
            },
            800 + index * 200,
          )
        })
      }, 800)
    }
  
    // Función para cerrar la carta
    function closeLetter() {
      // Ocultar la carta
      letterContainer.classList.remove("show")
  
      // Limpiar efectos
      hearts.innerHTML = ""
      flowers.innerHTML = ""
  
      // Restaurar el sobre
      setTimeout(() => {
        envelopeWrapper.style.transform = "scale(1) translateY(0)"
        envelopeWrapper.style.opacity = "1"
  
        setTimeout(() => {
          envelope.classList.remove("open")
          openButton.style.opacity = "1"
        }, 500)
      }, 500)
    }
  
    // Event listeners
    openButton.addEventListener("click", openLetter)
    closeButton.addEventListener("click", closeLetter)
  
    // Función para crear elementos con animación
    function createElementWithAnimation(element, parent, className, delay) {
      setTimeout(() => {
        element.style.opacity = "0"
        element.classList.add(className)
        parent.appendChild(element)
        setTimeout(() => {
          element.style.opacity = "1"
        }, 50)
      }, delay)
    }
  
    // Función para crear corazones
    function createHearts() {
      for (let i = 0; i < 30; i++) {
        const heart = document.createElement("div")
        heart.classList.add("heart")
  
        // Posición aleatoria
        heart.style.left = Math.random() * 100 + "%"
        heart.style.top = Math.random() * 100 + "%"
  
        // Tamaño aleatorio
        const size = Math.random() * 20 + 10
        heart.style.width = size + "px"
        heart.style.height = size + "px"
  
        // Ajustar los pseudo-elementos
        heart.style.setProperty("--size", size + "px")
  
        // Animación
        const duration = Math.random() * 5 + 3
        heart.style.animation = `float ${duration}s ease-in-out infinite`
        heart.style.animationDelay = Math.random() * 2 + "s"
  
        createElementWithAnimation(heart, hearts, "heart-animation", i * 100)
  
        // Animación con JavaScript
        let opacity = 0
        let posY = Number.parseFloat(heart.style.top)
  
        const animate = () => {
          if (opacity < 1) opacity += 0.01
          posY -= 0.3
  
          heart.style.opacity = opacity
          heart.style.top = posY + "%"
  
          if (posY > -10 && letterContainer.classList.contains("show")) {
            requestAnimationFrame(animate)
          } else {
            setTimeout(() => {
              if (hearts.contains(heart)) {
                hearts.removeChild(heart)
              }
            }, 1000)
          }
        }
  
        requestAnimationFrame(animate)
      }
    }
  
    // Función para crear flores
    function createFlowers() {
      const flowerColors = ["#ff9eb1", "#ffb6c1", "#ffc0cb", "#ff69b4", "#ff1493"]
  
      for (let i = 0; i < 25; i++) {
        const flower = document.createElement("div")
        flower.classList.add("flower")
  
        // Posición aleatoria fuera de la pantalla
        const side = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left
        let x, y
  
        switch (side) {
          case 0: // top
            x = Math.random() * 100
            y = -10
            break
          case 1: // right
            x = 110
            y = Math.random() * 100
            break
          case 2: // bottom
            x = Math.random() * 100
            y = 110
            break
          case 3: // left
            x = -10
            y = Math.random() * 100
            break
        }
  
        flower.style.left = `${x}%`
        flower.style.top = `${y}%`
  
        // Tamaño aleatorio
        const size = Math.random() * 30 + 20
        flower.style.width = `${size}px`
        flower.style.height = `${size}px`
  
        // Color aleatorio
        const color = flowerColors[Math.floor(Math.random() * flowerColors.length)]
  
        // Crear SVG de flor
        const svgSize = size
        const petalSize = svgSize / 2
        const svg = `
                  <svg width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="${svgSize / 2}" cy="${svgSize / 2}" r="${petalSize / 3}" fill="#FFEB3B" />
                      <ellipse cx="${svgSize / 2}" cy="${svgSize / 2 - petalSize / 2}" rx="${petalSize / 2}" ry="${petalSize / 2}" fill="${color}" />
                      <ellipse cx="${svgSize / 2 + petalSize / 2}" cy="${svgSize / 2}" rx="${petalSize / 2}" ry="${petalSize / 2}" fill="${color}" />
                      <ellipse cx="${svgSize / 2}" cy="${svgSize / 2 + petalSize / 2}" rx="${petalSize / 2}" ry="${petalSize / 2}" fill="${color}" />
                      <ellipse cx="${svgSize / 2 - petalSize / 2}" cy="${svgSize / 2}" rx="${petalSize / 2}" ry="${petalSize / 2}" fill="${color}" />
                  </svg>
              `
  
        flower.style.backgroundImage = `url('data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}')`
  
        // Animación
        const duration = Math.random() * 10 + 10
        const delay = Math.random() * 5
  
        flowers.appendChild(flower)
  
        // Animación con JavaScript
        setTimeout(() => {
          let progress = 0
          let opacity = 0
  
          const targetX = 40 + Math.random() * 20
          const targetY = 40 + Math.random() * 20
  
          const startX = Number.parseFloat(flower.style.left)
          const startY = Number.parseFloat(flower.style.top)
  
          const animate = () => {
            progress += 0.003
  
            if (progress <= 0.2) {
              opacity = progress * 5
            } else if (progress >= 0.8) {
              opacity = (1 - progress) * 5
            } else {
              opacity = 1
            }
  
            const currentX = startX + (targetX - startX) * progress
            const currentY = startY + (targetY - startY) * progress
  
            flower.style.left = `${currentX}%`
            flower.style.top = `${currentY}%`
            flower.style.opacity = opacity
            flower.style.transform = `rotate(${progress * 360}deg)`
  
            if (progress < 1 && letterContainer.classList.contains("show")) {
              requestAnimationFrame(animate)
            } else {
              if (flowers.contains(flower)) {
                flowers.removeChild(flower)
              }
            }
          }
  
          requestAnimationFrame(animate)
        }, delay * 1000)
      }
    }
  })
  