// CodeMirror, copyright (c) by Raúl Díaz Torres
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
	//mod(require("../../lib/codemirror"), require("../xml/xml"), require("../javascript/javascript"), require("../css/css"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
	//define(["../../lib/codemirror", "../xml/xml", "../javascript/javascript", "../css/css"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

	function kw(str) {
		var obj = {}, words = str.split(" ");
		for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
		return obj;
	}

	//var keywords = kw("ADDBUTTON ADDCODE ADDOPTION ASSIGN BUTTONOK CALLSRV DBADDFILTER DBEND DBINDEX DBINI DBENTITY DBORDER DBREMOTE DBSERIAL DBTABLE DEFAUX FIELDS FORMAT FORMATHEADER FORMEXPAND JSCHECK JSEND JSINI JSONLOAD JSONSUBMIT JSSELROW LANGUAGETRANSLATION NOCANCELBUTTON NOOKBUTTON ONCANCELFORM ONCHANGE PHPINI RELATIONFIELDS TAB TITLE WHERESELECT");
	var prevTag=null;
	var lineTag=null;

CodeMirror.defineMode("edes", function(config, parserConfig) {

return {
	startState: function() {
		return {
			inComment: false,
		};
	},
	token: function(stream,state) {
		if(stream.eatSpace()) return null;
		//console.log(stream);
		var style=null;

		// Comments
			if( stream.match(new RegExp("^[.]")) || stream.match('//') ){
				stream.skipToEnd();
				return "comment";
			}
			if( stream.match('/*') ){
				state.inComment=true;
				stream.skipTo('*/') || stream.skipToEnd();
				return "comment";
			}
			if( stream.match('*/') ){
				state.inComment=false;
				stream.eat('*/');
				return "comment";
			}
			if( state.inComment ){
				stream.next();
				return "comment";
			}

		var match = stream.match(new RegExp("^(\[[a-zA-Z]*\]\t*)"));
		if(match){
			this.lineTag=match[1];
			stream.eat(new RegExp("^(\[[a-zA-Z]*\]\t*)"));
			while(stream.eatSpace()){}
			if( stream.eol() ){
				this.prevTag=this.lineTag;
				this.lineTag=null;
			}
			return 'keyword strong';
		}else{

			if( this.lineTag!=null ){
				//var s=stream.string.substring(stream.start);
				var match = stream.match(new RegExp("([^|]+)"));
				if( match ){
					//stream.eat(new RegExp("([^|]+)"));
					this.prevTag=this.lineTag;
					this.lineTag=null;
					stream.skipToEnd();
					return "string";
				}
				
			}
			// stream.string.substring(stream.start)
			
			stream.skipToEnd();
			this.prevTag=this.lineTag;
			this.lineTag=null;
		}
		return null;
    }
  };
});

CodeMirror.defineMIME("text/x-edes","edes");

});
