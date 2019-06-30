import React, { Component } from "react";
import { withGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  async componentDidMount() {
    const token = await this.props.googleReCaptchaProps.executeRecaptcha(
      "homepage"
    );
    axios
      .post("/api/auth/captcha", { token })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <h1>Dashboard Page</h1>
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      </div>
    );
  }
}

export default withGoogleReCaptcha(Dashboard);

//HOOKS EXAMPLE

// const Dashboard = async props => {
//   const [name, setName] = useState("Harry");
//   const [surename, setSureName] = useState("potter");
//   console.log(this.props);
//   const token = await this.props.googleReCaptchaProps.executeRecaptcha(
//     "homepage"
//   );
//   const handleNameChange = e => {
//     setName(e.target.value);
//   };
//   const handleSureChange = e => {
//     setSureName(e.target.value);
//   };
//   return (
//     <div>
//       <h1>Dashboard Page</h1>
//       <div>
//         <input value={name} onChange={handleNameChange} />
//       </div>
//       <div>
//         <input value={surename} onChange={handleSureChange} />
//       </div>
//     </div>
//   );
// };
