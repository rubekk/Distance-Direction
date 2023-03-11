// haversine method
const findDistance = (lat1, lon1, lat2, lon2) => {
  const radius = 6371,
    dLat = degToRad(lat2 - lat1),
    dLon = degToRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = radius * c;
  return d;
};

const degToRad = (deg) => {
  return (deg * Math.PI) / 180;
};

const findDirection = (lat1, lon1, lat2, lon2) => {
  const x = Math.sin(degToRad(lon2 - lon1)) * Math.cos(degToRad(lat2));
  const y =
    Math.cos(degToRad(lat1)) * Math.sin(degToRad(lat2)) -
    Math.sin(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.cos(degToRad(lon2 - lon1));
  return (Math.atan2(x, y) * 180) / Math.PI;
};
// console.log(findDirection(28.3949, 84.1240,28.7041, 77.1025));

let positionCurrent = {
  lat: null,
  lng: null,
  hng: null,
};
let defaultOrientation = "landscape";

function getBrowserOrientation() {
  let orientation;
  if (screen.orientation && screen.orientation.type) {
    orientation = screen.orientation.type;
  } else {
    orientation =
      screen.orientation || screen.mozOrientation || screen.msOrientation;
  }
  return orientation;
}

function onHeadingChange(event) {
  var heading = event.alpha;
  if (typeof event.webkitCompassHeading !== "undefined") {
    heading = event.webkitCompassHeading; //iOS non-standard
  }

  let orientation = getBrowserOrientation();
  document.querySelector(".orientation").innerText=`Orientation: ${orientation}`;

  if (typeof heading !== "undefined" && heading !== null) {
    var adjustment = 0;
    if (defaultOrientation === "landscape") {
      adjustment -= 90;
    }

    if (typeof orientation !== "undefined") {
      var currentOrientation = orientation.split("-");

      if (defaultOrientation !== currentOrientation[0]) {
        if (defaultOrientation === "landscape") {
          adjustment -= 270;
        } else {
          adjustment -= 90;
        }
      }

      if (currentOrientation[1] === "secondary") {
        adjustment -= 180;
      }
    }

    positionCurrent.hng = heading + adjustment;

    var phase = positionCurrent.hng < 0 ? 360 + positionCurrent.hng : positionCurrent.hng;
    document.querySelector(".phase").innerText=`Phase: ${phase}`;
    document.querySelector(".alpha").innerText=`Alpha: ${event.alpha}`;
    document.querySelector(".beta").innerText=`Beta: ${event.beta}`;
    document.querySelector(".gamma").innerText=`Gamma: ${event.gamma}`;

    // apply rotation to compass rose
    //   if (typeof rose.style.transform !== "undefined") {
    //     rose.style.transform = "rotateZ(" + positionCurrent.hng + "deg)";
    //   } else if (typeof rose.style.webkitTransform !== "undefined") {
    //     rose.style.webkitTransform = "rotateZ(" + positionCurrent.hng + "deg)";
    //   }
  } else {
    document.write("device can't show heading");
  }
}

window.addEventListener("deviceorientation", (e) => {
    onHeadingChange(e)
});
