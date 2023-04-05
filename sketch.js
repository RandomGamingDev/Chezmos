let chart = new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
	labels: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
	datasets: []
  },
  options: {
	title: {
	  display : true,
		text : "Chezmos"
	}
  }
});

function NewEqu() {  
  const columns = ["name", "color", "function"];
  const functionsElem = document.getElementById("functions");
  const numEq = functionsElem.childElementCount - 1;
  
  let tr = document.createElement("tr");
  for (let i = 0; i < 3; i++) {
    let td = document.createElement("td");
    let textArea = document.createElement("textarea");
    textArea.setAttribute("id", `${columns[i]}${numEq}`)
    td.appendChild(textArea);
    tr.appendChild(td);
  }
  functionsElem.appendChild(tr);
}

function DelEqu() {
  const lastChild = document.getElementById("functions").children
  if (lastChild.length < 2)
    return;
  lastChild[lastChild.length - 1].remove()
}

function RunEqu() {
  const datasets = chart.data.datasets;
  datasets.length = 0;
  for (let i = 1; i < document.getElementById("functions").childElementCount; i++) {
    let cache = new Map();
    let trueSelf;
    
    let elements = ["name", "color", "function"];
    for (const j in elements)
      elements[j] = document.getElementById(elements[j] + (i - 1).toString()).value;
    
    eval(`trueSelf = function(x) {${elements[2]}};`)
    let self = function(x) {
      const cacheVal = cache.get(x);
      if (cacheVal != undefined)
        return cacheVal;
      
      let toReturn = trueSelf(x);
      cache.set(x, toReturn);
      return toReturn;
    }
         
    datasets.push(
      {
        data: [],
        label: elements[0],
        borderColor: elements[1],
        fill: false
      }
    )
    
    const xs = chart.data.labels;
    try {
      for (const i in xs)
        datasets[datasets.length - 1].data.push(trueSelf(xs[i])); 
    }
    catch(e) {
      const errorElem = document.getElementById("errors");
      errorElem.innerHTML =
        e + "<br/>" + errorElem.innerHTML;
    }
    
    chart.update();
  }
}

function DomainResize() {
  const rangeStepName = ["low", "high", "step"];
  let rangeStep = [undefined, undefined, undefined];
  for (const i in rangeStep) {
    while (isNaN(rangeStep[i])) {
      rangeStep[i] = prompt(`Please enter the ${rangeStepName[i]} of the range:`);
      if (rangeStep[i] == null)
        return;
    }
    rangeStep[i] = Number(rangeStep[i])
  }
  
  chart.data.labels = [];
  let limit = 10000;
  for (let i = rangeStep[0]; i <= rangeStep[1]; i += rangeStep[2]) {
    chart.data.labels.push(i);
    if (--limit < 1) {
      prompt("There were too many label values so it was cancelled early")
      break;
    }
  }
  RunEqu();
  
  chart.update();
}

function AddLib() {
  const promptResult = prompt("Please enter the URL to your library")
  if (promptResult == undefined)
    return;
  let script = document.createElement("script");
  script.setAttribute("src", promptResult);
  document.getElementById("libraries").appendChild(script);
}