// src/components/Login.js
import React, { useState , ChangeEvent, FormEvent} from 'react';
import './login.css';

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>(''); // 이메일 상태
  const [password, setPassword] = useState<string>(''); // 비밀번호 상태
  const [showPassword, setShowPassword] = useState<boolean>(false); // 비밀번호 보이기 여부 상태


  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) : void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) : void => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = () : void => {
    setShowPassword(!showPassword);
  };  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) : Promise<void> => {
    e.preventDefault();  //로그인 로직 추가
  };

  return (
    <div className="login-container">
      <div className="logo-section">
        <a href="/"><img src="/pandalogo2.png" alt="로고" className="logo" /></a>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="tinyhead">이메일</div>
        <div className="input-group1">
          <div className="putemail">
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <span className="error-message-mail" id="emailError"></span>
          </div>
        </div>

        <div className="tinyhead">비밀번호</div>
        <div className="input-group2">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <span className="error-message-password" id="passwordError"></span>
          <button type="button" className="toggle-password" onClick={handleTogglePassword}>
            <img src="/btn_visibility_on_24px.png" alt="토글패스워드" />
          </button>
        </div>

        <button type="submit" className="login-btn" disabled={!email || !password}>로그인</button>
      </form>
    </div>
  );
};

export default Login;