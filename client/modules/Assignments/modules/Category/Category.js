import React, { PropTypes } from 'react';
import { Link } from 'react-router';


// Import Style
import styles from './Category.css';

import GridTile from 'material-ui/GridList';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

export function Category(category) {
  var locationToGo = (category.location.charAt(category.location.length - 1) == "/") ? category.location.substring(0, category.location.length - 1) : category.location;
  return (
      <span style = {{marginRight: 20 + 'px', display:'block'}}>
        <RaisedButton
          fullWidth = {true}
          label={category.name}
          onClick={()=> {category.update(category.name, "toggle")}}
        />
        <Drawer
          docked={false}
          width={250}
          open={category.nowOpen}
          onRequestChange={(open) => {category.update(category.name, open)}}
        >
        <Menu>
          {category.assignments.map(assignment => (
            <MenuItem key={assignment._id}
              primaryText={assignment.name}
              onClick={() => { window.location += "/" +assignment.name; }} />
          ))}
        </Menu>

      </Drawer>
    </span>
  );
}


export default Category;
