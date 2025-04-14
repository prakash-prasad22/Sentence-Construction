import { useState, useEffect, memo } from 'react';

function Timer({ questionId, onTimerEnd }) {
  const [timer, setTimer] = useState(60);
  const [textColor, setTextColor] = useState('black');

  useEffect(() => {
    setTimer(60);
    setTextColor('gray');
    let interval;

    interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          if (prevTimer <= 11) {
            setTextColor('red');
          }
          return prevTimer - 1;
        } else {
          clearInterval(interval);
          onTimerEnd();
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [questionId, onTimerEnd]);

  return (
    <div className="flex justify-between mb-4">
      <span className="font-semibold text-xl" style={{ color: textColor }}>{`00:${timer < 10 ? '0' : ''}${timer}`}</span>
    </div>
  );
}

const MemoizedTimer = memo(Timer, (prevProps, nextProps) => {
  return prevProps.questionId === nextProps.questionId;
});

export default MemoizedTimer;