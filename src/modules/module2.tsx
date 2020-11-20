import React, { useState, useEffect } from 'react';
import rxSvc from '../services/rx-event.service';

const Module2 = () => {
  const [age, setAge] = useState(0);
  useEffect(() => {
    const sub$ = rxSvc.on('toggle-aside').subscribe(
      _ => toggleAside()
    );
    return () => {
      sub$.unsubscribe();
    }
  });
  const toggleAside = () => console.log('aaaaaaaasssssssss');

  return (
    <>
      <button onClick={() => setAge(age + 1)}> add</button>
      <div>管理 {age}</div>
    </>
  );
};
export default Module2;