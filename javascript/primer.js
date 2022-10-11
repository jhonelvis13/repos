var num1 = 1
//var num2 = prompt("ingrese num2 ")
//let nombre = prompt("ingrese nombre: ")
//var total = Number(num1)+ Number(num2)
//console.log(total)
//document.write(total)
//alert(`hola ${nombre}`)
////if(num1 == Number(num2)){
//    document.write(true)
//}else if(num1< 100){
//    document.write(`el numero es ${num1}`)
//}else{
//    document.write(false)}
//
switch (num1){
    case 1:
        document.write(`el numero es ${num1}`)
    case 2:
        if (num1%2==0){
            document.write(`el numero es par ${num1}`)
        }else{
            document.write(`el numero es impar ${num1}`)
        }
    default:
        document.write(`no existe el caso ${num1}`)
}