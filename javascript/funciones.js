function sumar (){
    var x=prompt("ingrese num1 ")
    var y=prompt("ingrese  num2 ")
    var total=Number(x)+parseInt(y)
    document.write(`el resultado es ${total}<br>`)//+ //'<br>')
}
var x=prompt("ingrese num1 ")
var y=prompt("ingrese  num2 ")
const resta=(x,y)=>{
    var total=Number(x) - parseInt(y)
    document.write(total)

}
const saludo=x=>{document.write(`<br>hola ${x}`)}
sumar()
resta(x,y)
saludo("elvis")