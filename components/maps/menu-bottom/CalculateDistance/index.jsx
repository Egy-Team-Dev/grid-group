import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

const CalculateDistance = ({ routingControl }) => {
  const { myMap } = useSelector((state) => state.mainMap);
  const L = require("leaflet");
  const { t } = useTranslation("common");


  useEffect(() => {
    if (!myMap) return;

    routingControl = L.Routing.control({
      waypoints: [],
      routeWhileDragging: true,
      showAlternatives: true,
      addWaypoints: false,
      fitSelectedRoutes: true,
    }).addTo(myMap);
    return () => {
      myMap.removeControl(routingControl);
      routingControl = "";
    };
  }, [myMap]);

  function createButton(label, container) {
    var btn = L.DomUtil.create("button", "", container);
    btn.setAttribute("type", "button");
    btn.className = "btn-primary py-2 px-4 rounded w-50";
    btn.innerHTML = label;
    return btn;
  }

  myMap.on("click", function (e) {
    if (routingControl) {
      var container = L.DomUtil.create("div"),
        startBtn = createButton(t("Start_from_this_location"), container),
        destBtn = createButton(t("Go_to_this_location"), container);
      container.className = "d-flex align-items-stretch  gap-2 p-1 ";
      container.style = ` 
                            height: fit-content;
                            `;

      L.popup().setContent(container).setLatLng(e.latlng).openOn(myMap);

      L.DomEvent.on(startBtn, "click", function () {
        routingControl.spliceWaypoints(0, 1, e.latlng);
        myMap.closePopup();
      });

      L.DomEvent.on(destBtn, "click", function () {
        routingControl.spliceWaypoints(
          routingControl.getWaypoints().length - 1,
          1,
          e.latlng
        );
        myMap.closePopup();
      });
    }
  });

  return null;
};

export default CalculateDistance;
