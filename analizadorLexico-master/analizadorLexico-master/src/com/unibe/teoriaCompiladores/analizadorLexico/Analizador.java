/*
 * Proyecto del Analizador Léxico.
 * - Interface Gráfica para Analizar expresiones aritméticas.
 * - Panel izquierdo consiste en un editor de texto para introducir las expresiones que se van a validar. La cantidad máxima de expresiones que podrá evaluar su programa son 10.
 * - Panel Derecho consiste en el Visor de Resultados de los componentes léxicos (tokens) identificados por su programa.
 * - final de cada grupo de tokens, deberá notificar si la expresión es Válida o Incorrecta. 
 */
package com.unibe.teoriaCompiladores.analizadorLexico;

import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.TreeMap;

/**
 *
 * @author fernando
 */
public class Analizador {
    
    public static final int MAX_EXPRESIONES = 10;
    
    /**
     * Metodo para analizar expresiones lexica
     * @param expresiones arreglo para obtener las expresiones a evaluar, obtendra un maximo de 'MAX_EXPRESIONES' expresiones
     * @return expAnalizadas son las expresiones analizadas, es un hashMap que tendrá el mismo orden que las expresiones que están como parámetros
     * @author Lorenzo Alejo y Luis Peralta
    */
    public static TreeMap<String,List<String>> analizarExpresiones(List<String> expresiones) throws IOException{
        
        
        TreeMap<String, List<String>> expAnalizadas = new TreeMap<>();
        String analisis;
        int count = 0;
        for (String expresion: expresiones){
           //TODO: poner la parte a analizar aqui
            AnalizadorJFlex analizador = new AnalizadorJFlex(new StringReader(expresion));
            List<String> tokens = new ArrayList<>();
            for(int i=0;i<expresion.length();i++){
                if(expresion.charAt(i)>='0' && expresion.charAt(i)<='9'){
                        AnalizadorJFlex analizer = new AnalizadorJFlex(new StringReader(String.valueOf(expresion.charAt(i))));
                        tokens.add(analizer.yylex().toString());
                        //System.out.println(analizer.yylex());
                }
                if(expresion.charAt(i)=='+' || expresion.charAt(i)=='-' || expresion.charAt(i)=='*' || expresion.charAt(i)=='/' || expresion.charAt(i)=='^' || expresion.charAt(i)  == '.' || expresion.charAt(i) == '(' || expresion.charAt(i) == ')')
                {
                        AnalizadorJFlex analizer = new AnalizadorJFlex(new StringReader(String.valueOf(expresion.charAt(i))));
                        tokens.add(analizer.yylex().toString());
                        //System.out.println(analizer.yylex());
                }
                if(expresion.charAt(i)==' ')
                {
                        AnalizadorJFlex analizer = new AnalizadorJFlex(new StringReader(String.valueOf(expresion.charAt(i))));
                        tokens.add(analizer.yylex().toString());
                        //System.out.println(analizer.yylex());
                }
            }
            tokens.add(analizador.yylex().toString());
            
            ++count;
            expAnalizadas.put("Exp: #" + count + ": " + expresion, tokens);
            
            //System.out.println("Expresion Regular="+analizador.yylex());
            
            //end: poner la parte a analizar aqui
            
            if (count == MAX_EXPRESIONES) break;
        }
        return expAnalizadas;
    }
    
    /**
     * Metodo para genera clase para analizador lexico JFlex
     * Nota: Este metodo solo servirá para generar la última clase a utilizar para analisis, ver "lexer.flex" para referencias
     * @author Fernando Perez
    */
    public static void generadorLexer()
    {
        //String os = System.getProperty("os.name");
        File file = new File("./src/com/unibe/teoriaCompiladores/analizadorLexico/lexer.flex");
        jflex.Main.generate(file);
	//JFlex.Main.generate(file);
    }
    
}
