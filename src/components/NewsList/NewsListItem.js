import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { Item } from 'semantic-ui-react';
import RawDraftReader from '../RawDraftReader';

const NewsListItem = ({
  id, header, content, date, history,
}) => (
  <Item>
    <Item.Content>
      <Item.Header as='a' onClick={() => history.push(`/news/${id}`)}>
        {header}
      </Item.Header>
      <Item.Description>
        <RawDraftReader content={content} blockCount={2} />
      </Item.Description>
      <Item.Extra>{moment(date).fromNow()}</Item.Extra>
    </Item.Content>
  </Item>
);

export default withRouter(NewsListItem);
