import {useEffect, useState} from 'react'

function Form() {
    const [list, setList] = useState([])
    const [errors, setErrors] = useState([])

useEffect(() => {
  fetch('https://mailing-list-backend.herokuapp.com/list')
  .then(result => result.json())
  .then(data => {
    setList(data)
  })
  .catch((error) => {
      setErrors(error)
  }) 
}, [])

const onFormSubmit = (event) => {
  event.preventDefault()
  
}
return (
    <>
        {errors.length > 0 ? {errors[0]} : null}
        <form onSubmit={onFormSubmit} display="flex" flex-direction="column" style={{padding: "20px"}}>
        <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" style={{margin: "5px"}}/>
        </div>
        <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" style={{margin: "5px"}}/>
        </div>
        <div>
        <input type="submit" value="Submit" style={{marginTop: "10px"}}/>
        </div>
        </form>
    </>
)

}

export default Form