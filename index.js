//document.getElementById("getURL").value = "http://localhost:8080/geoserver/wms?service=wms&version=1.1.1&request=GetCapabilities";
var xmldoc = '';  
function loadDoc(reqType = 'WMS') {
    let selectedUrl = '';
    let select_response = '';
    if(reqType === 'WMS'){
      selectedUrl = $('#WMS #getURL').val();
      select_response = 'wms_responseTextArea1';
    }else if(reqType === 'WCS'){
      selectedUrl = $('#WCS #getURL').val();
      select_response = 'wcs_responseTextArea1';
    }else{
      selectedUrl = $('#WFS #getURL').val();
      select_response = 'wfs_responseTextArea1';
    }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById(select_response).value = this.responseText;
       myFunction(this, reqType);
    }
  };
  xhttp.open("GET", selectedUrl, true);
  xhttp.send();
}
function myFunction(xmlDocument, reqType) {

  $('#WmsRequest').html('');
  $('#WcsRequest').html('');
  $('#WfsRequest').html('');
  let selected_req = '';
  let selected_layer = '';
  if(reqType === 'WMS'){
    selected_req = 'WmsRequest';
    selected_layer = 'WmsLayer'
  }else if(reqType === 'WCS'){
    selected_req = 'WcsRequest';
    selected_layer = 'WcsLayer'
  }else{
    selected_req = 'WfsRequest';
    selected_layer = 'WfsLayer'
  }
  var responseParser=new DOMParser();
  var xmlDoc=responseParser.parseFromString(xmlDocument.responseText,"application/xml");
  if(reqType != 'WFS'){    
    var noOfRequests=xmlDoc.getElementsByTagName("Request")[0].childElementCount;
    console.log(noOfRequests);
    for(var i=0;i<noOfRequests;i++){
      var temp=document.getElementById("request");
      var newOption=document.createElement("option");
      if(xmlDoc.getElementsByTagName("Request")[0].childNodes[i].tagName!=undefined){
        newOption.text=xmlDoc.getElementsByTagName("Request")[0].childNodes[i].tagName;
        newOption.value=xmlDoc.getElementsByTagName("Request")[0].childNodes[i].tagName;
        var select=document.getElementById(selected_req);

        select.appendChild(newOption);

      }
    }

 var noOfLayers=xmlDoc.getElementsByTagName("Layer").length;
    console.log(noOfLayers)
    var layers=xmlDoc.getElementsByTagName("Layer");
    for(var i=3;i<noOfLayers;i++){
      var newOption=document.createElement("option");
      if(layers[i].tagName!=undefined){
        newOption.text=layers[i].getElementsByTagName("Title")[0].innerHTML;
        newOption.value=layers[i].getElementsByTagName("Name")[0].innerHTML;
        var select=document.getElementById(selected_layer);
        select.appendChild(newOption);

      }
    }

  }else{

    var noOfRequests=xmlDoc.getElementsByTagName("ows:OperationsMetadata")[0].childElementCount;
			for(var i=0;i<noOfRequests;i++){
				var temp=document.getElementById("request");
				var newOption=document.createElement("option");
				if(xmlDoc.getElementsByTagName("ows:OperationsMetadata")[0].childNodes[i].tagName!=undefined){
					newOption.text=xmlDoc.getElementsByTagName("ows:OperationsMetadata")[0].childNodes[i].getAttribute("name");
					newOption.value=xmlDoc.getElementsByTagName("ows:OperationsMetadata")[0].childNodes[i].getAttribute("name");
					var select=document.getElementById(selected_req);

					select.appendChild(newOption);

				}
			}
    
    let wrapper = $('#WfsLayer');
    wrapper.html('');
    xmldoc = xmlDoc;
    wrapper.append(`<option>Select Layer</option>`);
    let childNodes = xmlDoc.getElementsByTagName('FeatureTypeList')[0].childNodes;
    $.each(childNodes, (index, node) => {
      let layerTitle = childNodes[index].getElementsByTagName('Title')[0].innerHTML;
      let layerName = childNodes[index].getElementsByTagName('Name')[0].innerHTML;
      wrapper.append(`<option val=${layerName}>${layerTitle}</option>`);
    })
  }  
  
}


function removecolor(reqType)
{
  // $('#WmsRequest').html('');
  // $('#WcsRequest').html('');
  // $('#WfsRequest').html('');
  let selected_crs = '';
  if(reqType === 'WMS'){
    selected_crs = 'WmsCrs';
  }else if(reqType === 'WCS'){
    selected_crs = 'WcsCrs';
  }else{
    selected_crs = 'WfsCrs';
  }
var select = document.getElementById(selected_crs);
while (select.firstChild) {
   select.removeChild(select.firstChild);
}
}
    
function makeRequestForCoordinateSystems(reqType){
      let selectedUrl = '';
      if(reqType === 'WMS'){
        selectedUrl = $('#WMS #getURL').val();
      }else if(reqType === 'WCS'){
        selectedUrl = $('#WCS #getURL').val();
      }else{
        selectedUrl = $('#WFS #getURL').val();
      }
        var xhttp=new XMLHttpRequest();
        xhttp.onreadystatechange=function(){
          if(this.readyState==4 && this.status==200){
            getCoordinateSystem(this, reqType);
            getBoundingBoxRequest(this, reqType);
          }
        };
        xhttp.open("GET",selectedUrl,true);
        xhttp.send();
      }
      


  function getBoundingBoxRequest(xmlDocument, reqType){
    let selected_req = '';
    let selected_layer = '';
    let layer_minX = '';
    let layer_maxX = '';
    let layer_minY = '';
    let layer_maxY = '';
    let layer_width = '';
    let layer_height = '';
    if(reqType === 'WMS'){
      selected_req = 'WmsRequest';
      selected_layer = 'WmsLayer';
      layer_minX = 'wms_min_X';
      layer_maxX = 'wms_max_X';
      layer_minY = 'wms_min_Y';
      layer_maxY = 'wms_max_Y';
      layer_width = 'wms_width';
      layer_height = 'wms_height';
    }else if(reqType === 'WCS'){
      selected_req = 'WcsRequest';
      selected_layer = 'WcsLayer';
      layer_minX = 'wcs_min_X';
      layer_maxX = 'wcs_max_X';
      layer_minY = 'wcs_min_Y';
      layer_maxY = 'wcs_max_Y';
      layer_width = 'wcs_width';
      layer_height = 'wcs_height';
    }else{
      selected_req = 'WfsRequest';
      selected_layer = 'WfsLayer';
      layer_minX = 'wfs_min_X';
      layer_maxX = 'wfs_max_X';
      layer_minY = 'wfs_min_Y';
      layer_maxY = 'wfs_max_Y';
      layer_width = 'wfs_width';
      layer_height = 'wfs_height';
    }
        var responseParser=new DOMParser();
        var xmlDoc=responseParser.parseFromString(xmlDocument.responseText,"application/xml");
        
        var layerSelect=document.getElementById(selected_layer);
        console.log(layerSelect)
        var selectedLayer=layerSelect.options[layerSelect.selectedIndex].value;
        console.log(selectedLayer)
        console.log("title of selectedLayer:"+selectedLayer);
        var noOfLayers=xmlDoc.getElementsByTagName("Layer").length;
        console.log(noOfLayers)
        var layers=xmlDoc.getElementsByTagName("Layer");
        var temp=0;
        var min_Y=0;
        var min_X=0;
        var max_Y=0;
        var max_X=0;
        var WmsCrs="crs";
        console.log("here3:getBoundingBoxRequest")
        for(var i=0;i<noOfLayers;i++){
          if(layers[i].tagName!=undefined){
            if(layers[i].getElementsByTagName("Name")[0].innerHTML===selectedLayer){
              temp=i;
              WmsCrs=layers[temp].getElementsByTagName("BoundingBox")[0].getAttribute("SRS");
             // format = layers[temp].getElementsByTagName("Format")[0].getAttribute("")
              console.log(WmsCrs);
              min_Y=layers[temp].getElementsByTagName("BoundingBox")[0].getAttribute("miny");
              min_X=layers[temp].getElementsByTagName("BoundingBox")[0].getAttribute("minx");
              max_Y=layers[temp].getElementsByTagName("BoundingBox")[0].getAttribute("maxy");
              max_X=layers[temp].getElementsByTagName("BoundingBox")[0].getAttribute("maxx");
             

            }

          }
        }
          document.getElementById(layer_minX).value=min_X;//
        document.getElementById(layer_minY).value=min_Y;//
        document.getElementById(layer_maxX).value=max_X;//
        document.getElementById(layer_maxY).value=max_Y;//
   for(var i=0;i<noOfLayers;i++){
          if(layers[i].tagName!=undefined){
            if(layers[i].getElementsByTagName("Name")[0].innerHTML===selectedLayer){
              temp=i;
            
            
              width=layers[temp].getElementsByTagName("LegendURL")[0].getAttribute("width");
              height=layers[temp].getElementsByTagName("LegendURL")[0].getAttribute("height");
           
              

            }

          }
        }


        for(var i=0;i<noOfLayers;i++){
          if(layers[i].tagName!=undefined){
            if(layers[i].getElementsByTagName("Name")[0].innerHTML===selectedLayer){
              temp=i;
            
            
              format=layers[temp].getElementsByTagName("LegendURL")[0].getAttribute("width");
              
            }

          }
        }



        document.getElementById(layer_height).value=height;///
        document.getElementById(layer_width).value=width;//


  var crs_input=document.getElementById(selected_layer).options;
        for(var i=0;i<crs_input.length;i++){
          if(crs_input[i].value==WmsCrs){
            document.getElementById(selected_layer).value=WmsCrs;
            console.log("crs:"+i);
          }
        }

      
      
        var index=0;
        var crs_input=document.getElementById(selected_layer).options;
        for(var i=0;i<crs_input.length;i++){
          if(crs_input[i].value==WmsCrs){
            document.getElementById(selected_layer).value=WmsCrs;
            console.log("crs:"+i);
          }
        }

      }

  function getCoordinateSystem(xmlDocument, reqType) {
          let selected_req = '';
        let selected_layer = '';
        let selectedCRS = ''
        if(reqType === 'WMS'){
          selected_req = 'WmsRequest';
          selected_layer = 'WmsLayer';
          selectedCRS = 'WmsCrs';
        }else if(reqType === 'WCS'){
          selected_req = 'WcsRequest';
          selected_layer = 'WcsLayer';
          selectedCRS = 'WcsCrs';
        }else{
          selected_req = 'WfsRequest';
          selected_layer = 'WfsLayer';
          selectedCRS = 'WfsCrs';
        }
        var responseParser=new DOMParser();
        var xmlDoc=responseParser.parseFromString(xmlDocument.responseText,"application/xml");
        var layerSelect=document.getElementById(selected_layer);
        var selectedLayer=layerSelect.options[layerSelect.selectedIndex].value;
        console.log(selectedLayer);
        var noOfLayers=xmlDoc.getElementsByTagName("Layer").length;
        console.log(noOfLayers)
        var layers=xmlDoc.getElementsByTagName("Layer");
        var temp=0;
        for(var i=0;i<noOfLayers;i++){
          var newOption=document.createElement("option");
          if(layers[i].tagName!=undefined){
            if(layers[i].getElementsByTagName("Name")[0].innerHTML===selectedLayer)
              temp=i;
             console.log("value of temp:"+temp);
          }
        }
       
        console.log(layers[temp].getElementsByTagName("Title")[0].innerHTML)
        var srsOfSelectedLayer=layers[temp].getElementsByTagName("SRS");
        console.log("no of srs:"+srsOfSelectedLayer.length);
        for(var i=0;i<srsOfSelectedLayer.length;i++){
          var newOption=document.createElement("option");
          if(srsOfSelectedLayer[i].innerHTML!=undefined){
            newOption.text=srsOfSelectedLayer[i].innerHTML;
            newOption.value=srsOfSelectedLayer[i].innerHTML;
            var select=document.getElementById(selectedCRS);
            select.appendChild(newOption);

          }
        }
      }


  function onclickmap(e)
     {
      e.preventDefault();
      $('#map').html('');
      let newLayerValue = $('#WmsLayer').val();
      console.log("sucess")
      var wms_source = new ol.source.TileWMS({
 url: "http://localhost:8080/geoserver/wms",
 params: {
          'LAYERS': newLayerValue
        },
extent: [-117.861328,32.472695,-76.376953,47.398349],
ratio: 1,
serverType: 'geoserver'
          });
var wms_layer = new ol.layer.Tile({
   source:  wms_source,
     });

var base_map = new ol.layer.Tile({
  source: new ol.source.OSM(),
  visible: true,
  title: 'OSMStandard'
});

    var layers = [
    base_map,
    wms_layer
    ];

    var vw=new ol.View({
      center: [0, 0],
      zoom: 1
      });

     map= new ol.Map({
     target: 'map',
     layers: layers,
     view: vw
     });
     console.log("sucess")

	 map.on('singleclick', function(evt) {
        document.getElementById('nodelist').innerHTML = "Loading... please wait...";
        var view = map.getView();
        var viewResolution = view.getResolution();
        var source = wms_source;
        var url = source.getGetFeatureInfoUrl(
          evt.coordinate, viewResolution, view.getProjection(),
          {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50});
        if (url) {
          document.getElementById('nodelist').innerHTML = '<iframe seamless src="' + url + '"></iframe>';
        }
      });
     }


     $('#london_form').submit(function(e) {
       onclickmap(e);
     })


     // WFS CRS and Bounding Box
     function wfs_crs () {
       console.log(xmldoc);
        let wfs_layer = $('#WfsLayer').val();
        let child_nodes = xmldoc.getElementsByTagName('FeatureTypeList')[0].childNodes;
        $.each(child_nodes, (index, node) => {
          let nodeTitle = node.getElementsByTagName('Title')[0].innerHTML;
          if(nodeTitle === wfs_layer){
            let crs = node.getElementsByTagName('DefaultCRS')[0].innerHTML;
            $('#WfsCrs').html('');
            $('#WfsCrs').append(`<option>${crs}</option>`);
            let lower_bound = node.getElementsByTagName('ows:WGS84BoundingBox')[0].getElementsByTagName('ows:LowerCorner')[0].innerHTML.split(' ');
            let upper_bound = node.getElementsByTagName('ows:WGS84BoundingBox')[0].getElementsByTagName('ows:UpperCorner')[0].innerHTML.split(' ')
            $('#wfs_min_X').val(lower_bound[0]);
            $('#wfs_min_Y').val(lower_bound[1]);
            $('#wfs_max_X').val(upper_bound[0]);
            $('#wfs_max_Y').val(upper_bound[1]);
          }
        })
        console.log(wfs_layer);
     }