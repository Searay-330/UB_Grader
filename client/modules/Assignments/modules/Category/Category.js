import React, { PropTypes } from 'react';
import { Link } from 'react-router';


// Import Style
import styles from './Category.css';

import GridTile from 'material-ui/GridList';
import {Card, CardMedia, CardHeader, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

export function Category(category) {
  var locationToGo = (category.location.charAt(category.location.length - 1) == "/") ? category.location.substring(0, category.location.length - 1) : category.location;

  return (
    
     <Card className={styles.test}>
    <CardHeader
      title={category.name}
      className ={ [styles.header, styles.text].join(' ')}
    />
    <CardMedia >
 
        <Menu maxHeight={300} className={ [styles.menu, styles.menuDiv].join(' ')}>
          {category.assignments.map(assignment => (
            <MenuItem key={assignment.id}
              primaryText={assignment.name}
              onClick={() => { window.location = "/courses/"  + category.courseNum + "/assignments/" + assignment.name; }} />
          ))}
        </Menu>

    </CardMedia>
  </Card>
  );
}


export default Category;
