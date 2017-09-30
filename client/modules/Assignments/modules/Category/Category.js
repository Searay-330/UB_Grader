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
  console.log(category);
  return (

        <Card>
        <CardTitle className={styles.header} titleColor='white' title={category.name} />
        <CardMedia>
        <Menu>
          {category.assignments.map(assignment => (
            <MenuItem key={assignment._id}
              primaryText={assignment.name}
              onClick={() => { document.location.href = [category.location, assignment.name].join('/'); }} />
          ))}
        </Menu>
        </CardMedia>
        </Card>

  );
}


export default Category;
