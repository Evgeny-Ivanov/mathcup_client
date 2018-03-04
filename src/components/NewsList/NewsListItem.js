import React from 'react';
import moment from 'moment';
import { Item } from 'semantic-ui-react';
import RawDraftReader from '../RawDraftReader';

const NewsListItem = ({ header, content, date }) => (
  <Item>
    <Item.Content>
      <Item.Header as='a'>{header}</Item.Header>
      <Item.Description>
        <RawDraftReader content={content} blockCount={2} />
      </Item.Description>
      <Item.Extra>{moment(date).fromNow()}</Item.Extra>
    </Item.Content>
  </Item>
);

export default NewsListItem;
