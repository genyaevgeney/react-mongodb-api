import React from 'react';

const BlockInfo = ({paginationData}) => {

  return (
    <h1>{paginationData[0].amount}</h1>
    )
}

export default BlockInfo;