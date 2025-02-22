/** * SVG Fixer * * Fixes references to inline SVG elements when the <base> tag is in use. * Firefox won't display SVG icons referenced with * `<svg><use xlink:href="#id-of-icon-def"></use></svg>` when the <base> tag is on the page. * * More info: * - http://stackoverflow.com/a/18265336/796152 * - http://www.w3.org/TR/SVG/linking.html * * One would think that setting the `xml:base` attribute fixes things, * but that is being removed from the platform: https://code.google.com/p/chromium/issues/detail?id=341854 */ (function(document, window) { 	"use strict"; 	/** 	* Initialize the SVG Fixer after the DOM is ready 	*/ 	document.addEventListener("DOMContentLoaded", function() { 		/** 		 * Current URL, without the hash 		 */ 		var baseUrl = window.location.href 			.replace(window.location.hash, ""); 		/** 		* Find all `use` elements with a namespaced `href` attribute, e.g. 		* <use xlink:href="#some-id"></use> 		* 		* See: http://stackoverflow.com/a/23047888/796152 		*/ 		[].slice.call(document.querySelectorAll("use[*|href]")) 			/** 			* Filter out all elements whose namespaced `href` attribute doesn't 			* start with `#` (i.e. all non-relative IRI's) 			* 			* Note: we're assuming the `xlink` prefix for the XLink namespace! 			*/ 			.filter(function(element) { 				return (element.getAttribute("xlink:href").indexOf("#") === 0); 			}) 			/** 			* Prepend `window.location` to the namespaced `href` attribute value, 			* in order to make it an absolute IRI 			* 			* Note: we're assuming the `xlink` prefix for the XLink namespace! 			*/ 			.forEach(function(element) { 				element.setAttribute("xlink:href", baseUrl + element.getAttribute("xlink:href")); 			}); 	}, false); }(document, window));



var video = document.getElementById('Player');
var loadingOverlay = document.getElementById('loadingOverlay');

video.addEventListener('loadstart', function() {
  loadingOverlay.style.display = 'block';
});

video.addEventListener('canplaythrough', function() {
  loadingOverlay.style.display = 'none';
});


