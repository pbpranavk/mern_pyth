import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-query";

import { postPredict } from "./apis/diabetes";

const Diabetes = (props) => {
  const { mutate: predictMutate, data } = useMutation(postPredict);

  const [pregnancies, setPregnancies] = useState(6);
  const [glucose, setGlucose] = useState(148);
  const [bp, setBP] = useState(72);
  const [skinThickness, setSkinThickness] = useState(35);
  const [insulin, setInsulin] = useState(0);
  const [bmi, setBMI] = useState(33.6);
  const [dpg, setDPG] = useState(0.627);
  const [age, setAge] = useState(50);

  return (
    <div>
      <p>Pregnancies</p>
      <input
        value={pregnancies}
        onChange={(e) => setPregnancies(e.target.value)}
      />
      <p>Glucose</p>
      <input value={glucose} onChange={(e) => setGlucose(e.target.value)} />
      <p>BP</p> <input value={bp} onChange={(e) => setBP(e.target.value)} />
      <p>Skin Thickness</p>{" "}
      <input
        value={skinThickness}
        onChange={(e) => setSkinThickness(e.target.value)}
      />
      <p>Insulin</p>{" "}
      <input value={insulin} onChange={(e) => setInsulin(e.target.value)} />
      <p>BMI</p> <input value={bmi} onChange={(e) => setBMI(e.target.value)} />
      <p>Diabetes pedegree function</p>{" "}
      <input value={dpg} onChange={(e) => setDPG(e.target.value)} />
      <p>Age</p> <input value={age} onChange={(e) => setAge(e.target.value)} />
      <button
        onClick={() => {
          predictMutate([
            pregnancies,
            glucose,
            bp,
            skinThickness,
            insulin,
            bmi,
            dpg,
            age,
          ]);
        }}
      >
        submit
      </button>
      <div>
        {data?.prediction &&
          `Your chance of having diabetes is : ${Math.round(
            data?.prediction * 100
          )}%`}
      </div>
    </div>
  );
};

Diabetes.propTypes = {};

export default Diabetes;
