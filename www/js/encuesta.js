/*
 * Author : Alberto Fernández
 * Target: PFC
 * Date: Aug'14
 */
 
var Encuesta = function(){
	
	this.idio = new Translate2("es");
	this.est = new Estilos("-c ", "c");
	
	//Título de la ventana de los mensajes emergentes
	this.tituloVentana='On-Encuestas';
	
	//Textos para los mensajes.
	this.msgNotSel 			= 'msgNotSel';
	this.msgEncVotada		= 'msgEncVotada';
	this.msgEncEnvOK		= 'msgEncEnvOK';
	this.msgEncEnvNOK		= 'msgEncEnvNOK';
	this.msgInicio 			= 'msgInicio';
	
	this.msgNotSel_es 			= 'Debe seleccionar una categoría y una encuesta para poder continuar';
	this.msgEncVotada_es		= 'Esta enucesta ya ha sido votada';
	this.msgEncEnvOK_es			= 'La encuesta se ha envidado correctamente';
	this.msgEncEnvNOK_es		= 'No se ha podido enviar la encuesta';
	this.msgInicio_es 			= 'Volver';

	this.msgNotSel_en 			= 'You must select a category and an inquiry';
	this.msgEncVotada_en		= 'This inquiry is already voted';
	this.msgEncEnvOK_en			= 'Inquiry sent succesfully';
	this.msgEncEnvNOK_en		= 'It was not possible to send the inquiry';
	this.msgInicio_en 			= 'Back';
		
	//Url A la que atacarán las peticioens Ajax.
	this.url= "http://afernandeztorres.ddns.net:8080/Encuestas/doEncuesta?";
	
	//Importamos la librería de las alertas customizadas incrustando el código en el HTML
	document.write('<script src="js/lib/jquery.alerts.js" type="text/javascript"><\/script>');
	
	/**
	 * Funcion que devuelve los tipos de encuesta o categorías.
	 */
	this.getTipos = function () {
		
		var idioma = this.idio.local;
		llamadaAjax (this.url+ "action=getTipos" , "&idioma="+idioma, 
				function (json){
						$.each(json, function (index, value){			
							//...Seteamos el subtipo y comprobamos que el tipo no este repetido 		
								$("#tipoEncuesta").append("<option  value='"+value.id_TipoEncuesta+"'>"+value.tipo+"</option>");
								
						});						
						$.mobile.changePage("#pageConfigurarEncuesta");
					});
	};
	
	
	/**
	 * Obtener subtipos
	 */
	this.getSubTipos = function () {
		
		var idioma = this.idio.local;
		llamadaAjax (this.url+ "action=getSubTipos" , "&tipoEncuesta="+$("#tipoEncuesta option:selected").val() + "&idioma="+idioma, 
				function (json){
						$("#subTipoEncuesta").html("");
						$("#subTipoEncuesta").append(" <option value='0'></option>");
						$.each(json, function (index, value){			
							//...Seteamos el subtipo y comprobamos que el tipo no este repetido 
							$("#subTipoEncuesta").append("<option value='"+value.id_Encuesta+"'>"+value.tipo+"</option>");
					
						});
						$.mobile.hidePageLoadingMsg("b","Cargando",false);
					});
	};
					
					
	/**
	 * Solicitar encuesta
	 */
	this.solicitarEncuesta = function () {	
	
		var estLocal = this.est.temaDefault;
		var idioma = this.idio.local;
			
			if ($("#tipoEncuesta").val()==0 || $("#subTipoEncuesta").val()==0 ){
				jAlert(this.getMsg(this.msgNotSel),this.tituloVentana);
				return false;
			} else if($.cookie('encuesta'+$('#subTipoEncuesta').val())){
				jAlert(this.getMsg(this.msgEncVotada),this.tituloVentana);
				return false;
			} else {
				
				llamadaAjax (this.url +"action=find" , $("#formSolicitar").serialize() + "&idioma=" + idioma , 
					
					function (json) {
						
						$.each (json.preguntas, function (index, value){
								
								var code =  "<div id='div"+index+"' data-role='page'  >" ;
											
									
								code    +=  '<div id="header" data-theme="a" data-role="header" data-position="fixed">'+			
											'<h3> '+
	            							'	ON-ENCUESTAS  '+
	            							'</h3> '+
	            							'</div> ';
											
	            				code    +=	" <center> <h2>"+value.pregunta+"</h2></center>"+
	            							"<div data-role='content'>" +
	            							"<form id='formu"+index+"' name='formu"+index+"' >";
											$.each(value.respuestas, function(subIndex, subValue){
												code += "<input id='radio"+subValue.id_Respuesta+"' data-theme='"+estLocal+"' name='"+subValue.id_Pregunta+"' value='"+subValue.id_Respuesta+"' type='radio'>"+
														"<label for='radio"+subValue.id_Respuesta+"'>"+subValue.respuesta+"</label>";
											});
											
								code    +=  "<br>" ; 
									
									if (index != (json.preguntas.length - 1)) code += "<a data-role='button' data-theme='"+estLocal+"' data-iconpos='bottom' data-icon='arrow-r' href='#div"+(index+1)+"'></a>";
									else code += "<a data-role='button' data-icon='check' data-iconpos='bottom' data-theme='"+estLocal+"' onClick='manager.sendEncuesta();'></a>";
									
								code    +=  "<a data-role='button' data-theme='"+estLocal+"' data-icon='delete' data-iconpos='bottom' onClick='manager.cancelEncuesta();'></a>";
								code    +=  "</form></div>";  
								code    +=  '<div data-theme="a" data-role="footer" data-position="fixed">'+
							        		'<h3> '+
	            							'	 '+
	            							'</h3> '+
	            							'</div> ';  
								code    +=  "</div>";
								
								$("body").append( code ) ;
						});
						
						$.mobile.changePage( "#div0" );
					
					});
			}
	};


	/**
	 * Solicitar encuesta
	 */
	this.solicitarGrafico = function () {	
		
		if ($("#tipoEncuesta").val()==0 || $("#subTipoEncuesta").val()==0 ){
			jAlert(this.getMsg(this.msgNotSel),this.tituloVentana);
			return false;
		}else {
			var estLocal = this.est.temaDefault;
			var idioma = this.idio.local;
			
			llamadaAjax (this.url+"action=grafico" , $("#formSolicitar").serialize() + "&idioma=" + idioma , 
					
				function (json) {
					$("#graficos").html("");
					$.each (json.preguntas, function (index, value){
							
							var code    =	" <br><center> <div id='grafico"+index+"' style='width:400px; height:225px;'></div> </center></br>";
							$("#graficos").append( code ) ;
							var comp = "#grafico"+index;
							var pre  = value.pregunta;
							var dataData = [];
							var dataAxis = [];
										$.each(value.respuestas, function(subIndex, subValue){
											
											dataData.push ([subValue.id_Respuesta, subValue.contador]);
											dataAxis.push ([subValue.id_Respuesta, subValue.respuesta]);
										});
										
										$.plot(
										   $(comp),
										   [
										    {
										      label: pre,
										      data: dataData,
										      bars: {
										        show: true,
										        barWidth: 0.2,
										        align: "center"
										      }   
										    }
										 ],
										 {
										   xaxis: {
										     ticks: dataAxis
										   }   
										 }
										);
	
							var code2     =  "<br><br><p style='padding=10px'></p><br><br>" ;									
							$( comp ).append( code2 ) ;
					});						
				});
			//Montamos el botón de ir a inicio
			var inicio	  =	 "<a  data-role='button' onClick='manager.cancelEncuesta();' data-theme='c' ddata-icon='check' data-iconpos='right'  data-mini='true'>"
							 + this.getMsg(this.msgInicio) + "</a>";	
			$("#botonInicio").append( inicio ) ;							
			$.mobile.changePage( "#pageGrafico" );
			return true;
		}
	};
		
	/**
	 *  Bot�n enviar encuesta
	 */
	this.sendEncuesta = function (){
			
		llamadaAjax (this.url+"action=add" , $("input[type=radio]:checked").serialize(), 
		
			function(json,document){
			if (json.error === "ok"){
				//No es capaz de usar el jAlert porque no debe tener el scope
				document.jAlert(this.getMsg(this.msgEncEnvOK),this.tituloVentana);
				$.cookie('encuesta'+$("#subTipoEncuesta").val(), $("#subTipoEncuesta").val(), { expires: 7 });
			}else{
				jAlert(this.getMsg(this.msgEncEnvNOK), this.tituloVentana);
			}
		});
		location.reload();
	};
	 
			
	 /**
	 *  Bot�n cancelar encuesta
	 */
	this.cancelEncuesta = function (){
		
			$.mobile.changePage( "#pageMenu" );
			location.reload();

	};
	
	
	/**
	 * Llamada ajax genérica
	 */
	 function llamadaAjax (url, data, succes){
	
		$.ajax({
			dataType: "jsonp",
			method: "GET",
			data: data,
			url: url,
			beforeSend : function (){
				$.mobile.showPageLoadingMsg("b","Cargando",false);
			},	
			success: succes
		});

	 };

			 
	/**
	 * Función para la traducción entre idiomas
	 */	 
	this.translate2 = function (local){	
			this.idio = new Translate2(local);
			this.idio.translate2local();
	};
	
	/*
	 * Funcion que nos devuleve los textos de las alertas dependiendo del mensaje.
	 */
	this.getMsg = function(label){
		
		var lang = this.idio.local;
		var texto = '';
		switch(label){
			
			case this.msgNotSel:
				texto = (lang=='es')?this.msgNotSel_es:this.msgNotSel_en;
				break;
			case this.msgEncVotada:
				texto = (lang=='es')?this.msgEncVotada_es: this.msgEncVotada_en;
				break;
			case this.msgEncEnvOK:
				texto = (lang=='es')?this.msgEncEnvOK_es: this.msgEncEnvOK_en;
				break;
			case this.msgEncEnvNOK:
				texto = (lang=='es')?this.msgEncEnvNOK_es: this.msgEncEnvNOK_en;
				break;
			case this.msgInicio:
				texto = (lang=='es')?this.msgInicio_es: this.msgInicio_en;
				break;
			default:
				texto = '';
		};
		return texto;		
	};
};
