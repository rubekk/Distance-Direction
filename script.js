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
let direction=findDirection(28.3949, 84.1240,28.7041, 77.1025);

const init=()=>{
  document.querySelector(".btn").addEventListener("click", startCompass);
}

const startCompass=()=>{
  window.addEventListener("deviceorientation", handler, true);
}

const handler=e=>{
  let compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
  document.querySelector("#compass").style.transform = `translate(-50%, -50%) rotate(${-compass}deg)`;
  document.querySelector("#arrow").style.transform = `translate(-50%, -50%) rotate(${direction}deg)`;
}

init();