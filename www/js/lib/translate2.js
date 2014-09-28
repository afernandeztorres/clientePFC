

var Translate2 = function (local){
	
	this.localdefault = "es";
	
	this.local = local;
	
	this.Menu_Principal_es="Menu";
	this.Encuestas_es="Encuestas";	
	this.Realizar_encuestas_es="Realizar Encuestas";
	this.Tipo_es= "Categoría";
	this.Sub_es= "Encuesta";
	this.Nivel_es = "Nivel" ;
	this.Nivel_Defecto_es = "Nivel por Defecto" ;
	this.Encuesta_Aleatoria_es= "Encuesta Aleatoria";
	this.solicitar_es="Realizar la Encuesta";
	this.Si_es= "Sí"
	this.grafos_es="Ver la gráfica de resultados";
	this.tipoEncuesta_es = "Categoría";
	this.subTipoEncuesta_es = "Encuesta";
    this.irInicio_es = "Volver";
	
	
	
	this.Menu_Principal_uk="Main";	
	this.Encuestas_uk="Inquiries";	
	this.Realizar_encuestas_uk="Make Inquiries";
	this.Tipo_uk= "Category";
	this.Sub_uk= "Inquiry";
	this.Nivel_uk = "Level" ;
	this.Nivel_Defecto_uk = "Default level" ;
	this.Encuesta_Aleatoria_uk= "Random survey";
	this.solicitar_uk="Report the Inquiry";
	this.Si_uk="Yes";
	this.grafos_uk="Show graphic reports";
	this.tipoEncuesta_uk = "Category";
	this.subTipoEncuesta_uk = "Inquiry";
    this.irInicio_uk = "Back";
	
	this.Menu_Principal_component="#Menu_Principal";
	this.Encuestas_component="#Encuestas";
	this.Realizar_encuestas_component="#Realizar_encuestas";
	this.Tipo_component= "#Tipo";
	this.Sub_component= "#Sub";			
	this.Nivel_component="#Nivel";
	this.Nivel_Defecto_component="#Nivel_Defecto";
	this.Encuesta_Aleatoria_component="#Encuesta_Aleatoria";
	this.solicitar_component="#solicitar";
	this.Si_component="#Si";
	this.grafos_component="#grafos";
	this.tipoEncuesta_component = "#tipoEncuestaLabel";
	this.subTipoEncuesta_component = "#subTipoEncuestaLabel";
    this.irInicio_component = "#irInicio";

	
	this.translate2local=function () {
		
		
			var dictionary = new Translate2(this.local);

			$(dictionary.Encuestas_component).html(eval("dictionary.Encuestas_" +dictionary.local));
				$(dictionary.Menu_Principal_component).html(eval("dictionary.Menu_Principal_" +dictionary.local));
				$(dictionary.Realizar_encuestas_component).html(eval("dictionary.Realizar_encuestas_" +dictionary.local));
				$(dictionary.Tipo_component).html(eval("dictionary.Tipo_" +dictionary.local));
				$(dictionary.Sub_component).html(eval("dictionary.Sub_" +dictionary.local));
				$(dictionary.Nivel_component).html(eval("dictionary.Nivel_" +dictionary.local));
				$(dictionary.Nivel_Defecto_component).html(eval("dictionary.Nivel_Defecto_" +dictionary.local));
				$(dictionary.Encuesta_Aleatoria_component).html(eval("dictionary.Encuesta_Aleatoria_" +dictionary.local));
				$(dictionary.solicitar_component).html(eval("dictionary.solicitar_" +dictionary.local));
				$(dictionary.Si_component).html(eval("dictionary.Si_" +dictionary.local));
				$(dictionary.grafos_component).html(eval("dictionary.grafos_" +dictionary.local));
				$(dictionary.tipoEncuesta_component).html(eval("dictionary.tipoEncuesta_" +dictionary.local));
				$(dictionary.subTipoEncuesta_component).html(eval("dictionary.subTipoEncuesta_" +dictionary.local));
                $(dictionary.irInicio_component).html(eval("dictionary.irInicio_" +dictionary.local));
		}
		
}
