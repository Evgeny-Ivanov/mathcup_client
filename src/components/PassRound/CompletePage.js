import React from 'react';
import { Message } from 'semantic-ui-react';

const CompletePage = () => (
  <Message>
    <Message.Header>
      Результаты сохранены
    </Message.Header>
    <p>
      Пока раунд не завершен, вы еще можете вернуться и поменять ответы.
      Результаты можно будет увидет после завершения раунда.
    </p>
  </Message>
);

export default CompletePage;
