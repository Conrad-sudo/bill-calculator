import { useState } from "react";

const tipDict = {
  "Dissatisfied (0%)": 0,
  "It was okay (5%)": 0.05,
  "It was good (10%)": 0.1,
  "Absolutely amazing (20%)": 0.2,
};

const tipList = [
  "Dissatisfied (0%)",
  "It was okay (5%)",
  "It was good (10%)",
  "Absolutely amazing (20%)",
];

function App() {
  const [billAmount, setBillAmount] = useState(0);
  const [myDescription, setMyDescription] = useState(tipList[0]);
  const [friendDescription, setFriendDescription] = useState(tipList[0]);
  const [myTip, setMyTip] = useState(0);
  const [friendTip, setfriendTip] = useState(0);

  function handleMyTip(e) {
    setMyDescription(e.target.value);
    setMyTip(tipDict[e.target.value]);
  }

  function handleFriendTip(e) {
    setFriendDescription(e.target.value);
    setfriendTip(tipDict[e.target.value]);
  }

  function handleAmount(e) {
    e.preventDefault();
    setBillAmount(e.target.value);
  }

  function handleReset() {
    setBillAmount(0);
    setMyDescription(tipList[0]);
    setFriendDescription(tipList[0]);
  }
  return (
    <div>
      <Bill billAmount={billAmount} onEnterAmount={handleAmount} />
      <Tip tipDescription={myDescription} onChoose={handleMyTip}>
        {" "}
        What did you think of the service ?{" "}
      </Tip>
      <Tip tipDescription={friendDescription} onChoose={handleFriendTip}>
        {" "}
        What did your friend think of the service ?{" "}
      </Tip>

      <Panel
        myTip={myTip}
        friendTip={friendTip}
        billAmount={Number(billAmount)}
        onReset={handleReset}
      />
    </div>
  );
}

function Bill({ billAmount, onEnterAmount }) {
  return (
    <div>
      <span> How much was the bill ? </span>

      <input type="text" value={billAmount} onChange={onEnterAmount} />
    </div>
  );
}

function Tip({ children, onChoose, tipDescription }) {
  return (
    <div>
      <span> {children}</span>

      <select value={tipDescription} onChange={onChoose}>
        {tipList.map((t) => (
          <option>{t}</option>
        ))}
      </select>
    </div>
  );
}

function Panel({ myTip, friendTip, billAmount, onReset }) {
  if (billAmount <= 0) return;

  const avg = (myTip + friendTip) / 2;
  const totalTip = billAmount * avg;
  const totalAmount = billAmount + totalTip;

  return (
    <div>
      <h2>
        {" "}
        You pay ${totalAmount} ( ${billAmount} + ${totalTip.toFixed(2)} tip){" "}
      </h2>

      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default App;
