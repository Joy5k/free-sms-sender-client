import  { useState } from 'react';

function InputForm() {
 
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:3000/send-sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ to: phoneNumber, message }),
        });
  
        const responseData = await response.json();
          setResponse(responseData.message);
          console.log(response,'the response data');
      } catch (error) {
        console.error('Error sending SMS:', error);
      }
    };

  return (
    <div className="App">
    {/* <h1>Twilio SMS Sender</h1> */}
    <h1>Free SMS Sender</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Phone Number:
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <br />
      <label>
        Message:
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Send SMS</button>
    </form>
    <p>{response}</p>
  </div>
  );
}

export default InputForm;
