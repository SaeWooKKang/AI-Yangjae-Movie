const SignUpForm = (props) => {
  const { signUpdata, handleChangeSignUpData } = props;

  return (
    <div className="album">
      <div className="container">
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input value={signUpdata.email} onChange={handleChangeSignUpData} type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input value={signUpdata.password} onChange={handleChangeSignUpData} type="password" className="form-control" name="password" id="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="rePassword" className="form-label">rePassword</label>
            <input value={signUpdata.rePassword}onChange={handleChangeSignUpData} type="password" className="form-control" name="rePassword" id="rePassword" />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">name</label>
            <input value={signUpdata.name} onChange={handleChangeSignUpData} type="password" className="form-control" name='name' id="name" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;