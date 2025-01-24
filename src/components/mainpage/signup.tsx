import { ChangeEvent, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import './singup.css';


const Signup = ():JSX.Element => {
  const router = useRouter();


  // 상태 관리
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

   const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // 회원가입 로직 추가
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            className="input"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="input"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <img
              src={showPassword ? '/ic_eye_open.png' : '/ic_eye_closed.png'}
              alt="비밀번호 보이기/숨기기"
              className="eye-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              className="input"
              placeholder="비밀번호를 다시 입력해주세요"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <img
              src={showPassword ? '/ic_eye_open.png' : '/ic_eye_closed.png'}
              alt="비밀번호 보이기/숨기기"
              className="eye-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>

        <button type="submit" className="signup-button">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;