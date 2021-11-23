import React, { useEffect, useState } from "react";
import "./style.scss";
import apple from "./apple.jpeg";
import left from "./left.svg";
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const Calender = () => {
  const [date, setdate] = useState(new Date(Date.now()));
  const [firestsec, setfirestsec] = useState([]);
  const [month, setmonth] = useState(new Date(date).getMonth());
  const [day, setday] = useState(new Date(date).getDate());
  const [week, setweek] = useState(new Date(date).getDay());
  const [year, setyear] = useState(new Date(date).getFullYear());
  const [datedet, setdet] = useState(days[0]);
  const [update, setupdate] = useState("month");
  const [allset, setallset] = useState([]);
  useEffect(() => {
    setmonth(new Date(date).getMonth());
    setday(new Date(date).getDate());
    setweek(new Date(date).getDay());
    setyear(new Date(date).getFullYear());
    const dates = [];
    let w = 0;
    const startweekdau = new Date(new Date(date).setDate(1)).getDay();
    while (startweekdau > w) {
      if (dates.length >= 7) break;
      dates.push(null);
      w++;
    }
    let i = 1;
    while (dates.length < 7) {
      dates.push(i);
      i++;
    }
    setfirestsec(dates);
    let datex = dates[dates.length - 1];
    datex = new Date(date).setDate(datex);
    let allsx = [];
    while (1) {
      let nextDate = new Date(datex).getDate();
      nextDate = new Date(datex).setDate(nextDate + 1);
      if (new Date(nextDate).getDate() === 1) break;
      datex = nextDate;
      allsx.push(new Date(datex).getDate());
    }
    setallset([...allsx]);
  }, [date]);
  const onsetdate = (id) => {
    const newdate = new Date(date).setDate(id);
    setdate(newdate);
  };

  const prevupdate = () => {
    if (update === "month") {
      let next = new Date(date).getMonth() - 1;
      setdate(new Date(new Date(date).setMonth(next)).setDate(1));
    } else {
      let next = new Date(date).getFullYear() - 1;
      setdate(new Date(new Date(date).setFullYear(next)).setDate(1));
    }
  };

  const nextupdate = () => {
    if (update === "month") {
      let next = new Date(date).getMonth() + 1;
      setdate(new Date(new Date(date).setMonth(next)).setDate(1));
    } else {
      let next = new Date(date).getFullYear() + 1;
      setdate(new Date(new Date(date).setFullYear(next)).setDate(1));
    }
  };
  useEffect(() => {
    if (update === "month") {
      setdet(months[new Date(date).getMonth()]);
    } else if (update === "year") {
      setdet(new Date(date).getFullYear());
    }
  }, [update, date]);
  return (
    <div className="rx-calender">
      <div
        style={{ backgroundImage: `url(${apple})` }}
        className="date-details"
      >
        <div className="event-date">
          <div className="date-week">
            <p className="date">{day}</p>
            <p className="week-day">{", "+days[week]}</p>
          </div>
          <div className="month-yr">
            <p>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setupdate("month")}
              >
                {months[month]}
              </span>{" "}
              |{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setupdate("year")}
              >
                {year}
              </span>
            </p>
          </div>
        </div>
        {update ? (
          <div className="set-date">
            <img
              onClick={() => prevupdate()}
              className="left"
              src={left}
              alt="left"
            />
            <p>{datedet}</p>
            <img
              onClick={() => nextupdate()}
              className="right"
              src={left}
              alt="right"
            />
          </div>
        ) : null}
      </div>
      <div style={{ padding: "0px 20px 0 0" }}>
        <div className="calender-dates-name">
          {days.map((item, key) => (
            <p key={key} className="date-xx">
              {item[0]}
            </p>
          ))}
        </div>

        <div className="calender-dates-day">
          <div className="dates">
            {firestsec.map((item, key) => (
              <div
                onClick={() => onsetdate(item)}
                style={{ cursor: "pointer" }}
                className="date-xx"
                key={key}
              >
                {item}
              </div>
            ))}
          </div>
          {[0, 1, 2, 3, 4, 5].map((x, key) =>
            x * 7 + 0 < allset.length ? (
              <div key={key} className="dates">
                {[0, 1, 2, 3, 4, 5, 6].map((y, key) => (
                  <div
                    key={key}
                    onClick={() => onsetdate(allset[x * 7 + y])}
                    style={{ cursor: "pointer" }}
                    className="date-xx"
                  >
                    {x * 7 + y < allset.length ? (
                      allset[x * 7 + y]
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default Calender;
