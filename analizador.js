"use strict";  // ECMAScript 5 strict mode

// Produce una matriz de objetos token simples a partir de una cadena.
// Un objeto token simple contiene estos miembros:
// tipo: 'nombre', 'cadena', 'número', 'operador'
// valor: cadena o valor numérico del token
// from: índice del primer carácter del token
// a: índice del último carácter + 1

// Los comentarios son ignorados.

RegExp.prototype.bexec = function(s) {
  
  var li = this.lastIndex;
  var m = this.exec(s);
  
  if (m && m.index == li) 
    return m;
  return null;
}

String.prototype.tokens = function () {

    var from;                  
    var i = 0;                  
    var n;                     
    var m;                     
    var result = [];            

    var WHITES			= /\s+/g;
    var ONELINECOMMENT		= /[/][/].*/g;
    var MULTIPLELINECOMMENT 	= /[/][*](.|\n)*?[*][/]/g;
    var ID                  	= /[a-zA-Z_]\w*/g;
    var NUM                 	= /\b\d+(\.\d+)?(e[+-]?\d+)?\b/ig;
    var STRING              	= /('(\\.|[^'])*'|"(\\.|[^"])*")/g;
    var TWOCHAROPERATORS    	= /([+-\/%]=|[*]=|[+][+]|[-][-]|[=<>][=<>]|[&][&]|[|][|])/g;
    var ONECHAROPERATORS    	= /([+-\/%=~&|;:,<>!^{}()[\]]|[*])/g; // May be some character is missing?
    var tokens = [WHITES, ONELINECOMMENT, MULTIPLELINECOMMENT, 
		  ID, NUM, STRING, TWOCHAROPERATORS, ONECHAROPERATORS];

    // Make a token object.
    var make = function (type, value) {
        return {
            type: type,
            value: value,
            from: from,
            to: i
        };
    };

    var getTok = function() {
      var str = m[0];
      i += str.length; // Warning! side effect on i
      return str;
    };

    // Begin tokenization. If the source string is empty, return nothing.
    if (!this) return;

    // Loop through this text
    while (i < this.length) {
      
        tokens.forEach( function(t) { t.lastIndex = i;}); // Only ECMAScript5
        from = i;
	
        // Ignore whitespace and comments
        if (m = WHITES.bexec(this) || 
           (m = ONELINECOMMENT.bexec(this))  || 
           (m = MULTIPLELINECOMMENT.bexec(this))) { 
	  
	  getTok();     
	}
           
        // name.
        else if (m = ID.bexec(this)) {
	  
          result.push(make('name', getTok()));
        } 
        
        // number.
        else if (m = NUM.bexec(this)) {
          n = +getTok();

          if (isFinite(n)) {
            result.push(make('number', n));
          } else {
            make('number', m[0]).error("Bad number");
          }
        }
        
        // string
        else if (m = STRING.bexec(this)) {
            result.push(make('string', getTok().replace(/^["']|["']$/g,'')));
            
        } 
        
        // operators
        else if (m = TWOCHAROPERATORS.bexec(this) || (m = ONECHAROPERATORS.bexec(this))) {
            result.push(make('operator', getTok()));
        } 
        
        else {
	  
          throw " Syntax error: ('" + this.substr(i) + "') ";
        }
    }
    
    return result;
};