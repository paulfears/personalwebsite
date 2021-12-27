     let pad = document.getElementById("graph")
     let homeHeader = document.getElementById("homeHeader");
     function resizeCanvas(canvas){
      let new_width = parseFloat(window.getComputedStyle(homeHeader, null).getPropertyValue("width"));
      console.log(new_width)
      canvas.width = new_width;
      for(key in codeToy.objs){
        codeToy.objs[key].x = (codeToy.objs[key].x%(new_width-30-2))+30;
      }
     }
    
     window.addEventListener('resize', resizeCanvas);
     console.log(pad)
     let codeToy = new Graph("graph", editable=false, );
     
     resizeCanvas(pad);

     function animateNode(node){
        console.log("-->")
        console.log(node.contextid)
        let graph = Graph.getContext(node.contextid);
        console.log(graph)
        let x = (Math.random()*4)-2;
        let y = (Math.random()*4)-2;
        
        
        function move(){
          node.x += x;
          node.y += y;
          if(node.x-node.r < 0){
            if(x<0){
              x *= -1;
            }
          }
          if(node.x+node.r > graph.canvas.width){
            if(x > 0){
              x *= -1;
            }
          }
          if(node.y+node.r > graph.canvas.height){
            if(y>0){
              y *= -1
            }
          }
          if(node.y-node.r < 0){
            if(y<0){
              y *= -1
            }
          }
          
          for(let key of Object.keys(node.edges)){
            if(graph.getEdgeById(key)){
              graph.getEdgeById(key).setText(Math.round(graph.getDistance(node.id, node.edges[key])))
            }
          }
          setTimeout(move, 1000/60)
        }
        move()
      }
      
      codeToy.setNodeSetupCallback(animateNode)
      
     codeToy.vars.A = codeToy.node(100,100, 25, "A");
     codeToy.vars.B = codeToy.node(100,100, 25, "B");
     codeToy.vars.C = codeToy.node(100, 100, 25);
     codeToy.vars.D = codeToy.node(100, 100, 25);
     codeToy.vars.E = codeToy.node(100, 100, 25);
     codeToy.vars.A.connect(codeToy.vars.E);
     codeToy.vars.B.connect(codeToy.vars.C);
     codeToy.vars.B.connect(codeToy.vars.D);
     codeToy.vars.D.connect(codeToy.vars.E);
     codeToy.vars.C.connect(codeToy.vars.D);
     codeToy.vars.E.connect(codeToy.vars.C)

      codeToy.vars.tick = 0;
      
      function doDiijkstra(graph){
        graph.vars.tick +=1
        if(graph.vars.tick % 20 == 0){
          Object.values(graph.edges).map(edge => edge.setColor("black"));
          graph.diijkstra(graph.vars.A.id, graph.vars.B.id)
        }
      }
      codeToy.setTickCallback(doDiijkstra)
      
      