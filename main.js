const $botones = document.getElementsByClassName("bt");

const btnEmpezar = document.getElementById("btnEmpezar");
const ULTIMO_NIVEL = 10;

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel, 500);
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.elegirColor = this.elegirColor.bind(this);
    btnEmpezar.classList.toggle("hide");
    this.nivel = 1;
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  siguienteNivel() {
    this.subnivel = 0;

    setTimeout(() => {
      this.agregarEventosClick();
    }, this.iluminarSecuencia());
  }

  iluminarSecuencia() {
    let tiempo_total = 0;
    for (let i = 0; i < this.nivel; i++) {
      tiempo_total = 1000 * i;
      setTimeout(() => this.iluminarColor(this.secuencia[i]), tiempo_total);
    }
    return tiempo_total;
  }

  iluminarColor(color) {
    $botones[color].classList.add("light");
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color) {
    $botones[color].classList.remove("light");
  }

  agregarEventosClick() {
    for (const $boton of $botones) {
      $boton.addEventListener("click", this.elegirColor);
    }
  }

  eliminarEventosClick() {
    for (const $boton of $botones) {
      $boton.removeEventListener("click", this.elegirColor);
    }
  }

  elegirColor(ev) {
    const numeroColor = parseInt(ev.target.dataset.number);
    this.iluminarColor(numeroColor);
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++;
      if (this.subnivel === this.nivel) {
        this.nivel++;
        this.eliminarEventosClick();
        if (this.nivel === ULTIMO_NIVEL + 1) {
          this.ganoElJuego();
        } else {
          setTimeout(this.siguienteNivel, 1500);
        }
      }
    } else {
      this.perdioElJuego();
    }
  }

  ganoElJuego() {
    swal("Platzi", "Felicitaciones, ganaste el juego!", "success").then(
      this.inicializar
    );
  }

  perdioElJuego() {
    swal("Platzi", "Lo lamentamos, perdiste :(", "error").then(() => {
      this.eliminarEventosClick();
      this.inicializar();
    });
  }
}

function empezarJuego() {
  window.juego = new Juego();
}
