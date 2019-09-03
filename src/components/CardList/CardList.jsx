import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import './card-list.css';

function CardList(props) {
  const { users } = props;

  return (
    <div className="card-list">
      {users.map(user => (
        <Card key={user.id} user={user} />
      ))}
    </div>
  );
}

export default CardList;
