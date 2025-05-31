const Date = () => {
  const date = date.toLocaleString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'});
  console.log('date is:', date);
  
  return (
    <div>
      <p>{ date }</p>
    </div>
  )
}

export default Date;