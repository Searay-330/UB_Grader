import React, { PropTypes } from 'react';
import { Link } from 'react-router';


// Import Style
import styles from './Category.css';

// Import Bootstrap
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import { Col, ListGroup, Panel, ListGroupItem} from 'react-bootstrap';


bootstrapUtils.addStyle(Panel, ["default",styles['panel_custom']].join(' '));

export function Category(category) {
  return (
  	<Col md={4}>
  		<Panel bsStyle={["default",styles['panel_custom']].join(' ')} header={category.name} eventKey="1">
  			Some default panel content here.
  			<ListGroup componentClass='div' fill>
     			<ListGroupItem >Item 1</ListGroupItem>
    		</ListGroup>
    	</Panel>
    </Col>
  );
}


export default Category;
