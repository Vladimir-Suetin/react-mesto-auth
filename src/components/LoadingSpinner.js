import '../blocks/loading-spinner/loading-spinner.css';

function loadingSpinner() {
  return (
    <div className='spinner'>
      <div className='spinner-line one'></div>
      <div className='spinner-line two'></div>
      <div className='spinner-line three'></div>
    </div>
  );
}

export default loadingSpinner;
