import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './Category.css';

// Import Bootstrap
import { Col, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';


export function Category(category) {
  return (
  	<Col md={4}>
  		<Panel collapsible className="text-center" header={category.name} eventKey="1">
  			Some default panel content here.
  			<ListGroup componentClass='div' fill>
     			<ListGroupItem className={styles.border_fix}>Item 1</ListGroupItem>
    		</ListGroup>
    	</Panel>
    </Col>
  );
}

export default Category;
