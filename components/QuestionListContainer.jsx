import React from 'react'

const QuestionListContainer = ({ questionList }) => {
  return (
    <div>
      <h2>Generated Interview Questions</h2>
      <div>
        {
          questionList.map((item, index) => (
            <div key={index}>
              <h2>{item.question}</h2>
              <h2>Type: {item?.type}</h2>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default QuestionListContainer