import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./utils/index";
import axios from "axios";
import "./App.css";
import "antd/dist/antd.css";
import {
  Input,
  Modal,
  PageHeader,
  Card,
  Avatar,
  notification,
  Checkbox
} from "antd";
import Chart from "chart.js";
import QRCode from "./assets/L.png";
import Items from "./ components/Items";
const { Meta } = Card;
const liff = window.liff;
const App = () => {
  const [useData, setData] = useState([]);
  const [useLoading, setLoading] = useState(true);
  const [useModal, setModal] = useState({
    visible: false,
    text: "",
    uid: "",
    displayName: "",
    arrowShowDisplay: true,
    DisplayNameFrom: ""
  });
  const [useProfile, setProfile] = useState({
    userId: "",
    displayName: "",
    pictureUrl: "",
    statusMessage: ""
  });

  const getFireStore = async () => {
    firebase
      .firestore()
      .collection("user")
      .onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        setLoading(false);
        changes.forEach(change => {
          if (change.type === "added") {
            genDataFireStore();
          }
          if (change.type === "removed") {
            genDataFireStore();
          }
        });
      });
  };
  const genDataFireStore = async () => {
    const getDB = firebase.firestore().collection("user");
    const getUser = await getDB.get().then(querySnapshot => {
      if (!querySnapshot.empty) {
        let getDataArray = [];
        querySnapshot.forEach(function(doc) {
          getDataArray.push(doc.data());
        });
        return getDataArray;
      } else {
        return [];
      }
    });
    setData(getUser);
    setLoading(false);
  };
  const confirmSend = async () => {
    const {
      text,
      uid,
      displayName,
      arrowShowDisplay,
      DisplayNameFrom
    } = useModal;
    if (!text || text === "") {
      alert("พิมพ์ข้อความก่อนสิ");
      return;
    }
    const sendMessage = await axios.post("/api/push", {
      message: text,
      uid,
      arrowShowDisplay,
      DisplayNameFrom
    });
    if (sendMessage.status === 200) {
      notification["success"]({
        message: `ส่งข้อความให้คุณ ${displayName} เรียบร้อย`
      });
    } else {
      notification["error"]({
        message: `ตรวจพบปัญหา ไม่สามารถส่งข้อความให้คุณ ${displayName} ได้`
      });
    }
    setModal({ visible: false, text: "", uid: "", displayName: "" });
  };
  const handleText = e => {
    setModal({ ...useModal, text: e.target.value });
  };
  const cancelModal = () => {
    setModal({
      visible: false,
      text: "",
      uid: "",
      displayName: "",
      arrowShowDisplay: useModal.arrowShowDisplay,
      DisplayNameFrom: useModal.DisplayNameFrom
    });
  };
  const handleCheckbox = e => {
    if (e.target.checked) {
      setModal({ ...useModal, arrowShowDisplay: true });
    } else {
      setModal({ ...useModal, arrowShowDisplay: false });
    }
  };
  const renderItem = () => {
    return <Items data={useData} setModal={setModal} useProfile={useProfile} />;
  };
  useEffect(() => {
    // getFireStore();
    // liff.init(async data => {
    //   let profile = await liff.getProfile();
    //   setProfile(profile);
    // });
    const data = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    };
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };
    var sun = new Image();
    sun.src = "https://i.imgur.com/yDYW1I7.png";

    var cloud = new Image();
    cloud.src = "https://i.imgur.com/DIbr9q1.png";
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    // var img=document.getElementById("scream");
    ctx.drawImage(cloud, 10, 10);
    var ctx = document.getElementById("myChart");
    Chart.pluginService.register({
      afterUpdate: function(chart) {
        console.log("chart", chart);
        // chart.config.data.datasets[0]._meta[0].data[2]._model.pointStyle = sun;
        chart.config.data.labels[0] = ctx;
        // chart.config.data.datasets[1]._meta[0].data[2]._model.pointStyle = cloud;
      }
    });
    var myRadarChart = new Chart(ctx, {
      type: "radar",
      data: data,
      options: options
    });
    myRadarChart.update();
  }, []);
  const { visible, text } = useModal;
  return (
    <Container>
      <canvas id="myCanvas" width="20" height="20"></canvas>
      <canvas id="myChart" width="400" height="400"></canvas>
      {/* {useProfile.displayName !== "" ? (
        <>
          <BoxAvatar src={useProfile.pictureUrl} />
          <BoxHeader
            avatar={useProfile.pictureUrl}
            title={`สวัสดีคุณ ${useProfile.displayName}`}
            subTitle={`สถานะ : ${useProfile.statusMessage}`}
          />
        </>
      ) : null}
      <BoxQR>
        <img src={QRCode} alt="qrcode" />
      </BoxQR>
      {useLoading ? (
        <BoxCard loading={useLoading}>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="Card title"
            description="This is the description"
          />
        </BoxCard>
      ) : null}
      <BoxList>{renderItem()}</BoxList>
      <Modal
        title={`พิมพ์ข้อความที่ต้องการจะส่งถึงคุณ ${useModal.displayName ||
          ""}`}
        visible={visible}
        onOk={confirmSend}
        onCancel={cancelModal}
      >
        <div style={{ marginBottom: 16 }}>
          <Input
            addonBefore="Text :"
            name="text"
            value={text}
            onChange={handleText}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          {" "}
          <Checkbox
            onChange={handleCheckbox}
            checked={useModal.arrowShowDisplay}
          >
            อนุญาตให้บอกชื่อกับคนที่ส่งข้อความ
          </Checkbox>
        </div>
      </Modal> */}
    </Container>
  );
};

export default App;
const Container = styled.div`
  position: relative;
`;
const BoxAvatar = styled(Avatar)`
  position: absolute;
  left: 16px;
  top: 12px;
  z-index: 50;
`;
const BoxHeader = styled(PageHeader)`
  margin-left: 35px;
`;
const BoxQR = styled.div`
  position: relative;
  text-align: center;
  margin-top: 20px;
`;
const BoxList = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;
const BoxCard = styled(Card)`
  margin: 16px;
`;
