import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../user/LoginModal/LoginModal.module.css";
import GoogleAuth from "./GoogleAuth";

export const LoginContainer = ({ onChange, header, LoginHandler, user }) => {
  return (
      <div className={`${styles.loginContainer} modal-body bg-dark `}>
        <div>
          <h3>{header}</h3>

          <div className={styles.inputContainer}>
            <label>EMAIL</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={onChange}
            />
          </div>

          <div className={styles.inputContainer}>
            <label>Password</label>
            <input
              type="Password"
              placeholder="ENTER your password"
              name="password"
              onChange={onChange}
            />
          </div>

          {user && (
            <div className={styles.forgetContainer}>
              <div>
                Remeber me <input type="checkbox" />
              </div>
              <div>
                <Link to="/forget-password">Forget password ?</Link>
              </div>
            </div>
          )}

          <button className={styles.loginBTN} onClick={LoginHandler}>
            LOGIN
          </button>

          {user && (
            <>
              <span className="or">OR</span>

              <GoogleAuth page="login" navigate={user.navigate} />

              <span>
                Not registered yet ?
                <Link onClick={user?.toggleSignup} className={styles.notreg}>
                  Signup
                </Link>
              </span>
            </>
          )}
        </div>
      </div>
  );
};
