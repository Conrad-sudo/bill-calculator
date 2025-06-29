import { useState } from "react";

function App() {
  const [billAmount, setBillAmount] = useState(0);
  const [myTip, setMyTip] = useState(0);
  const [friendTip, setfriendTip] = useState(0);

  function handleMyTip(e) {
    setMyTip(Number(e.target.value));
  }

  function handleFriendTip(e) {
    setfriendTip(Number(e.target.value));
  }

  function handleAmount(e) {
    e.preventDefault();
    setBillAmount(Number(e.target.value));
  }

  function handleReset() {
    setBillAmount(0);
    setMyTip(0);
    setfriendTip(0);
  }
  return (
    <div>
      <Bill billAmount={billAmount} onEnterAmount={handleAmount} />
      <Tip tip={myTip} onChoose={handleMyTip}>
        {" "}
        What did you think of the service ?{" "}
      </Tip>
      <Tip tip={friendTip} onChoose={handleFriendTip}>
        {" "}
        What did your friend think of the service ?{" "}
      </Tip>

      <Panel
        myTip={myTip}
        friendTip={friendTip}
        billAmount={billAmount}
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

//Important to remeber how the <select element works>
function Tip({ tip, children, onChoose }) {
  return (
    <div>
      <span> {children}</span>

      <select value={tip} onChange={onChoose}>
        <option value={0}> Dissatisfied (0%)</option>
        <option value={0.05}> It was okay (5%)</option>
        <option value={0.1}> It was good (10%)</option>
        <option value={0.2}> Absolutely amazing(20%)</option>
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
