import React, { PropTypes } from 'react';
import { Link } from 'react-router';


// Import Style
import styles from './Category.css';

import GridTile from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

export function Category(category) {
  console.log(category);
  return (
    <GridTile>
      <Card className={styles.list}>
        <CardHeader title={category.name} />
        <Divider />
        <CardMedia>
          <List className={styles.list}>
            {category.assignments.map(assignment => (
              <ListItem key={assignment._id} >
                <RaisedButton fullWidth={true} secondary={true} label={assignment.name} href={[category.location, assignment.name].join('/')} />
              </ListItem>
            ))}
          </List>
        </CardMedia>
      </Card>
    </GridTile>
  );
}


export default Category;
