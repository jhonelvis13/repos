const valor1 = document.querySelector('.input1')
const valor2 = document.querySelector('.input2')
const botonSumar = document.querySelector(".boton")
const resultado = document.querySelector("#resultado")

function funcionSumar(){
    let res=valor1.value +valor2.value
    resultado.innerHTML(res)
}