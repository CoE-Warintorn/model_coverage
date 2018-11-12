// Copyright 2014-2015 The MathWorks, Inc.

(function() {

    // Private object for storing a ref and its tooltip
    var href2Span = {};

    // Private function for extracting the recognized ref
    // (only href like #funX, #nodeX and #covX are supported)
    function getCandidateRef(href) {
        var res = undefined;
        try {
            if (typeof(href)==="string" && href.length > 4) {
                var ref = href.substring(1,4);
                if (ref=="fun" || ref=="cov" || ref=="nod") {
                    res = href.substring(1);
                }
            }
        } catch (err) {
        }
        return res;
    }
    
    // Initialize the candidates in the current document
    // (only register listener for element of class "covlnk"
    // with a supported href)
    function register() {
        try {
            var lnks = document.getElementsByClassName("covlnk");
            if (lnks) {
                for (var i = 0; i < lnks.length; i++) {
                    var lnk = lnks[i];
                    var ref = getCandidateRef(lnk.getAttribute("href"));
                    if (ref) {
                        addListener(lnk, "mouseover", openTooltip);
                    }
                }
            }
        } catch (err) {
        }
    }
    
    // Close/delete the current opened tooltip
    function closeTooltip(event) {
        // Close the tooltip if opened
        var sElem = href2Span["current"];
        if (sElem && sElem[1]) {
            // Close the tooltip
            sElem[1].removeChild(sElem[0]);
            href2Span["current"] = undefined;
            return;
        }
    }

    // Helper for positionning the tooltip
    function getCoords(originalElement)
    {
        var left   = 0;
        var top    = 0;
        var width  = 0;
        var height = 0;
        
        var coords = new Array();
        
        var originalParent = null;
        var offsetParent   = null;
        var element        = null;
        
        if (originalElement==null)
            return null;
        
        var originalParent = originalElement.parentNode;
        var offsetParent   = originalElement.offsetParent;
        var element        = originalElement;
        
        if (originalElement.offsetWidth)
            width = originalElement.offsetWidth;
        
        if (originalElement.offsetHeight)
            height = originalElement.offsetHeight;
        
        
        while (element.parentNode != null) {
            element = element.parentNode;
            
            if (element.offsetParent != null) {
                // Handle scrolling
                if (element.scrollLeft && (element.scrollLeft > 0))
                    left -= element.scrollLeft;
                
                if (element.scrollTop && (element.scrollTop > 0))
                    top -= element.scrollTop;
            }
            
            if (element == offsetParent) {
                left += originalElement.offsetLeft;
                if (element.clientLeft && element.nodeName!="TABLE")
                    left += element.clientLeft;
                
                top += originalElement.offsetTop;
                if (element.clientTop && element.nodeName!="TABLE")
                    top += element.clientTop;
                
                originalElement = element;
                offsetParent = originalElement.offsetParent;
                
                if (originalElement.offsetParent==null) {
                    if (originalElement.offsetLeft)
                        left += originalElement.offsetLeft;
                    
                    if (originalElement.offsetTop)
                        top += originalElement.offsetTop;
                }
            }
        }
        
        coords.left   = left;
        coords.top    = top;
        coords.width  = width;
        coords.height = height;
        
        return(coords);
    }
    
    // Create/show a tooltip
    function openTooltip(event) {
        try {
            // Early return if not a supported candidate
            var ref = getCandidateRef(event.target.getAttribute("href"));
            if (!ref) {
                return;
            }
            
            // Close the current tooltip
            var sElem = href2Span["current"];
            if (sElem && sElem[1]) {
                sElem[1].removeChild(sElem[0]);
                href2Span["current"] = undefined;
            }
            
            // Create a new entry
            var objs = document.getElementsByName("tt_" + ref);
            if (objs) {
                var obj = objs[0];
                var parent = obj.parentNode;
                if (parent && parent.nodeName.toUpperCase()=="DIV" && parent.getAttribute("name")=="node_details") {
                    obj = obj.parentNode;
                }
                var spanElem = document.createElement("span");
                spanElem.className = "tooltip";
                var newObj = obj.cloneNode(true);
                var aList = newObj.getElementsByTagName("a");
                for(var i = 0; i < aList.length; i++) {
                    aList[i].removeAttribute("href");
                }
                spanElem.appendChild(newObj);
                var pos = getCoords(event.target.parentNode);
                spanElem.style.left = pos.left + 'px';
                spanElem.style.top = (pos.top + pos.height) + 'px';
                document.body.appendChild(spanElem);
                href2Span["current"] = [spanElem, document.body];
                addListener(spanElem, "click", closeTooltip);
            }
        } catch (err) {
        }
    }

    // Helper for registering a listener
    function addListener(obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent) {
            obj.attachEvent("on" + type, fn);
        }
    }

    // Register the listener
    addListener(window, "load", register);

})();

