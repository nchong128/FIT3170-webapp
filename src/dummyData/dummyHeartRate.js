const heartrate = [];
for (let i = 0; i < 100; i++) {
  const value = Math.round(120 - Math.random() * 40);
  heartrate.push(value);
}

export default heartrate;
