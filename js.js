
//objeto calculadora
var Calculadora = function() {
    //atributos del objeto calculadora
      var self = this;
      this._resultado_acumulado = 0;
      this._saveMemory = [];
    //metodos del objeto calculadora 
      this._operaciones = {
        sumar: function(valor) {
          self._resultado_acumulado += valor;
          self._resultado();
        },
        restar: function(valor) {
          self._resultado_acumulado -= (valor);
          self._resultado();
        },
        multiplicar: function(valor) {
          self._resultado_acumulado *= valor;
          self._resultado();
        },
        dividir: function(valor) {
          if (valor === 0) {
            document.getElementById("operacion").value = "";
            throw('Error al intentar divir por cero');
          }
          self._resultado_acumulado = self._resultado_acumulado/valor;
          self._resultado();
        },
        dividir2: function(valor){
          if (valor[1] == 0) {
            document.getElementById("operacion").value = "";
            throw('Error al intentar divir por cero');
          }
          else{
            self._resultado_acumulado += valor[0]/valor[1];
            self._resultado();
          }
        }
      };
    };
    //prototype es una propiedad que contiene un objeto en el que se definen los miembros que se desea que se hereden.
    // actúa como un objeto plantilla que hereda métodos y propiedades.
    //info --> https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects/Object_prototypes
    Calculadora.prototype.calcular = function () {
    };
    //metodo usar llama al metodo _operaciones dentro de calculadora, pasando como parametro un indice y devuelve un estado nuevo de la instancia de clase.
    Calculadora.prototype.usar = function (operacion) {
      this.calcular = this._operaciones[operacion];
      return this;
    };
    //limpia el resultado acumulado y borra los caracteres escritos en el html.
      Calculadora.prototype.limpiar = function () {
      this._resultado_acumulado = 0;
      // se ubica los elementos con sus respectivos id en el HTML y se les asigna "" (vacio).
      document.getElementById("resultado").value="";
      document.getElementById("operacion").value="";
      this._resultado();
    };
    //asigna el valor alojado en la propiedad _resultado acumulado al elemento (etiqueta) con id "resultado" en HTML.
    Calculadora.prototype._resultado = function () {
      document.getElementById("resultado").value = this._resultado_acumulado;
    
    };
    //si el atributo _memoria esta vacio se asigna el valor acumulado, sino asigna el valor contenido en memoria al acumulado y se vacia la memoria. 
    Calculadora.prototype.memorizar = function() {
      if (this._memoria === undefined) {
        this._memoria = this._resultado_acumulado;
      } else {
        this._resultado_acumulado = this._memoria;
        this._memoria = undefined;
      };
    };
    
    //-----------------------------------------------------------------
    //global
      var miCalculadora = new Calculadora();        //instaciacion de un nuevo objeto tipo calculadora.
      var memoria = [];                             //instaciacion de un objeto tipo array.
    //---------------------------------------------------------------
      //mi codigo
    
    //funcion flecha. info --> https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions
      function accionSumar(){
        ope = document.getElementById("operacion").value;//toma los valores del HTML atravez de sus respectivos Id.
        result = document.getElementById("resultado").value;
        if(ope.indexOf("+")==0){                  //si el signo "+" se encuentra al inicio del string toma los valores que le siguen y se los pasa al metodo usar.calcular
          miCalculadora.usar('sumar').calcular(parseInt(ope.substring(1,ope.length)));
          document.getElementById("operacion").value = "";//limpia el contenido del elemento "operacion".
          accionGuardar(result+ope+"="+eval(result+ope));//llama a la funcion que guarda dentro del array "memoria" la operacion realizada.
        }
        else if (ope.lastIndexOf("+")>0){         //ubica si el string de operacion contiene mas de un operador "+"
          list = ope.split("+");                 //parte el string en subcadenas que contengan unicamente los nros ingresados y los guarda en una "lista" (array)
          suma = parseInt(list[0])+parseInt(list[1]); //suma los valores individuales de la "lista" y los acumula en una unica variable.
          accionGuardar(ope+"="+suma);
          accionLimpiar();                              //limpia el contenido de resultado
    
          miCalculadora.usar('sumar').calcular(suma);  //pasa el valor de la suma a la propiedad _resultado_acumulado
          document.getElementById("operacion").value = "";
        }
        else if (ope.lastIndexOf("-")>0){accionRestar();}       //ubica si el string de operacion contiene algun o mas de un operador "-"
        else if (ope.lastIndexOf("*")>0){accionMultiplicar();}  //ubica si el string de operacion contiene algun o mas de un operador "*"
        else if (ope.lastIndexOf("/")>0){accionDividir();}      //ubica si el string de operacion contiene algun o mas de un operador "/"
        else{
          document.getElementById("operacion").value += "+";
        }
      }
    //-----------------------------------------------------------------
    
    //repite el proceso aplicado en "accionSumar" pero inicndo con la busqueda del signo "-"
      function accionRestar(){
        restar = document.getElementById("operacion").value;
        result = document.getElementById("resultado").value;
    
        if(restar.indexOf("-")==0){
          miCalculadora.usar('restar').calcular(parseInt(restar.substring(1,restar.length)));
          document.getElementById("operacion").value = "";
          accionGuardar(result+restar+"="+eval(result+restar));
        }
        else if (restar.lastIndexOf("-")>0){
          list = restar.split("-");
          resta = parseInt(restar[0])-parseInt(list[1]);
          accionGuardar(restar+"="+resta);
          accionLimpiar();
          miCalculadora.usar('sumar').calcular(parseInt(resta));
          document.getElementById("operacion").value = "";
        }
        else if(restar.indexOf("+")>=0){accionSumar();}
        else if (restar.lastIndexOf("*")>0){accionMultiplicar();}
        else if (restar.lastIndexOf("/")>0){accionDividir();}
        else{
          document.getElementById("operacion").value += "-";
        }
      }
      //-----------------------------------------------------------------
    
    //repite el proceso aplicado en "accionSumar" pero inicndo con la busqueda del signo "*"
     function accionMultiplicar(){
        mult = document.getElementById("operacion").value;
        result = document.getElementById("resultado").value;
    
        if(mult.indexOf("*")==0){
          miCalculadora.usar('multiplicar').calcular(parseInt(mult.substring(1,mult.length)));
          document.getElementById("operacion").value = "";
          accionGuardar(result+mult+"="+eval(result+mult));
        }
        else if(mult.lastIndexOf("*")>=1){
          lista = mult.split("*");
          multiplicacion = parseInt(lista[0])*parseInt(lista[1]);
          accionGuardar(mult+"="+multiplicacion);
          accionLimpiar();
          miCalculadora.usar("multiplicar").calcular(multiplicacion);
          document.getElementById("operacion").value = "";
        }
        else if(mult.indexOf("+")>=0){accionSumar();}
        else if(mult.indexOf("-")>=0){accionRestar();}
        else{
          document.getElementById("operacion").value += "*";
        }
      }
    //-----------------------------------------------------------------
    
    //repite el proceso aplicado en "accionSumar" pero inicndo con la busqueda del signo "/"
      function accionDividir(){
        dividir = document.getElementById("operacion").value;
        result = document.getElementById("resultado").value;
    
        if(dividir.indexOf("/")==0){
          miCalculadora.usar('dividir').calcular(parseInt(dividir.substring(1,dividir.length)));
          document.getElementById("operacion").value = "";
          accionGuardar(result+dividir+"="+eval(result+dividir));
        }
        else if(dividir.lastIndexOf("/")>=1){
          lista = dividir.split("/");
          division = parseInt(lista[0])/parseInt(lista[1]);
          accionGuardar(dividir+"="+division);
          accionLimpiar();
          miCalculadora.usar("dividir2").calcular(lista);
          document.getElementById("operacion").value = "";
        }
        else if(dividir.indexOf("+")>=0){accionSumar();}
        else if(dividir.indexOf("-")>=0){accionRestar();}
        else if(dividir.indexOf("*")>=0){accionMultiplicar();}
        else{
          document.getElementById("operacion").value += "/";
        }
      }
    //-----------------------------------------------------------------
    //busca el primer signo operador que exista dentro del string y llama a la funcion correspondiente
     function accionIgual(){
        var igualdad = document.getElementById("operacion").value;
        if(igualdad.indexOf("/")>=0){accionDividir();}
        else if(igualdad.indexOf("+")>=0){accionSumar();accionMostrar();}
        else if(igualdad.indexOf("-")>=0){accionRestar();accionMostrar();}
        else if(igualdad.indexOf("*")>=0){accionMultiplicar();accionMostrar();}
        else if(igualdad.indexOf("/")>=0 || igualdad.indexOf("/")<0){accionDividir();accionMostrar();}
        
        //accionMostrar();
      }
    //-----------------------------------------------------------------
    //inserta al final del array "memoria" el valor recibido.
      accionGuardar = (valor) =>{
        memoria.push(valor);
      }
    //------------------------------------------------------------------
    //muestra el contenido del array "memoria" creando un nuevo elemento en el HTML asignandole un estilo
      function  accionMostrar(){
        muestra = document.getElementById("operacion").value;
        resultado = document.getElementById("resultado").value;
    
        contenido = document.createElement("h4"); //crea una nueva etiqueta h4 y se la asigna a la variable contenido
        contenido.style.textAlign = "center";     //alinea el contenido de la etiqueta al centro
        contenido.style.color = "while";          //color del texto
        contenido.innerText= memoria[memoria.length-1]; //asigna el contenido del array al nuevo elemento
        var bloque = document.getElementById("container-history"); //selecciona el elemento al cual se le va a enviar el contenido
        bloque.appendChild(contenido); //agrega el contenido al elemento seleccionado
      }
    
    function accionLimpiar(){miCalculadora.limpiar();}

