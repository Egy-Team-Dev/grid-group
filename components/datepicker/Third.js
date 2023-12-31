import React, { useState } from "react";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

const Third = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="d-flex date_input mt-5">
      <DatePicker
        className="w-75"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        showTimeSelect
        dateFormat="dd/MM/yyyy h:mm aa"
        showPopperArrow={false}
        placeholderText="Select Start Date Range"
      />
      <DatePicker
        className="w-75"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        showTimeSelect
        dateFormat="dd/MM/yyyy h:mm aa"
        placeholderText="Select End Date Range"
        showPopperArrow={false}
      />
    </div>
  );
};
export default Third;
