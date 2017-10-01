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
import Divider from 'material-ui/Divider';

export function Category(category) {
  var locationToGo = (category.location.charAt(category.location.length - 1) == "/") ? category.location.substring(0, category.location.length - 1) : category.location;
  return (

        <Card>
        <CardTitle className={styles.header} titleColor='white' title={category.name} />
        <CardMedia>
        <Menu>
          {category.assignments.map(assignment => (
            <MenuItem key={assignment._id}
              primaryText={assignment.name}
              onClick={() => { document.location.href = [locationToGo, assignment.name].join('/'); }} />
          ))}
        </Menu>
        </CardMedia>
        </Card>

  );
}


export default Category;
