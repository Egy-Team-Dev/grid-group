﻿import moment from "moment";
import { Saferoad } from "./leafletchild";

export var Resources = getResources();

// export var popupData = getPopupData();

function getResources() {
  var Icons = {
    RecordDateTime: "fas fa-clock",
    Speed: "fas fa-tachometer-alt",
    Direction: "fab fa-safari",
    EngineStatus: "fab fa-whmcs",
    VehicleStatus: "fas fa-wifi",
    Mileage: "fas fa-expand-alt",
    Duration: "far fa-hourglass",
    DriverUrl: "far fa-user",
    GroupName: "fas fa-users-cog",
    PlateNumber: "fab fa-deploydog",
    SimCardNumber: "fas fa-sim-card",
    SerialNumber: "fas fa-barcode",
    IgnitionStatus: "fas fa-plug",
    weightreading: "fas fa-weight-hanging",
    Temp: "fas fa-temperature-low",
    HUM: "fas fa-wind",
    Address: "fas fa-map-marked-alt",
    VehicleID: "fas fa-key",
    SeatBelt: "fa-solid fa-user-shield",
    LangLat: "fa-solid fa-location-dot",
    Invalid: "fa-solid fa-list-check",
  };
  var resources = {
    Tips: {
      RecordDateTime: "Record Date",
      Speed: "Speed",
      Direction: "Direction",
      EngineStatus: "Engine Status",
      VehicleStatus: "Vehicle Status",
      Mileage: "Mileage",
      Duration: "Duration",
      DriverUrl: "Driver Name",
      GroupName: "Group Name",
      PlateNumber: "Plate Number",
      SimCardNumber: "Sim Number",
      SerialNumber: "Serial Number",
      IgnitionStatus: "Ignition Control",
      weightreading: "Actual Weight",
      Temp: "Temperature Sensor 1",
      HUM: "Humidity Sensor 1",
      Address: "Address",
      NA: "Not Available",
      DriverNA: "No Driver",
      AllGroups: "All Groups",
      SeatBelt: "Seat Belt",
    },
    Icons: Icons,
    Actions: {
      Title: "Options",
      FullHistory: "Full History PlayBack",
      EditInformation: "Edit Information",
      CalibrateMileage: "Calibrate Mileage",
      CalibrateWeight: "Calibrate Weight",
      ShareLocation: "Share Location",
      SubmitCommand: "Submit New Command",
      DisableVehicle: "Disable Vehicle",
      EnableVehicle: "Enable Vehicle",
    },
    guides: {
      SelectPOint: "Please Select A point",
      NameRequired: "Please Enter the name",
      Processing: "Processing",
    },
    Status: {
      EngineOn: "On",
      EngineOff: "Off",
      VehicleOffline: "Offline",
      VehicleOverSpeed: "Over Speed",
      VehicleSleeping: "Sleep Mode",
      VehicleOverStreetSpeed: "OverStreet Speed",
      VehicleStopped: "Stopped",
      VehicleRunning: "Running",
      VehicleIdle: "Idle",
      VehicleInvalid: "Invalid Status",
      IgnitionEnabled: "Installed",
      IgnitionDisabled: "Not Installed",
    },
    paymentLabels: {
      cardNumber: "Card Number",
      expirationDate: "MM/YY",
      cvv: "CVV",
      cardHolder: "Card Holder Name",
    },
  };

  //   if ("body".attr("data-lang") == "ar") {
  //     resources = {
  //       Tips: {
  //         RecordDateTime: "تاريخ الحركة",
  //         Speed: "السرعة",
  //         Direction: "الاتجاه",
  //         EngineStatus: "حالة المحرك",
  //         VehicleStatus: "حالة المركبات",
  //         Mileage: "الاميال (كم)",
  //         Duration: "المدة",
  //         DriverUrl: "اسم السائق",
  //         GroupName: "اسم المجموعة",
  //         PlateNumber: "رقم اللوحة",
  //         SimCardNumber: "الرقم التسلسلي للشريحة",
  //         SerialNumber: "الرقم التسلسلي للجهاز",
  //         IgnitionStatus: "جهاز تحكم التشغيل",
  //         weightreading: "الوزن الفعلي",
  //         Temp: "حساس الحرارة 1",
  //         HUM: "حساس الرطوبة 1",
  //         Address: "العنوان",
  //         NA: "غير متاح",
  //         DriverNA: "غير معرف",
  //         AllGroups: "الجميع",
  //       },
  //       Icons: Icons,
  //       Actions: {
  //         Title: "خيارات",
  //         FullHistory: "تتبع التاريخ كاملا للمركبة",
  //         EditInformation: "تحرير معلومات المركبة",
  //         CalibrateMileage: "إعادة تعيين الأميال",
  //         CalibrateWeight: "إعادة تعين اعدادات الوزن",
  //         ShareLocation: "مشاركة الموقع",
  //         SubmitCommand: "تقديم امر جديد",
  //         DisableVehicle: "ايقاف التشغيل",
  //         EnableVehicle: "السماح بالتشغيل",
  //       },
  //       guides: {
  //         SelectPOint: "الرجاء اختيار الموقع",
  //         NameRequired: "الرجاء ادخال الاسم",
  //         Processing: "تحميل",
  //       },
  //       Status: {
  //         EngineOn: "تعمل",
  //         EngineOff: "لا تعمل",
  //         VehicleOffline: "مطفئة",
  //         VehicleOverSpeed: "تجاوز السرعة",
  //         VehicleOverStreetSpeed: "تجاوز سرعة الطريق",
  //         VehicleStopped: "متوقفة",
  //         VehicleRunning: "تسير",
  //         VehicleIdle: "سكون",
  //         VehicleInvalid: "حالة مجهولة",
  //         IgnitionEnabled: "مركب",
  //         IgnitionDisabled: "غير مركب",
  //       },
  //       paymentLabels: {
  //         cardNumber: "رقم البطاقة",
  //         expirationDate: "MM/YY",
  //         cvv: "CVV",
  //         cardHolder: "اسم حامل البطاقة",
  //       },
  //     };
  //   }

  return resources;
}

const getIconPopup = (id) => Resources.Icons[id];

const getAvg = (vals, navalue, dev = 1) => {
  vals = vals.filter((x) => x && x != navalue && !isNaN(x));
  let avg = !vals.length
    ? navalue
    : vals.reduce((a, b) => a + b, 0) / vals.length;
  return avg == navalue ? navalue : avg / dev;
};

// This Function of all data in popup in track and historyplayback pages
export function popupData(locInfo) {
  var driver = () =>
    locInfo?.DriverID != null
      ? `<span> ${
          !isNaN(locInfo?.DriverID)
            ? locInfo?.DriverName
            : `<i class="fa-solid fa-key"></i>: ${locInfo?.DriverID.substring(
                0,
                10
              ).padEnd(13, ".")}`
        }</span>`
      : Resources.Tips.DriverNA;

  return [
    {
      id: "RecordDateTime",
      Tooltip: "Record Date",
      val: moment(locInfo?.RecordDateTime)
        .utc()
        .local()
        .format("LL hh:mm:ss a"),
      icon: getIconPopup("RecordDateTime"),
    },
    {
      id: "VehicleID",
      Tooltip: "Vehicle ID",
      val: locInfo?.VehicleID,
      unit: "",
      icon: getIconPopup("VehicleID"),
    },
    {
      id: "Speed",
      Tooltip: "Speed",
      val: locInfo?.Speed,
      unit: "km/h",
      icon: getIconPopup("Speed"),
    },
    {
      id: "Direction",
      Tooltip: "Direction",
      val: locInfo?.Direction ?? "Unknown" + " &deg;",
      icon: getIconPopup("Direction"),
    },

    {
      id: "VehicleStatus",
      Tooltip: "Vehicle Status",
      val:
        Saferoad.Popup.Helpers.VStatusToStr(locInfo?.VehicleStatus) ??
        "Unknown",
      icon: getIconPopup("VehicleStatus"),
    },
    {
      id: "EngineStatus",
      Tooltip: "EngineStatus",
      val:
        Saferoad.Popup.Helpers.EStatusToStr(locInfo?.EngineStatus) ?? "Unknown",
      unit: "",
      icon: getIconPopup("EngineStatus"),
    },
    {
      id: "Mileage",
      Tooltip: "Mileage",
      val: locInfo?.Mileage / 1000 ?? "Unknown",
      unit: "KM",
      icon: getIconPopup("Mileage"),
    },
    {
      id: "Duration",
      Tooltip: "Duration",
      val: Saferoad.Popup.Helpers.DurationToStr(locInfo?.Duration) ?? "Unknown",
      unit: "",
      icon: getIconPopup("Duration"),
    },
    {
      id: "DriverName",
      Tooltip: "Driver Name",
      val: driver(),
      icon: getIconPopup("DriverUrl"),
      DriverID: locInfo?.RFID || locInfo?.DriverID,
    },

    {
      id: "GroupName",
      Tooltip: "Group Name",
      val: locInfo?.GroupName ?? "UnGrouped",
      icon: getIconPopup("GroupName"),
    },
    {
      id: "PlateNumber",
      Tooltip: "Plate Number",
      val: locInfo?.PlateNumber ?? "Unknown",
      unit: "",
      icon: getIconPopup("PlateNumber"),
    },
    {
      id: "SimSerialNumber",
      Tooltip: "Sim Number",
      val: locInfo?.SimSerialNumber ?? "Unknown",
      unit: "",
      icon: getIconPopup("SimCardNumber"),
    },
    {
      id: "SerialNumber",
      Tooltip: "Serial Number",
      val: locInfo?.SerialNumber ?? "Unknown",
      icon: getIconPopup("SerialNumber"),
    },
    {
      id: "IgnitionStatus",
      Tooltip: "Ignition Control",
      val:
        Saferoad.Popup.Helpers.IgnitionToStr(locInfo?.IgnitionStatus) ??
        "Unknown",
      icon: getIconPopup("IgnitionStatus"),
    },
    {
      id: "TotalWeight",
      Tooltip: "Actual Weight",
      val: locInfo?.WeightReading > 0 ? locInfo?.WeightReading : "Unknown",
      unit: locInfo?.WeightReading > 0 ? "kg" : "",
      icon: getIconPopup("weightreading"),
    },
    {
      id: "Temp1",
      Tooltip: "temperature",
      val:
        getAvg(
          [locInfo?.Temp1, locInfo?.Temp2, locInfo?.Temp3, locInfo?.Temp4],
          3000,
          10
        ) == 3000
          ? "Not Available"
          : getAvg(
              [locInfo?.Temp1, locInfo?.Temp2, locInfo?.Temp3, locInfo?.Temp4],
              3000,
              10
            ),
      unit:
        getAvg(
          [locInfo?.Temp1, locInfo?.Temp2, locInfo?.Temp3, locInfo?.Temp4],
          3000,
          10
        ) == 3000
          ? ""
          : "C",
      icon: getIconPopup("Temp"),
    },

    {
      id: "Hum1",
      Tooltip: "Humidity Sensor 1",
      val:
        getAvg(
          [locInfo?.Hum1, locInfo?.Hum2, locInfo?.Hum3, locInfo?.Hum4],
          -1,
          10
        ) == -1
          ? "Not Available"
          : getAvg(
              [locInfo?.Hum1, locInfo?.Hum2, locInfo?.Hum3, locInfo?.Hum4],
              -1,
              10
            ),
      unit:
        getAvg(
          [locInfo?.Hum1, locInfo?.Hum2, locInfo?.Hum3, locInfo?.Hum4],
          -1,
          10
        ) == -1
          ? ""
          : "%",

      icon: getIconPopup("HUM"),
    },
    {
      id: "SeatBelt",
      Tooltip: "SeatBelt",
      val: locInfo?.SeatBelt ? "Yes" : "No" ?? "No",
      icon: getIconPopup("SeatBelt"),
    },
    {
      id: "Address",
      Tooltip: "Address",
      val: locInfo?.Address ?? "Unknown",
      icon: getIconPopup("Address"),
    },

    {
      id: "Latitude , Longitude",
      Tooltip: "Latitude , Longitude",
      val: `${locInfo?.Latitude ?? "Unknown"} , ${
        locInfo?.Longitude ?? "Unknown"
      }`,
      icon: getIconPopup("LangLat"),
    },
    {
      id: "Invalid",
      Tooltip: "Invalid",
      val: locInfo?.Invalid ?? "Unknown",
      icon: getIconPopup("Invalid"),
    },
  ];
}
