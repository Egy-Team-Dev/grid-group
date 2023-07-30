import { i18n, useTranslation } from "next-i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  FormControl,
  From,
  InputGroup,
  Row,
} from "react-bootstrap";
import UseTableColumns from "hooks/UseTableColumns";
import AgGridDT from "../AgGridDT";
import axios from "axios";

import { useSelector } from "react-redux";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import CurrentActiveReportOptions from "./CurrentActiveReportOptions";
import { convertJsonToExcel } from "/helpers/helpers.js";
import { toast } from "react-toastify";
import Model from "components/UI/Model";
import "ag-grid-enterprise";


// import TableModel from "./TableModel";
// import { encryptName } from "helpers/encryptions";

const TableTaps = ({
  fullSelectedReportData,
  handleTap,
  config,
  handleCloseTab,
  style,
  reportsTitleSelectedId,
  reportsDataSelected,
  Data_table,
  setData_table,
  reportsTitleSelected,
  mainApi,
  dateChange,
  setDataChange,
  //////////////
  show,
  setShow,
  ShowReports,
  loadingShowCurrentReport,
  dateStatus,
  setDateStatus,
  setVehiclesError,
  vehiclesError,
  setFullSelectedReportData,
  vehChecked,
  setVehChecked,
}) => {
  const currentLanguage = i18n.language;
  const { t } = useTranslation(["reports", "main", "Table"]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [listDCurr, setListDCurr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDisabledBtnPrevious, setIsDisabledBtnPrevious] = useState(true);
  const [isDisabledBtnNext, setIsDisabledBtnNext] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [emailPopup, setEmailPopup] = useState(false);
  const [email, setEmail] = useState("");

  const [allData, setAllData] = useState({
    id: "Math.random().toString(32).substring(3)",
    data: [],
    currentPage: 1,
  });

  const downloadFile = (blob, fileName) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
  };

  const [tableData, settableData] = useState([]);

  const { darkMode } = useSelector((state) => state.config);
  const {
    Working_Hours_and_Mileage_Daily_BasisColumn,
    Working_Hours_and_Mileage_PeriodColumn,
    Custom_Running_TimeColumn,
    Trip_ReportColumn,
    Fuel_Summary_ReportColumn,
    Driver_LoggingColumn,
    Driving_Statistics_Per_PeriodColumn,
    Zone_ActivityColumn,
    Geofences_LogColumn,
    Zones_Summary_ActivitiesColumn,
    Zones_Summary_Activities_DailyColumn,
    In_Zone_DetailsColumn,
    In_Zone_SummaryColumn,
    Weight_Statistics_ReportColumn,
    Weight_Detailed_ReportColumn,
    Temperature_Summary_ReportColumn,
    Temperature_Detailed_ReportColumn,
    Speed_Over_Duration_ReportColumn,
    Over_Speed_ReportColumn,
    Offline_Vehicles_ReportColumn,
    User_VehiclesColumn,
    Vehicle_Idling_and_Parking_ReportsColumn,
    Status_ReportColumn,
  } = UseTableColumns();

  const wholeReportApi = reportsDataSelected?.api
    ?.split("&")
    .filter((query) => query.startsWith("page") == false)
    .join("&");

  async function getWholeReportApi() {
    setLoading(true);

    // This to Translate the keys of object and send it to backend.
    const keys = Object.keys(allData.data[0] || {});
    const translatedKeys = keys.map((key) => t(`Table:${key}`));
    const source = axios.CancelToken.source();

    try {
      const res = await axios.post(
        "dashboard/reports/downloadExcel",
        { data: { url: wholeReportApi, headers: translatedKeys } },
        { timeout: 300000, responseType: "blob" }
      );

      const fileName = t(`${reportsDataSelected.name}`);
      downloadFile(res.data, fileName);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        if (error?.response?.data) {
          toast.error(error?.response?.data?.message);
        }
        setEmailPopup(true);
      }
    }
  }

  const GetReportsOnEmail = async () => {
    // This to Translate the keys of object and send it to backend.
    const keys = Object.keys(allData.data[0] || {});
    const translatedKeys = keys.map((key) => t(`Table:${key}`));

    try {
      setEmailPopup(false);
      const res = await axios.post("dashboard/reports/downloadExcel", {
        data: {
          url: wholeReportApi,
          headers: translatedKeys,
          email,
        },
      });

      toast.success(res?.data?.message);
      setEmail("");
    } catch (error) {
      setEmailPopup(false);
      toast.error(error?.response?.data?.message);
    }
  };

  // this to set settings for the currnet report
  useEffect(() => {
    if (reportsTitleSelectedId && allData?.data.length) {
      setListDCurr([]);

      switch (t(reportsTitleSelected)) {
        case t("hours_And_Mileage_Daily_Reports"):
          setListDCurr(Working_Hours_and_Mileage_Daily_BasisColumn);
          break;
        case t("hours_And_Milage_Period_Reports"):
          setListDCurr(Working_Hours_and_Mileage_PeriodColumn);
          break;
        case t("Custom_Running_Time_key"):
          setListDCurr(Custom_Running_TimeColumn);
          break;
        case t("trip_Report"):
          setListDCurr(Trip_ReportColumn);
          break;
        case t("Fuel_Summary_Report_key"):
          setListDCurr(Fuel_Summary_ReportColumn);
          break;
        case t("Driver_Logging_key"):
          setListDCurr(Driver_LoggingColumn);
          break;
        case t("Driving_Statistics_Per_Period_key"):
          setListDCurr(Driving_Statistics_Per_PeriodColumn);
          break;
        case t("Zone_Activity_key"):
          setListDCurr(Zone_ActivityColumn);
          break;
        case t("Geofences_Log_key"):
          // here
          setListDCurr(Geofences_LogColumn);
          break;
        case t("Zones_Summary_Activities_key"):
          setListDCurr(Zones_Summary_ActivitiesColumn);
          break;
        case t("Zones_Summary_Activities_Daily_key"):
          setListDCurr(Zones_Summary_Activities_DailyColumn);
          break;
        case t("In_Zone_Details_key"):
          setListDCurr(In_Zone_DetailsColumn);
          break;
        case t("In_Zone_Summary_key"):
          setListDCurr(In_Zone_SummaryColumn);
          break;
        case t("Weight_Statistics_Report_key"):
          setListDCurr(Weight_Statistics_ReportColumn);
          break;
        case t("Weight_Detailed_Report_key"):
          setListDCurr(Weight_Detailed_ReportColumn);
          break;
        case t("Temperature_Summary_Report_key"):
          setListDCurr(Temperature_Summary_ReportColumn);
          break;
        case t("Temperature_Detailed_Report_key"):
          setListDCurr(Temperature_Detailed_ReportColumn);
          break;
        case t("Speed_Over_Duration_Report_key"):
          setListDCurr(Speed_Over_Duration_ReportColumn);
          break;
        case t("Over_Speed_Report_key"):
          setListDCurr(Over_Speed_ReportColumn);
          break;
        case t("Offline_Vehicles_Report_key"):
          setListDCurr(Offline_Vehicles_ReportColumn);
          break;
        case t("User_Vehicles_key"):
          setListDCurr(User_VehiclesColumn);
          break;
        case t("Vehicle_Idling_and_Parking_Reports_key"):
          setListDCurr(Vehicle_Idling_and_Parking_ReportsColumn);
          break;
        case t("Seat_Belt_Report_Key"):
          setListDCurr(Status_ReportColumn);
          break;
        default:
          console.log("no data");
      }
    }
  }, [reportsTitleSelectedId, allData?.data]);

  const rowHeight = "auto";

  // this to set data for the currnet report and currnet report page number
  useEffect(() => {
    if (Object.keys(reportsDataSelected ?? {}).length) {
      setAllData(reportsDataSelected);
      setCurrentPage(reportsDataSelected?.currentPage);
      setDateStatus(reportsDataSelected?.dateStatus);
    }
  }, [reportsDataSelected]);

  //   useEffect(() => {
  //     let userData = JSON.parse(
  //         localStorage.getItem(encryptName("userData")) ?? "{}"
  //     );
  //     if (Object.keys(reportsDataSelected ?? {}).length) {
  //         setAllData({ ...reportsDataSelected, data: null });
  //         let dataMapped = reportsDataSelected.data?.map((element) => {
  //             const cashedVeh =
  //                 (userData.vehData || []).find(
  //                     (ele) => ele.SerialNumber === element.SerialNumber
  //                 ) ||
  //                 (userData.vehData || []).find(
  //                     (ele) => ele.VehicleID === element.VehicleID
  //                 ) ||
  //                 {};
  //             console.log("abdooooo", element, cashedVeh);
  //             return new TableModel(element, cashedVeh);
  //         });
  //         settableData(dataMapped);
  //         console.log("dataMapped", dataMapped);
  //         setCurrentPage(reportsDataSelected?.currentPage);
  //     }
  // }, [reportsDataSelected]);

  // this to cache common columns settings
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);

  // Start AG grid Settings
  const columns = useMemo(() => listDCurr, [listDCurr]);

  //set the Api of the AG grid table
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  //first page to render in the AG grid table
  const onFirstDataRendered = (params) => {
    params.api.paginationGoToPage(0);
  };

  const handleSelectTabs = (id) =>
    reportsTitleSelectedId === id ? "active" : "";

  const handleSelectContentTabs = (id) =>
    reportsTitleSelectedId === id ? "show active" : "";

  useEffect(() => {
    if (gridApi) {
      let allPages = gridApi.paginationGetTotalPages();
      let currentPage = gridApi.paginationGetCurrentPage() + 1;
      if (allPages === currentPage) {
        setIsDisabledBtnNext(true);
      }
    }
  }, [gridApi, currentPage]);

  return (
    <Row>
      <Col sm="12">
        <Card>
          <Card.Body>
            <ul
              className="nav nav-tabs bg-transparent"
              id="myTab"
              role="tablist"
            >
              <div
                className="d-flex horizontal-scrollable w-100"
                style={{
                  overflowX: "auto",
                  whiteSpace:
                    fullSelectedReportData?.data?.length > 0
                      ? "nowrap"
                      : "normal",
                }}
              >
                {fullSelectedReportData?.data?.length
                  ? fullSelectedReportData?.data?.map((item, key) => (
                      <li
                        className={`nav-item ${
                          darkMode ? "btn-dark" : "btn-light"
                        } report_tab p-2 ${handleSelectTabs(item?.id)} `}
                        role="presentation"
                        key={key}
                      >
                        <button
                          className="nav-link bg-transparent text-primary btnLink  rounded-0 position-relative p-0 ps-2 pe-4"
                          id={`data-${item?.id}`}
                          data-bs-toggle="tab"
                          data-bs-target={`#data-${item?.id}`}
                          type="button"
                          role="tab"
                          onClick={() =>
                            handleTap(
                              item?.name,
                              item?.id,
                              item?.api,
                              item?.startDate,
                              item?.endDate,
                              item?.vehChecked
                            )
                          }
                        >
                          <span
                            dir={config.language === "ar" ? "rtl" : "ltr"}
                            className="report_name"
                          >
                            {t(item?.name)}
                          </span>
                          <div
                            onClick={(e) => handleCloseTab(e, item?.id)}
                            className={`${style.closeTab} ${style.active}`}
                          >
                            <span
                              className={`${style.closeTab__patty} bg-primary`}
                            />
                            <span
                              className={`${style.closeTab__patty} bg-primary`}
                            />
                            <span
                              className={`${style.closeTab__patty} bg-primary`}
                            />
                          </div>
                        </button>
                      </li>
                    ))
                  : ""}
              </div>
            </ul>
            {Object.keys(reportsDataSelected ?? {}).length ? (
              <CurrentActiveReportOptions
                show={show}
                setShow={setShow}
                onHide={ShowReports}
                loadingShowCurrentReport={loadingShowCurrentReport}
                dateStatus={dateStatus}
                setVehiclesError={setVehiclesError}
                vehiclesError={vehiclesError}
                setFullSelectedReportData={setFullSelectedReportData}
                reportsDataSelected={reportsDataSelected}
                reportsTitleSelectedId={reportsTitleSelectedId}
                fullSelectedReportData={fullSelectedReportData}
                vehChecked={vehChecked}
                setVehChecked={setVehChecked}
                getWholeReportApi={getWholeReportApi}
                loading={loading}
                setDataChange={setDataChange}
                dateChange={dateChange}
              />
            ) : (
              ""
            )}
            <div className="tab-content" id="myTabContent">
              {fullSelectedReportData?.data?.length
                ? fullSelectedReportData?.data?.map((item, key) => (
                    <>
                      {item?.id === reportsTitleSelectedId && (
                        <div
                          key={key}
                          className={`tab-pane fade ${handleSelectContentTabs(
                            item?.id
                          )}`}
                          id={`data-${item?.id}`}
                          role="tabpanel"
                        >
                          <AgGridDT
                            getWholeReportApi={getWholeReportApi}
                            rowHeight={rowHeight}
                            columnDefs={columns}
                            rowData={allData?.data}
                            // pagination={true}
                            // paginationNumberFormatter={function (params) {
                            //   return params.value.toLocaleString();
                            // }}
                            onFirstDataRendered={onFirstDataRendered}
                            defaultColDef={defaultColDef}
                            onGridReady={onGridReady}
                            overlayLoadingTemplate={
                              '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
                            }
                            suppressMenuHide={false}
                            gridApi={gridApi}
                            gridColumnApi={gridColumnApi}
                            customPaganition={false}
                            loading={loading}
                            paginationPageSize={10}
                          />
                        </div>
                      )}
                    </>
                  ))
                : ""}
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Email Popup */}

      {emailPopup && (
        <Model
          header={"Confirm"}
          show={emailPopup}
          onHide={() => setEmailPopup(false)}
          updateButton={"Send"}
          size={"lg"}
          className={"mt-5"}
          onUpdate={GetReportsOnEmail}
          disabled={!email}
        >
          <h5 className="mb-3 " style={{ letterSpacing: "1.7px" }}>
            You have asked to export a large number of records. If you choose to
            continue, the resulting file will be created offline and emailed to
            your address on file when it completes. Enter Your email and Click
            Send to continue, or Close to cancel the operation.
          </h5>

          <FormControl
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Model>
      )}
    </Row>
  );
};

export default TableTaps;
