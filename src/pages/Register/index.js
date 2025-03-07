import { generateToken } from "../../helpers/generateToken";
import { checkExistEmail, register } from "../../services/usersService";
import "./Register.scss";

function Register() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const cofirmPassword = e.target[3].value;

    const existUser = await checkExistEmail(email);

    if (existUser.length > 0) {
      alert("Existed email");
    } else if (password !== cofirmPassword) {
      alert("Mat khau nhap lai khong trung voi mat khau truoc do");
    } else {
      const options = {
        fullName: fullName,
        email: email,
        password: password,
        token: generateToken(20)
      }

      const resultCreateUser = await register(options);

      if (resultCreateUser) {
        alert("Tạo tài khoản thành công");
      }
    }
  }

  return (
    <>
      <div className="register">
        <h2 className="register__title">Register Your Account</h2>
        <form onSubmit={handleSubmit} className="register__form">
          <div className="register__input">
            <input type="text" name="fullName" placeholder="Full name" />
          </div>
          <div className="register__input">
            <input type="email" name="email" placeholder="email" />
          </div>
          <div className="register__input">
            <input type="password" name="password" placeholder="Password" />
          </div>
          <div className="register__input">
            <input type="password" name="cofirmPassword" placeholder="Cofirm password" />
          </div>
          <button className="button button--submit" type="submit">Register</button>
        </form>
      </div>
    </>
  )
}

export default Register;