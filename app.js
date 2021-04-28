document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')
  
    const width = 10
    let currentIndex = 0 //div en nuestra cuadrícula
    let appleIndex = 0 //div en nuestra cuadrícula
    let currentSnake = [2,1,0] 
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0
  
  
    // para comenzar y reiniciar el juego
    function startGame() {
      currentSnake.forEach(index => squares[index].classList.remove('snake'))
      squares[appleIndex].classList.remove('apple')
      clearInterval(interval)
      score = 0
      randomApple()
      direction = 1
      scoreDisplay.innerText = score
      intervalTime = 1000
      currentSnake = [2,1,0]
      currentIndex = 0
      currentSnake.forEach(index => squares[index].classList.add('snake'))
      interval = setInterval(moveOutcomes, intervalTime)
    }
  
  
    // función que se ocupa de los resultados de la serpiente
    function moveOutcomes() {
  
      //trata con la serpiente que golpea el borde y la serpiente que se golpea a sí mismo
      if (
        (currentSnake[0] + width >= (width * width) && direction === width ) || // si la serpiente toca fondo
        (currentSnake[0] % width === width -1 && direction === 1) || // si la serpiente golpea la pared derecha
        (currentSnake[0] % width === 0 && direction === -1) || // si la serpiente golpea la pared izquierda
        (currentSnake[0] - width < 0 && direction === -width) ||  // si la serpiente golpea la cima
        squares[currentSnake[0] + direction].classList.contains('snake') // si la serpiente entra en si misma
      ) {
        return clearInterval(interval) // esto borrará el intervalo si ocurre algo de lo anterior
      }
  
      const tail = currentSnake.pop() // elimina la última iteración de la matriz y la muestra
      squares[tail].classList.remove('snake')  // quita la clase de serpiente de la cola
      currentSnake.unshift(currentSnake[0] + direction) // da dirección al encabezado de la matriz
  
      // condicion para que la serpiente obtenga una manzana
      if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
      }
      squares[currentSnake[0]].classList.add('snake')
    }
  
  
    // genera una nueva manzana una vez que se come la manzana
    function randomApple() {
      do{
        appleIndex = Math.floor(Math.random() * squares.length)
      } while(squares[appleIndex].classList.contains('snake')) 
      squares[appleIndex].classList.add('apple')
    }
  
  
    // asignar funciones de teclas
    function control(e) {
      squares[currentIndex].classList.remove('snake')
  
      if(e.keyCode === 39) {
        direction = 1 // si presionamos la flecha derecha en nuestro teclado, la serpiente irá a la derecha
      } else if (e.keyCode === 38) {
        direction = -width // si presionamos la flecha hacia arriba, la serpiente subira
      } else if (e.keyCode === 37) {
        direction = -1 // si presionamos a la izquierda, la serpiente irá a la izquierda
      } else if (e.keyCode === 40) {
        direction = +width  // si presionamos hacia abajo, la cabeza de serpiente aparecerá instantáneamente en el div diez divs desde donde estás ahora
      }
    }
  
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
  })
  