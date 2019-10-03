const _ = window._;

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

function main() {
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

  var data = [
    [
      //iPhone
      { axis: "Battery Life", value: 0.22 },
      { axis: "Brand", value: 0.28 },
      { axis: "Contract Cost", value: 0.29 },
      { axis: "Design And Quality", value: 0.17 },
      { axis: "Have Internet Connectivity", value: 0.22 },
      { axis: "Large Screen", value: 0.02 },
      { axis: "Price Of Device", value: 0.21 },
      { axis: "To Be A Smartphone", value: 0.5 }
    ],
    [
      //Samsung
      { axis: "Battery Life", value: 0.27 },
      { axis: "Brand", value: 0.16 },
      { axis: "Contract Cost", value: 0.35 },
      { axis: "Design And Quality", value: 0.13 },
      { axis: "Have Internet Connectivity", value: 0.2 },
      { axis: "Large Screen", value: 0.13 },
      { axis: "Price Of Device", value: 0.35 },
      { axis: "To Be A Smartphone", value: 0.38 }
    ],
    [
      //Nokia Smartphone
      { axis: "Battery Life", value: 0.26 },
      { axis: "Brand", value: 0.1 },
      { axis: "Contract Cost", value: 0.3 },
      { axis: "Design And Quality", value: 0.14 },
      { axis: "Have Internet Connectivity", value: 0.22 },
      { axis: "Large Screen", value: 0.04 },
      { axis: "Price Of Device", value: 0.41 },
      { axis: "To Be A Smartphone", value: 0.3 }
    ]
  ];
  
  var sketch = fishCode();
  var fishes = _.range(0, 10).map(i => sketch({p: 0.05}));
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
  var dataForFishes = fishes.map(fish => {
    return dimensionNames.map((name, dimensionIndex) => {
      return {
        axis: name,
        value: fish[dimensionIndex]
      };
    });
  });
  console.log('dataForFishes', dataForFishes);
  data = dataForFishes;
  
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

main();
