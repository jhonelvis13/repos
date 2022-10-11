package com.unibe.teoriaCompiladores.analizadorLexico;

import static com.unibe.teoriaCompiladores.analizadorLexico.Tokens.*;
%%
%class AnalizadorJFlex
%type Tokens
D=(("-"){0,1}([0-9])(("."){0,1}[0-9]+)*)
Esp=[\ \t\r\n]
PA="("
PC=")"
OP=("-"|"*"|"+"|"/"|"^")
EXPR1={PA}{1} {D}+ ({OP}{1}{D}+)+ {PC}

%{
public String Tipo;
%}
%%
"+" {return SUMA;}
"-" {return RESTA;}
"." {return PUNTO;}
"*" {return MULTIPLICACION;}
"/" {return DIVISION;}
"^" {return POTENCIA;}
{PA} {return PARENT_APERTURA;}
{PC} {return PARENT_CIERRE;}

{D}+{Esp}* {Tipo=yytext(); return NUMERO;}
{Esp} {Tipo=yytext(); return SEPARADOR;}

{D}+({OP}{1}{D}+)+{Esp}* {Tipo=yytext(); return VALIDO;}
{PA}{1} ({D}+ {OP}{1} {D}+)+ {PC}{1} {Esp}* {Tipo=yytext(); return VALIDO;}
{PA}{1} ({D}+ {OP}{1})* {PA}{1} ({D}+ {OP}{1} {D}+)+ {PC}{1} ({OP}{1} {D}+)* {PC} {Esp}* {Tipo=yytext(); return VALIDO;}

({D}+{OP}{1})+({PA}{D}+{OP}{1}{D}+{PC})+({OP}{1}{D}+)* {Esp}* {Tipo=yytext(); return VALIDO;}
{PA}{PA}{D}+{OP}{1}{D}+{PC}({OP}{1}{PA}{D}+{OP}{1}{D}+{PC})*{PC} {Esp}* {Tipo=yytext(); return VALIDO;}
{PA}{D}+{OP}{1}{D}+{PC}({OP}{1}{PA}{D}+{OP}{1}{D}+{PC})* {Esp}* {Tipo=yytext(); return VALIDO;} 
{EXPR1}{1}({OP}{0,1} {EXPR1}+)* {Esp}* {Tipo=yytext(); return VALIDO;}
(({D}+{OP}{1})*{EXPR1}{1}({OP}{0,1} {EXPR1}+)*({OP}{1}{D}+)*)+ {Esp}* {Tipo=yytext(); return VALIDO;}

.* {return ERROR;}

