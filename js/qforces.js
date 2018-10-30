
	// ------declaracion de variables -------
	var width = 1000;
	var height = 800;
	var color = d3.scaleOrdinal(d3.schemeCategory10);
	var clickedNode=0;
//	data stores
	var graph, store;
	var showed=[];
	//--------------recuperacion de datos ----
	
	d3.json("data/Parques_Nacionales.json").then(function(netData) {


		var label = {
		    'nodes': [],
		    'links': []
		};

		netData.nodes.forEach(function(d, i) {
		    label.nodes.push({node: d});
		    label.nodes.push({node: d});
		    label.links.push({
		        source: i * 2,
		        target: i * 2 + 1
		    });
		});

		// definicion de fuerzas
		// fuerzas para los labels
		var labelLayout = d3.forceSimulation(label.nodes)
		    .force("charge", d3.forceManyBody().strength(-50))
		    .force("link", d3.forceLink(label.links).distance(0).strength(1));

		// fuerzas para los nodos
		var netLayout = d3.forceSimulation(netData.nodes)
      		.force("link", d3.forceLink(netData.links).id(d => d.id))
		    .force("charge", d3.forceManyBody().strength(-3000))
		    .force("center", d3.forceCenter(width / 2, height / 2))
		    .force("x", d3.forceX(width / 2).strength(1))
		    .force("y", d3.forceY(height / 2).strength(1))
		    .on("tick", ticked);


		var adjlist = [];
		// Valido  los enlaces en ambos sentidos registrando los vecinos
		netData.links.forEach(function(d) {
		    adjlist[d.source.index + "-" + d.target.index] = true;
		    adjlist[d.target.index + "-" + d.source.index] = true;
		});

		function neigh(a, b) { //usaddo en el evento focus para localizar los vecinos
		    return a == b || adjlist[a + "-" + b];
		}

		var svg = d3.select("#network").attr("width", width).attr("height", height);    // selecciono el elemneto svg para dibujar en el
		var container = svg.append("g"); // creo un contenedor para agregar elementos en el

		svg.call(
		    d3.zoom()
		        .scaleExtent([.1, 4])
		        .on("zoom", function() { container.attr("transform", d3.event.transform); })
		);

		// declaración 2 de variables
		//  links o enlaces
		var link = container.append("g").attr("class", "links")
		    .selectAll("line")
		    .data(netData.links)
		    .enter()
		    .append("line")
		    .attr("stroke", "#aaa")
		    .attr("stroke-width", "1px");

		//  nodes
		var node = container.append("g").attr("class", "nodes")
		    .selectAll("g")
		    .data(netData.nodes)
		    .enter()
		    .append("circle")
		    .attr("r", 5)
		    .attr("fill", function(d) { return color(d.region); })


		node.call(
		    d3.drag()
		        .on("start", dragstarted)
		        .on("drag", dragged)
		        .on("end", dragended)
		);

		//  labelnode o textos para cada nodo
		var labelNode = container.append("g").attr("class", "labelNodes")
		    .selectAll("text")
		    .data(label.nodes)
		    .enter()
		    .append("text")
		    .text(function(d, i) { return i % 2 == 0 ? "" : d.node.nombre; })
		    .style("fill", "#555")
		    .style("font-family", "Arial")
		    .style("font-size", 11)
		    .style("pointer-events", "none"); // to prevent mouseover/drag capture

		node.on("click", function(){

			d3.select(".info").html("");
			d3.select(this)
				.call(cliked)
			d3.selectAll(".info")
		    .data(label.nodes)
		    .enter()
			.text((a) => {   	
  				var currNode =  d3.select(this).datum();
  				if  (a.node.region == currNode.region) {
					invst =   d3.select('.info').append('tr').html(getNeighbors(a,currNode))
					return invst;
				}
				return "";
			})
			d3.select(".info").attr("visibility","visible");
			d3.select(".datos").attr("visibility","visible");
		});

		// Declaracion de funciones
		//  funcion ticked: Es un event handle, que corre permanentemente para actualizar los nodos y enlaces
		function ticked() { 
		    node.call(updateNode);
		    link.call(updateLink);

		    labelLayout.alphaTarget(0.3).restart();
		    labelNode.each(function(d, i) {
		        if(i % 2 == 0) {
		            d.x = d.node.x;
		            d.y = d.node.y;
		        } else {
		            var b = this.getBBox();

		            var diffX = d.x - d.node.x;
		            var diffY = d.y - d.node.y;

		            var dist = Math.sqrt(diffX * diffX + diffY * diffY);

		            var shiftX = b.width * (diffX - dist) / (dist * 2);
		            shiftX = Math.max(-b.width, Math.min(0, shiftX));
		            var shiftY = 16;
		            this.setAttribute("transform", "translate(" + shiftX + "," + shiftY + ")");
		        }
		    });

		    labelNode.call(updateNode);
		}


		function getNeighbors(x,currNode){
			var info="";
			// console.log(n)
		    	if  (x.node.region == currNode.region) {
					// if (currNode.nombre=="Colombia"){
					// 	return "<tr><td><b>"+currNode.nombre+"</b> </td><td> "+currNode.area_Res+" </td></b></td><td></td><td></td></tr>";
					// }
			    		info ="<tr><td><b>"+x.node.nombre+"</b> </td>";
	    				info +="<td><i>"+x.node.region+"</i></td><td>"+x.node.area_Res+"</td>";
						info +="<td>"+x.node.categoria+"</td><td>"+x.node.alojamiento+" permitido</td>";
						info +="<td>"+x.node.camping+" permitido</td></tr>";
			    }
		    return info;
		}

		// funcion para manejar el evento OnFocus On
		function cliked(d) {
			console.log()
			$(".info").html(" ");
			if (clickedNode==0){

			    var index = d3.select(d3.event.target).datum().index; // obteniendo los datos del nodo del evento
			    node.style("opacity", function(o) {
			        return neigh(index, o.index) ? 1 : 0.1;
			    });
			    labelNode.attr("display", function(o) {
			      return neigh(index, o.node.index) ? "block": "none";
			    });
			    link.style("opacity", function(o) {
			        return o.source.index == index || o.target.index == index ? 1 : 0.1;
			    });
			    clickedNode=1;
			}else{
				$(".info").html(" ");
			    labelNode.attr("display", "block");
			    node.style("opacity", 1);
			    link.style("opacity", 1);
				clickedNode=0;
				d3.select(".info").text("");
			}

		}

		function fixna(x) {
		    if (isFinite(x)) return x;
		    return 0;
		}

		// funcion para manejar el evento OnFocus Off
		function unfocus() {
		   labelNode.attr("display", "block");
		   node.style("opacity", 1);
		   link.style("opacity", 1);
		}

		// funcion para actualizar los enlaces
		function updateLink(link) {

		    link.attr("x1", function(d) { return fixna(d.source.x); })
		        .attr("y1", function(d) { return fixna(d.source.y); })
		        .attr("x2", function(d) { return fixna(d.target.x); })
		        .attr("y2", function(d) { return fixna(d.target.y); });
		}

		// funcion para actualizar los nodos
		function updateNode(node) {
		    node.attr("transform", function(d) {
		        return "translate(" + fixna(d.x) + "," + fixna(d.y) +  ")";
		    });
		}


		// Juego de funciones para manejar el Drga and Drop (start, run and end of the event)
		function dragstarted(d) {
		    d3.event.sourceEvent.stopPropagation();
		    if (!d3.event.active) netLayout.alphaTarget(0.3).restart();
		    d.fx = d.x;
		    d.fy = d.y;
		}
		function dragged(d) {
		    d.fx = d3.event.x;
		    d.fy = d3.event.y;
		}
		function dragended(d) {
		    if (!d3.event.active) netLayout.alphaTarget(0);
		    d.fx = null;
		    d.fy = null;
		}

	})//fin recuperacion datos