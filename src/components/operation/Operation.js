import React from "react";

const Operation = ({ addTransaction, addDescription, addAmount, description, amount }) => (
  <section className="operation">
    <h3>Новая операция</h3>
    <form id="form">
      <label>
        <input 
          onChange={addDescription}
          value={description}
          type="text" 
          className="operation__fields operation__name" 
          placeholder="Наименование операции">
        </input>
      </label>
      <label>
        <input 
          onChange={addAmount}
          value={amount}
          type="number" 
          className="operation__fields operation__amount" 
          placeholder="Введите сумму">
        </input>
      </label>
      <div className="operation__btns">
        <button onClick={() => addTransaction(false)} type="button" className="operation__btn operation__btn-subtract">РАСХОД</button>
        <button onClick={() => addTransaction(true)} type="button" className="operation__btn operation__btn-add">ДОХОД</button>
      </div>
    </form>
  </section>
);

export default Operation;