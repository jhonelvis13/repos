class auto{
    constructor(placa,color,modelo,tamnio){
        this.placa=placa
        this.color= color
        this.modelo=modelo
        this.tamnio=tamnio
    }
    mostrarInfo(){
        return `Placa:  ${this.placa} <br>
            color: ${this.color}<br>
            modelo: ${this.modelo}<br>
            tamanio: ${this.tamnio}`
    }
    set NuevoColor(NuevoColor){
        this.color=NuevoColor
    }
    get NuevoColor(){
        return `nuevo color: ${this.NuevoColor}`

    }
}
class auto_elctrico extends auto{
    constructor(placa,color,modelo,tamnio, combustible,tiempoDeuso){
        super(placa,color,modelo,tamnio)
        this.combustible=combustible
        this.tiempoDeuso=tiempoDeuso
    }
    Encender(){
        return "el auto esta encendido"
    }
    Detenido(){
        return "el auto esta detenido"
    }
    Apagado(){
        return "el auto esta apagado"
    }
}
let aut = new auto(1234,"blanco","123","grande")
console.warn(aut)
aut.NuevoColor="verde"
console.log(aut)

let aut2 = new auto_elctrico(123,"rosado",123,"pequeno","motor-electrico",16)
console.log(aut2)
console.log(aut2.Apagado())
console.log(aut2.Detenido())
console.log(aut2.Encender())