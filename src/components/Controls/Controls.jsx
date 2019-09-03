import React, { useState, useEffect } from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import "./controls.css";
import { SORTS } from "../App/constants";

const Controls = props => {
  const { sort, updateSort, ascending, updateAscending } = props;

  return (
    <div className="controls-container">
      <Menu vertical>
        <Dropdown item text="Sort By">
          <Dropdown.Menu>
            {SORTS.map(name => (
              <Dropdown.Item
                key={name}
                active={sort === name.toLowerCase()}
                onClick={() => updateSort(name.toLowerCase())}
              >
                {name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
      <Menu vertical>
        <Dropdown item text={ascending ? "Ascending" : "Descending"}>
          <Dropdown.Menu>
            <Dropdown.Item
              active={ascending}
              onClick={() => updateAscending(true)}
            >
              {"Ascending"}
            </Dropdown.Item>
            <Dropdown.Item
              active={!ascending}
              onClick={() => updateAscending(false)}
            >
              {"Descending"}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </div>
  );
};

export default Controls;
