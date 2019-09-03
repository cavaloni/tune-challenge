import React from "react";
import { Segment, Image, Header } from "semantic-ui-react";
import { LineChart, Line, Label, XAxis } from "recharts";
import "./card.css";
import { AVATAR_COLORS } from "../App/constants";

function Card(props) {
  const { user } = props;

  const colorKey = Object.keys(AVATAR_COLORS).find(letters =>
    letters.includes(user.name.toLowerCase().charAt(0))
  );

  const avatarColor = AVATAR_COLORS[colorKey];

  const conversionsByDay = Object.keys(user.conversionDates)
    .sort((a, b) => new Date(a) - new Date(b))
    .map(date => ({
      date,
      conversions: user.conversionDates[date]
    }));

  const startDate = conversionsByDay[0].date
    .split("-")
    .splice(1)
    .join("/");
  const endDate = conversionsByDay[conversionsByDay.length - 1].date
    .split("-")
    .splice(1)
    .join("/");

  return (
    <Segment raised className="segment-padding">
      {user.avatar ? (
        <Image src={user.avatar} size="tiny" avatar circular floated="left" />
      ) : (
        <div className="empty" style={{ background: avatarColor }}>
          {user.name.charAt(0)}
        </div>
      )}
      <div className="right-header-info">
        <Header as="h2">{user.name}</Header>
        <div className="occupation">{user.occupation}</div>
      </div>
      <secion className="lower-card-contents">
        <div className="chart-container">
          <LineChart width={300} height={100} data={conversionsByDay}>
            <Line
              dot={false}
              type="monotone"
              dataKey="conversions"
              stroke="black"
            />
            <XAxis axisLine={false} tick={false}>
              <Label
                value={`Conversions ${startDate} to ${endDate}`}
                offset={0}
                position="insideBottom"
              />
            </XAxis>
          </LineChart>
        </div>
        <div className="user-data-snippet">
          <div className="impressions">{user.impressions}</div>
          <div className="user-data-text">Impressions</div>
        </div>
        <div className="user-data-snippet">
          <div className="conversions">{user.conversions}</div>
          <div className="user-data-text">Conversions</div>
        </div>
        <div className="user-data-snippet">
          <div className="revenue">
            ${user.revenue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
          </div>
        </div>
      </secion>
    </Segment>
  );
}

export default Card;
