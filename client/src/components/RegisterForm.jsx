import { useState } from "react";
export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    confirmEmail: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    // change it if we add any checkboxes so we can handle them
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  //   has to be async
  function handleSubmit(e) {
    e.preventDefault();
    if (formData.email === formData.confirmEmail) {
      console.log("successfull logging in");
    } else {
      console.log("Email do not match!");
    }
    // handlesubmit to backends
  }
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.username}
        className="login-input"
      />
      <input
        type="email"
        name="confirmEmail"
        placeholder="Confirm Email"
        onChange={handleChange}
        value={formData.confirmEmail}
        className="login-input"
      />
      <button className="login-button">Create an Account</button>
    </form>
  );
}
