'use client'

export const alertAction = () => {
  return (
    <button onClick={() => alert('clicked')}>This is an action</button>
  );
}