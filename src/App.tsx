import { useMemo, useState } from "react";
import data from "../frontend-assignment.json";
import { Pagination } from "./components";
import "./styles.css";
import { Globe, Heart, MapPin, User } from "lucide-react";
import { ProjectRecord } from "./types";

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatEndDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const getDaysToGo = (endDate: string) => {
  const end = new Date(endDate);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const hasEnded = (endDate: string) => {
  const end = new Date(endDate);
  const now = new Date();
  return end < now;
};

const columnGroups = {
  Project: ["s.no", "title", "by", "type"],
  Details: ["country", "location", "end.time"],
  Stats: ["amt.pledged", "currency", "percentage.funded", "num.backers"],
} as const;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const projectBadges = useMemo(() => {
    return data.reduce((acc, project) => {
      acc[project["s.no"]] = Math.random() < 0.3;
      return acc;
    }, {} as Record<number, boolean>);
  }, []);

  const renderProjectCell = (item: ProjectRecord, showBadge: boolean) => (
    <div className="project-main">
      <div className="project-title-row">
        <span className="project-type">{item.type}</span>
        {showBadge && (
          <span className="project-badge">
            <Heart size={14} className="heart-icon" />
            Project We Love
          </span>
        )}
      </div>
      <div className="project-title-container">
        <span className="project-number">#{item["s.no"]}</span>
        <a
          href={`https://www.kickstarter.com${item.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="project-title-link"
        >
          {item.title}
        </a>
      </div>
      <div className="project-creator">
        <User size={16} />
        by {item.by}
      </div>
    </div>
  );

  const renderDetailsCell = (item: ProjectRecord) => {
    const isEnded = hasEnded(item["end.time"]);
    const daysToGo = isEnded ? 0 : getDaysToGo(item["end.time"]);

    return (
      <div className="project-details">
        <div className="location-info">
          {item.country === "US" ? (
            <MapPin className="location-icon" size={16} />
          ) : (
            <Globe className="location-icon international" size={16} />
          )}
          {item.location}
        </div>
        {isEnded ? (
          <div className="project-ended">
            Ended on {formatEndDate(item["end.time"])}
          </div>
        ) : (
          <div className="time-remaining">{daysToGo} days to go</div>
        )}
      </div>
    );
  };

  const renderStatsCell = (item: ProjectRecord) => {
    const goalAmount = item["amt.pledged"] / (item["percentage.funded"] / 100);

    return (
      <div className="project-stats">
        <div className="pledged-amount">
          {formatCurrency(item["amt.pledged"], item.currency)}
          <span className="goal-text">
            pledged of {formatCurrency(goalAmount, item.currency)} goal
          </span>
        </div>
        <div className="backers-count">
          {Number(item["num.backers"]).toLocaleString()} backers
        </div>
        <div className="funding-progress-container">
          <div className="funding-progress">
            <div
              className="progress-bar"
              style={{ width: `${Math.min(item["percentage.funded"], 100)}%` }}
            />
          </div>
          <div className="funding-percentage">
            {Math.round(item["percentage.funded"])}% funded
          </div>
        </div>
      </div>
    );
  };

  const renderCell = (
    item: ProjectRecord,
    columnGroup: keyof typeof columnGroups
  ) => {
    switch (columnGroup) {
      case "Project":
        return renderProjectCell(item, projectBadges[item["s.no"]]);
      case "Details":
        return renderDetailsCell(item);
      case "Stats":
        return renderStatsCell(item);
      default:
        return null;
    }
  };

  const indexOfLastRecord = currentPage * pageSize;
  const indexOfFirstRecord = indexOfLastRecord - pageSize;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="table-container">
      <table role="grid" aria-label="Projects Data">
        <thead>
          <tr role="row">
            {Object.keys(columnGroups).map((groupTitle) => (
              <th key={groupTitle} role="columnheader" scope="col">
                {groupTitle}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item: ProjectRecord) => (
            <tr key={item["s.no"]} role="row">
              {Object.keys(columnGroups).map((groupTitle) => (
                <td key={groupTitle} role="gridcell">
                  {renderCell(item, groupTitle as keyof typeof columnGroups)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        total={data.length}
        current={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  );
}

export default App;
