import React, { useState } from 'react';
import './LearningContent.css';

const LearningContent = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "変数を宣言してみましょう",
    "条件文を使ってみましょう",
    "関数を定義してみましょう"
  ];

  const handleNextStep = () => {
    setCurrentStep((prevStep) => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
  };

  return (
    <div className="learning-content">
      <h2>学習コンテンツ</h2>
      <div className="step-content">
        {steps[currentStep]}
      </div>
      <button onClick={handleNextStep} disabled={currentStep >= steps.length - 1}>
        次のステップ
      </button>
    </div>
  );
};

export default LearningContent;
