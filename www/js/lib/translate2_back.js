

var Translate2 = function (local){
	
	this.localdefault = "es";
	
this.local = local;

//------- INICIO Etiquetas castellano
this.Menu_Principal_es="Menu";
this.Encuestas_es="Encuestas";
this.Encuesta_es="Encuesta";
this.Category_es="Categoría"
//------ FIN Etiquetas castellano	

//------- INICIO Etiquetas Inglés
this.Menu_Principal_uk="Main Menu";	
this.Encuestas_uk="Polls";
this.Encuesta_uk="Poll";
this.Category_uk="Category";
//------ FIN Etiquetas Inglés


//------- INICIO Etiquetas Francés
this.Menu_Principal_fr="Menu Frances";	
this.Encuestas_fr="Encuestas Frances";
this.Encuesta_fr="Encuestè";
this.Category_fr="Categoriè";
//------ FIN Etiquetas Francés


//------- INICIO Etiquetas Italiano
this.Menu_Principal_it="Menu Italiano";	
this.Encuestas_it="Encuestas italiano";	
this.Encuesta_it="Encuestiii";
this.Category_it="Categoriii";
//------ FIN Etiquetas Italiano



	
	
	this.translate2local=function () {
		
		
			var dictionary = new Translate2(this.local);
			
				$(dictionary.Vot_component).html();
				
				$(dictionary.Menu_Principal_component).html();
				$(dictionary.Encuestas_component).html();

				
				$(dictionary.Encuestas_component).html(eval("dictionary.Encuestas_" +dictionary.local));
				$(dictionary.Menu_Principal_component).html(eval("dictionary.Menu_Principal_" +dictionary.local));
	        
				
		
		}	
}