export default function delay(duration) {
  console.log('delay');
  return new Promise(resolve => {
      console.log('delay');
      setTimeout(() => {
        console.log('delay');
        resolve()
      }, duration);
  })
}