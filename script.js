const _ = window._;
const tf = window.tf;
const d3 = window.d3;

function fishCode() {
  const COLORS = [
    "#F5F6E8",
    "#F8C09D",
    "#EF937E",
    "#EA676C",
    "#FFF79C",
    "#FED883",
    "#FEBE40",
    "#EC7523",
    "#E3482C",
    "#DC1C4B",
    "#B31E48",
    "#EE8EB4",
    "#DD527C",
    "#DC166D",
    "#9B1D5A",
    "#6F1E49",
    "#DD94C1",
    "#B557A1",
    "#612D82",
    "#432355",
    "#5E79BC",
    "#87D1EE",
    "#2BB3CD",
    "#2276BC",
    "#1D5C87",
    "#7ECDCA",
    "#30B1AD",
    "#1F8B95",
    "#50B86B",
    "#C9DB53",
    "#8FC23F",
    "#D0AD9A",
    "#9A605C",
    "#66342D",
    "#311A12",
    "#D0E2EE",
    "#AABFD0",
    "#7D8E9E",
    "#5B6571",
    "#143441",
    "#3A4D5C",
    "#0F2437",
    "#000000"
  ];

  /**
   * CONSTANTS
   */
  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 400;
  const BG_COLOR = "#021a61";
  const BODY_CENTER_X = CANVAS_WIDTH / 2;
  const BODY_CENTER_Y = CANVAS_HEIGHT / 2;

  const EyeType = Object.freeze({
    Circle: 1,
    SemiCircleUp: 2,
    SemiCircleDown: 3
  });
  
  function sketch(options = {}) {
    const p = options.p || 0;
    let body = {
      width: CANVAS_WIDTH / 2,
      height: CANVAS_WIDTH / 6,
      color: "#DC1C4B"
    };
    let fins = {
      color: "#87D1EE",
      tail: {
        widthPercent: 0.03,
        heightPercent: 0.2
      },
      topFin: {
        widthPercent: 0.3,
        heightPercent: 0.1
      },
      sideFin: {
        widthPercent: 0.1,
        heightPercent: 0.3
      }
    };
    let eyes = {
      type: EyeType.Circle,
      xOffsetRatio: 0.7,
      yOffsetRatio: 0.25,
      diameter: 25,
      pupilDiameter: 5
    };
    let mouth = {
      teeth: {
        num: 5,
        height: 5
      }
    };

    const values = [
      body.width,
      body.height,
      COLORS.indexOf(body.color),
      eyes.diameter,
      COLORS.indexOf(fins.color),
      fins.topFin.widthPercent,
      fins.topFin.heightPercent,
      fins.sideFin.widthPercent,
      fins.sideFin.heightPercent,
      fins.tail.widthPercent,
      fins.tail.heightPercent
    ];
    
    return values.map(value => {
      const range = (value * p);
      return value - (range/2) + (Math.random()*range);
    });
  };
  
  return sketch;
}

function radar(fishes, dimensionNames) {
  /* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */

  //////////////////////////////////////////////////////////////
  //////////////////////// Set-Up //////////////////////////////
  //////////////////////////////////////////////////////////////

  var margin = { top: 100, right: 100, bottom: 100, left: 100 },
    width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
    height = Math.min(
      width,
      window.innerHeight - margin.top - margin.bottom - 20
    );

  //////////////////////////////////////////////////////////////
  ////////////////////////// Data //////////////////////////////
  //////////////////////////////////////////////////////////////

//   var data = [
//     [
//       //iPhone
//       { axis: "Battery Life", value: 0.22 },
//       { axis: "Brand", value: 0.28 },
//       { axis: "Contract Cost", value: 0.29 },
//       { axis: "Design And Quality", value: 0.17 },
//       { axis: "Have Internet Connectivity", value: 0.22 },
//       { axis: "Large Screen", value: 0.02 },
//       { axis: "Price Of Device", value: 0.21 },
//       { axis: "To Be A Smartphone", value: 0.5 }
//     ],
//     [
//       //Samsung
//       { axis: "Battery Life", value: 0.27 },
//       { axis: "Brand", value: 0.16 },
//       { axis: "Contract Cost", value: 0.35 },
//       { axis: "Design And Quality", value: 0.13 },
//       { axis: "Have Internet Connectivity", value: 0.2 },
//       { axis: "Large Screen", value: 0.13 },
//       { axis: "Price Of Device", value: 0.35 },
//       { axis: "To Be A Smartphone", value: 0.38 }
//     ],
//     [
//       //Nokia Smartphone
//       { axis: "Battery Life", value: 0.26 },
//       { axis: "Brand", value: 0.1 },
//       { axis: "Contract Cost", value: 0.3 },
//       { axis: "Design And Quality", value: 0.14 },
//       { axis: "Have Internet Connectivity", value: 0.22 },
//       { axis: "Large Screen", value: 0.04 },
//       { axis: "Price Of Device", value: 0.41 },
//       { axis: "To Be A Smartphone", value: 0.3 }
//     ]
//   ];
  

  var dataForFishes = fishes.map(fish => {
    return dimensionNames.map((name, dimensionIndex) => {
      return {
        axis: name,
        value: fish[dimensionIndex]
      };
    });
  });
  var data = dataForFishes;
  
  //////////////////////////////////////////////////////////////
  //////////////////// Draw the Chart //////////////////////////
  //////////////////////////////////////////////////////////////

  var color = d3.scale.ordinal().range(["#EDC951", "#CC333F", "#00A0B0"]);

  var radarChartOptions = {
    w: width,
    h: height,
    margin: margin,
    maxValue: 0.5,
    levels: 5,
    roundStrokes: true,
    color: color
  };
  //Call function to draw the Radar chart
  RadarChart(".radarChart", data, radarChartOptions);
}




function ridgeline(fishes, dimensionNames) {
  // set the dimensions and margins of the graph
  var margin = {top: 60, right: 30, bottom: 20, left:110},
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select(".ridgeline")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  //read data

  // d3.csv("https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv", function(data) {
  (function() {
    console.log(data);
    var data = fishes.map((fish, dimensionIndex) => {
      var d = {};
      dimensionNames.forEach((name, dimensionIndex) => {
        d[name] = fish[dimensionIndex];
      });
      return d;
    });
    data.columns = dimensionNames;
    console.log(data);
    
    // Get the different categories and count them
    var categories = data.columns
    var n = categories.length

    // Add X axis
    console.log('fishes', fishes);
    var yMax = _.max(_.maxBy(fishes, fish => _.max(fish)));
    console.log('yMax', yMax);
    var x = d3.scaleLinear()
      .domain([-10, yMax + 10])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Create a Y scale for densities
    var y = d3.scaleLinear()
      .domain([0, 0.4])
      .range([ height, 0]);

    // Create the Y axis for names
    var yName = d3.scaleBand()
      .domain(categories)
      .range([0, height])
      .paddingInner(1)
    svg.append("g")
      .call(d3.axisLeft(yName));

    // Compute kernel density estimation for each column:
    var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)) // increase this 40 for more accurate density.
    var allDensity = []
    for (i = 0; i < n; i++) {
        key = categories[i]
        density = kde( data.map(function(d){  return d[key]; }) )
        allDensity.push({key: key, density: density})
    }

    // Add areas
    svg.selectAll("areas")
      .data(allDensity)
      .enter()
      .append("path")
        .attr("transform", function(d){return("translate(0," + (yName(d.key)-height) +")" )})
        .datum(function(d){return(d.density)})
        .attr("fill", "#69b3a2")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("d",  d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d[0]); })
            .y(function(d) { return y(d[1]); })
        )

  })();
}
// This is what I need to compute kernel density estimation
function kernelDensityEstimator(kernel, X) {
  return function(V) {
    return X.map(function(x) {
      return [x, d3.mean(V, function(v) { return kernel(x - v); })];
    });
  };
}
function kernelEpanechnikov(k) {
  return function(v) {
    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
  };
}


// needs more than n=15 by default
async function projectWithUmap(fishes, dimensionNames) {
  console.log(JSON.stringify(fishes));
  const embeddings = fishes.map(fish => tf.tensor(fish)); // sort of
  const umap = new (window.UMAP)();
  console.log('embeddings', embeddings);
  console.log('embeddings', embeddings.map(e => e.dataSync()));
  const xys = await umap.fitAsync(embeddings);
  console.log('xys', xys);
  const xDomain = [_.min(xys.map(xy => xy[0])), _.max(xys.map(xy => xy[0]))];
  const yDomain = [_.min(xys.map(xy => xy[1])), _.max(xys.map(xy => xy[1]))];
  console.log('xDomain', xDomain);
  console.log('yDomain', yDomain);
  
  var xScale = d3.scaleLinear()
      .domain(xDomain)
      .range([ 0, 800 ]);
  var yScale = d3.scaleLinear()
      .domain(yDomain)
      .range([ 0, 600 ]);
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', 800);
  svg.setAttribute('height', 600);
  svg.style.width = '800px';
  svg.style.height = '600px';
  
  console.log('projected', xys.map(xy => [xScale(xy[0]), yScale(xy[1])]));
  xys.forEach((xy, index) => {
    const [x, y] = xy;
    const circle = document.createElementNS(ns, 'circle');
    circle.setAttribute('cx', xScale(x));
    circle.setAttribute('cy', yScale(y));
    circle.setAttribute('r', 5);
    const i = Math.round(index / xys.length * 16);
    circle.setAttribute('fill', `#ff${i.toString(16)}`); // rgb didn't work, even in web inspector? confused, but working around...
    svg.appendChild(circle);
  });
  document.querySelector('.umap').appendChild(svg);
}


function main() {
  var sketch = fishCode();
  var p = 0.5; // how much noise, as a percent of the value?
  const div = document.createElement('div');
  div.innerText = `noise param, p=${p}`;
  document.body.appendChild(div);
  
  var fishes = _.range(0, 100).map(i => sketch({p}));
  var dimensionNames = [
    'body.width',
    'body.height',
    'COLORS.indexOf(body.color)',
    'eyes.diameter',
    'COLORS.indexOf(fins.color)',
    'fins.topFin.widthPercent',
    'fins.topFin.heightPercent',
    'fins.sideFin.widthPercent',
    'fins.sideFin.heightPercent',
    'fins.tail.widthPercent',
    'fins.tail.heightPercent'
  ];
  
  radar(fishes, dimensionNames);
  ridgeline(fishes, dimensionNames);
  projectWithUmap(fishes, dimensionNames);
}
main();