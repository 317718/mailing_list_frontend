import React, {useEffect, useState} from 'react'

function Form() {
    const [nameValue, setName] = useState([])
    const [emailValue, setEmail] = useState([])
    const [subjectValue, setSubject] = useState([])
    const [bodyValue, setBody] = useState([])
    const [list, setList] = useState([])
    const [errors, setErrors] = useState([])
    const [notifications, setNotifications] = useState([])

  useEffect(() => {
    fetch('https://mailing-list-backend.herokuapp.com/list')
    .then(result => {
      if (!result.ok) { throw result }
      return result.json()
    })
    .then(data => {
      setList(data)
      setErrors([])
    })
    .catch(error => {
      error.json()
      .then(data => {
        console.log(data.error)
        setErrors(data.error)
      })
    })
  }, [])

  useEffect(() => {
  }, [list, errors, notifications])

  const onFormSubmit = (event) => {
    event.preventDefault()
    console.log(nameValue)
    console.log(emailValue)
    fetch('https://mailing-list-backend.herokuapp.com/list', {
      method: "POST",
      body: JSON.stringify({
        "name": nameValue,
        "email": emailValue
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(result => {
      if (!result.ok) { throw result }
      return result.json()
    })
    .then(data => {
      console.log("Successfully added to list and sent confirmation email")
      setList([...list, data])
      setErrors([])
      setNotifications("Successfully added to list and sent confirmation email")
    })
    .catch(error => {
      error.json()
      .then(data => {
        console.log(data.error)
        setErrors(data.error)
        setNotifications([])
      })
    })
  }

  const onEmailSubmit = (event) => {
    event.preventDefault()
    console.log(subjectValue)
    console.log(bodyValue)

    fetch('https://mailing-list-backend.herokuapp.com/list/send', {
      method: "POST",
      body: JSON.stringify({
        "subject": subjectValue,
        "body": bodyValue
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(result => {
      if (!result.ok) { throw result }
      return result.json()
    })
    .then(data => {
      console.log("Successfully sent email out to mailing list")
      setList([...list, data])
      setErrors([])
      setNotifications("Successfully sent email out to mailing list")
    })
    .catch(error => {
      error.json()
      .then(data => {
        console.log(data.error)
        setErrors(data.error)
        setNotifications([])
      })
    })
  }

return (
    <>
        <div>
          <h2 style={{color: "red"}}>  {errors.length > 0  ? errors : null} </h2>
          <h2 style={{color: "green"}}>  {notifications.length > 0  ? notifications : null} </h2>
          <h3>Add Item to Mailing List</h3>
        </div>
        <form onSubmit={onFormSubmit} display="flex" flex-direction="column" style={{padding: "20px"}}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" style={{margin: "5px"}} onChange={e => setName(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" style={{margin: "5px"}} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div>
            <input type="submit" value="Submit" style={{marginTop: "10px"}}/>
          </div>
        </form>

        <div>
          <h3>Send Email Out to Mailing List</h3>
        </div>
        <form onSubmit={onEmailSubmit} display="flex" flex-direction="column" style={{padding: "20px"}}>
          <div>
            <label htmlFor="subject">Subject</label>
            <input type="text" name="subject" id="subject" style={{margin: "5px"}} onChange={e => setSubject(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="body">Body</label>
            <textarea type="textarea" name="body" id="body" style={{margin: "5px"}} onChange={e => setBody(e.target.value)}/>
          </div>
          <div>
            <input type="submit" value="Submit" style={{marginTop: "10px"}}/>
          </div>
        </form>

        <div>
          <h3>Mailing List</h3>
          {list ? 
            list.map((item, index) => (
              <div key={index}>
                <p>Name: {item.name}</p>
                <p>Email: {item.email}</p>
              </div>
            ))
          : null}
        </div>
    </>
)}

export default Form