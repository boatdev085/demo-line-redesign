import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Icon, Avatar } from "antd";
const { Meta } = Card;
const Items = props => {
  const { data, setModal, useProfile } = props;
  const [useList, setList] = useState([]);
  useEffect(() => {
    setList(data);
  }, [data]);
  return useList.map((item, idx) => {
    const { userId, displayName, pictureUrl, statusMessage } = item;
    return (
      <BoxCard
        key={userId || idx}
        actions={[
          <BoxSendMessage
            onClick={() =>
              setModal({
                visible: true,
                text: "",
                uid: userId,
                displayName,
                arrowShowDisplay: true,
                DisplayNameFrom: useProfile.displayName
              })
            }
          >
            <Icon type="edit" />
            ส่ง message ถึงคุณ {displayName}
          </BoxSendMessage>
        ]}
      >
        <Meta
          avatar={<Avatar src={pictureUrl} />}
          title={displayName ? `คุณ ${displayName || ""}` : ""}
          description={statusMessage}
        />
      </BoxCard>
    );
  });
};
export default Items;
const BoxCard = styled(Card)`
  margin: 16px;
`;

const BoxSendMessage = styled.div`
  cursor: pointer;
`;
