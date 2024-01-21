import { useState } from "react";
export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    // change it if we add any checkboxes so we can handle them
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  //   has to be async
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    // handlesubmit to backends
  }
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        value={formData.username}
        className="login-input"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={formData.password}
        className="login-input"
      />
      <button className="login-button">Log in</button>
    </form>
  );
}
