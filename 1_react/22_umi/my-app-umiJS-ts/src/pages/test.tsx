
import React, { useState } from 'react';
import { useIntl } from 'umi';
console.log(useIntl);

export default function () {
  const { formatMessage } = useIntl();
  console.log(formatMessage);
  return (
    <button type="primary">
      {formatMessage(
        {
          id: 'name',
          defaultMessage: '你好，旅行者',
        },
        {
          name: '旅行者',
        },
      )}
    </button>
  );
}