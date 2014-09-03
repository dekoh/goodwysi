/*
getSelection: function () {
 	if (this.setSelectionRange){
 		return this.value.substring(this.selectionStart, this.selectionEnd);
 		}
 	else if (document.selection) {
 		this.focus();
 		return document.selection.createRange().text;
 	}
 }
  getSelectionStart: function() {
 	if ( typeof this.selectionStart != 'undefined' ){
 		return this.selectionStart;
 		}
 	// IE Support
 	this.focus();
 	var range = this.createTextRange();
 	range.moveToBookmark(document.selection.createRange().getBookmark());
 	range.moveEnd('character', this.value.length);
 	return this.value.length - range.text.length;
 }
  getSelectionEnd: function() {
	if ( typeof this.selectionEnd != 'undefined' )
 		return this.selectionEnd;
 	// IE Support
 	this.focus();
 	var range = this.createTextRange();
 	range.moveToBookmark(document.selection.createRange().getBookmark());
 	range.moveStart('character', - this.value.length);
 	return range.text.length;
 }
  setCaretPos: function(start, end) {
 	end = end || start; 	this.focus();
 	if (this.setSelectionRange)
 		this.setSelectionRange(start, end);
 	else if (document.selection) {
 		var range = this.createTextRange();
 		range.moveStart('character', start);
 		range.moveEnd('character', - this.value.length + end);
 		range.select();
 	}
 } 
 replaceSelection: function (str, keep) {
 	this.focus();
 	var start = this.getSelectionStart();
 	var stop = this.getSelectionEnd();
 	var end = start + str.length;
 	var scrollPos = this.scrollTop;
 	this.value = this.value.substring(0, start) + str + this.value.substring(stop);
 	if ( keep ) this.setCaretPos(start, end);
 	else this.setCaretPos(end);
 	this.scrollTop = scrollPos;
 } 
$(document).ready(function(){
 	$('.gw-inner').select(function() {
 		var pos = replaceSelection();
		$(this).replaceSelection().replaceWith("coucou");
		$("#messageinfo").html("info:"+pos);
	});
});
*/

            $(document).ready(function () {
                function getSelectionText() {
                    var text = "";
                    if (window.getSelection) {
                        text = window.getSelection().toString();
                    } else if (document.selection && document.selection.type != "Control") {
                        text = document.selection.createRange().text;
                    }
                    return text;
                }

                function replaceSelectionWithHtml(element, classToAdd, truc) {
                    var range, html = "<"+element+" class='"+classToAdd+"'>"+truc+"</"+element+">";
                    if (window.getSelection && window.getSelection().getRangeAt) {
                        range = window.getSelection().getRangeAt(0);
                        console.log(range);
                        range.deleteContents();
                        var div = document.createElement("div");
                        div.innerHTML = html;
                        var frag = document.createDocumentFragment(), child;
                        while ( (child = div.firstChild) ) {
                            frag.appendChild(child);
                        }
                        range.insertNode(frag);
                    } else if (document.selection && document.selection.createRange) {
                        range = document.selection.createRange();
                        range.pasteHTML(html);
                    }
                }

                $("#redColor, #greenColor, #blueColor").click(function () {
                    replaceSelectionWithHtml("span", $(this).html().toLowerCase(), getSelectionText());
                });
                $("#gras").click(function () {
                    replaceSelectionWithHtml("b",  "gras", getSelectionText());
                });
                $("#italique").click(function () {
                    replaceSelectionWithHtml("i",  "italique", getSelectionText());
                });
                $("#barre").click(function () {
                    replaceSelectionWithHtml("span",  "barre", getSelectionText());
                });
                $("#souligne").click(function () {
                    replaceSelectionWithHtml("span",  "souligne", getSelectionText());
                });
                $("#sub").click(function () {
                    replaceSelectionWithHtml("sub",  "sub", getSelectionText());
                });
                $("#sup").click(function () {
                    replaceSelectionWithHtml("sup",  "sup", getSelectionText());
                });
                $("#clear").click(function(){
                    var text = $("#edit").text();
                    $("#edit").html(text);
                });

            });

        