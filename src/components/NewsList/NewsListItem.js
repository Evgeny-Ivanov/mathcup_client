import React from 'react';
import moment from 'moment';
import { Item } from 'semantic-ui-react';
import Link from '../Link';
import RawDraftReader from '../RawDraftReader';

const NewsListItem = ({ id, header, content, date }) => (
  <Item>
    <Item.Content>
      <Link to={`/news/${id}`} wrapper={Item.Header} as='a'>{header}</Link>
      <Item.Description>
        <RawDraftReader content={content} blockCount={2} />
      </Item.Description>
      <Item.Extra>{moment(date).fromNow()}</Item.Extra>
    </Item.Content>
  </Item>
);

export default NewsListItem;
